from fastapi import FastAPI
from pydantic import BaseModel
import spacy
from collections import Counter
from app.database.connection import SessionLocal
from app.models.texto import Texto
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nlp = spacy.load("pt_core_news_sm")

class TextoEntrada(BaseModel):
    texto: str

mapa_entidades = {
    "PER": "Pessoa",
    "LOC": "Local",
    "ORG": "Organização",
    "DATE": "Data",
    "TIME": "Tempo",
    "MISC": "Diverso"
}

@app.get("/historico")
def listar_historico():
    db = SessionLocal()

    try:
        textos = db.query(Texto).order_by(Texto.id.asc()).all()

        resultado = []
        for t in textos:
            resultado.append({
                "id": t.id,
                "conteudo": t.conteudo,
                "palavras_chave": json.loads(t.palavras_chave) if t.palavras_chave else []
            })

        return resultado

    finally:
        db.close()


@app.delete("/texto/{id}")
def excluir_texto(id: int):
    db = SessionLocal()

    try:
        texto = db.query(Texto).filter(Texto.id == id).first()

        if not texto:
            return {
                "erro": "Texto não encontrado"
            }

        db.delete(texto)
        db.commit()

        return {
            "mensagem": "Texto excluído com sucesso"
        }

    finally:
        db.close()


@app.post("/analyze")
def analyze(data: TextoEntrada):
    texto = data.texto
    doc = nlp(texto)

    # 🟡 Palavras-chave com ranking
    tokens_filtrados = [
        token.lemma_.lower() for token in doc
        if not token.is_stop and not token.is_punct and token.is_alpha
    ]

    frequencia = Counter(tokens_filtrados)

    # 🔥 AGORA: só lista de strings
    palavras_chave = [
        palavra for palavra, freq in frequencia.most_common(10)
    ]

    # 🔵 Entidades traduzidas
    entidades = [
        {
            "texto": ent.text,
            "tipo": mapa_entidades.get(ent.label_, ent.label_)
        }
        for ent in doc.ents
    ]

    # 🟣 Estatísticas
    total_palavras = len([token for token in doc if token.is_alpha])
    total_frases = len(list(doc.sents))

    # 🛢️ Salvar no banco
    db = SessionLocal()

    novo_texto = Texto(
        conteudo=texto,
        palavras_chave=json.dumps(palavras_chave, ensure_ascii=False)
    )

    db.add(novo_texto)
    db.commit()
    db.close()

    return {
        "palavras_chave": palavras_chave,
        "entidades": entidades,
        "estatisticas": {
            "palavras": total_palavras,
            "frases": total_frases
        }
    }


@app.put("/texto/{id}")
def atualizar_texto(id: int, data: TextoEntrada):

    db = SessionLocal()

    try:

        texto_db = (
            db.query(Texto)
            .filter(Texto.id == id)
            .first()
        )

        if not texto_db:
            return {
                "erro": "Texto não encontrado"
            }

        texto = data.texto

        doc = nlp(texto)

        tokens_filtrados = [
            token.lemma_.lower()
            for token in doc
            if (
                not token.is_stop
                and not token.is_punct
                and token.is_alpha
            )
        ]

        frequencia = Counter(tokens_filtrados)

        palavras_chave = [
            palavra
            for palavra, freq
            in frequencia.most_common(10)
        ]

        texto_db.conteudo = texto

        texto_db.palavras_chave = json.dumps(
            palavras_chave,
            ensure_ascii=False
        )

        db.commit()

        return {
            "mensagem": "Atualizado com sucesso"
        }

    finally:
        db.close()