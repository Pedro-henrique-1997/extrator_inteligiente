from sqlalchemy import Column, Integer, Text, TIMESTAMP
from sqlalchemy.sql import func
from app.database.connection import engine
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Texto(Base):
    __tablename__ = "textos"

    id = Column(Integer, primary_key=True, index=True)
    conteudo = Column(Text)
    palavras_chave = Column(Text)
    criado_em = Column(TIMESTAMP, server_default=func.now())

# cria a tabela se não existir
Base.metadata.create_all(bind=engine)