import { useEffect, useState } from "react";

interface Analise {
    id: number;
    conteudo: string;
    palavras_chave: string[];
}

function Dashboard() {

    const [dados, setDados] = useState<Analise[]>([]);

    useEffect(() => {

        fetch("http://127.0.0.1:8000/historico")
            .then((res) => res.json())
            .then((data) => setDados(data))
            .catch((erro) => {
                console.error(
                    "Erro ao carregar dashboard:",
                    erro
                );
            });

    }, []);

    const totalAnalises = dados.length;

    const totalPalavrasChave =
        dados.reduce((total, item) => {

            return total + item.palavras_chave.length;

        }, 0);

    const ultimoId =
        dados.length > 0
            ? dados[dados.length - 1].id
            : "-";

    const todasPalavras = dados.flatMap(
        (item) => item.palavras_chave
    );

    const frequencia: Record<string, number> = {};

    todasPalavras.forEach((palavra) => {

        frequencia[palavra] =
            (frequencia[palavra] || 0) + 1;

    });

    const palavraMaisFrequente =
        Object.keys(frequencia).length > 0
            ? Object.keys(frequencia).reduce(
                (a, b) =>
                    frequencia[a] > frequencia[b]
                        ? a
                        : b
            )
            : "-";

    return (

        <div className="row g-4 mb-5">

            <div className="col-md-3">

                <div className="card bg-primary text-white shadow border-0 h-100">

                    <div className="card-body text-center">

                        <h5>📊 Total</h5>

                        <h1 className="display-4 fw-bold">
                            {totalAnalises}
                        </h1>

                        <small>
                            Análises cadastradas
                        </small>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card bg-success text-white shadow border-0 h-100">

                    <div className="card-body text-center">

                        <h5>🏷️ Palavras</h5>

                        <h1 className="display-4 fw-bold">
                            {totalPalavrasChave}
                        </h1>

                        <small>
                            Palavras-chave encontradas
                        </small>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card bg-warning shadow border-0 h-100">

                    <div className="card-body text-center">

                        <h5>📝 Última</h5>

                        <h1 className="display-4 fw-bold">
                            #{ultimoId}
                        </h1>

                        <small>
                            Última análise criada
                        </small>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card bg-danger text-white shadow border-0 h-100">

                    <div className="card-body text-center">

                        <h5>🔥 Frequente</h5>

                        <h2 className="fw-bold">
                            {palavraMaisFrequente}
                        </h2>

                        <small>
                            Palavra mais encontrada
                        </small>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;