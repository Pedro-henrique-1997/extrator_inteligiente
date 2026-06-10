import { useEffect, useState } from "react";

interface Analise {
    id: number;
    conteudo: string;
    palavras_chave: string[];
}

function Historico() {

    const [dados, setDados] = useState<Analise[]>([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {

        fetch("http://127.0.0.1:8000/historico")
            .then((res) => res.json())
            .then((data) => {

                console.log("Dados recebidos:", data);

                const ordenado = [...data].sort(
                    (a, b) => b.id - a.id
                );

                setDados(ordenado);

            })
            .catch((err) => {

                console.error(
                    "Erro ao buscar histórico:",
                    err
                );

            });

    }, []);

    const dadosFiltrados = dados.filter((item) =>

        item.conteudo
            .toLowerCase()
            .includes(busca.toLowerCase())

        ||

        item.palavras_chave.some((palavra) =>
            palavra
                .toLowerCase()
                .includes(busca.toLowerCase())
        )

    );

    const excluirTexto = async (id: number) => {

        const confirmar = window.confirm(
            "Deseja realmente excluir esta análise?"
        );

        if (!confirmar) return;

        try {

            const resposta = await fetch(
                `http://127.0.0.1:8000/texto/${id}`,
                {
                    method: "DELETE",
                }
            );

            const resultado =
                await resposta.json();

            console.log(resultado);

            if (resposta.ok) {

                setDados((dadosAtuais) =>
                    dadosAtuais.filter(
                        (item) => item.id !== id
                    )
                );

            }

        } catch (erro) {

            console.error(
                "Erro ao excluir:",
                erro
            );

        }
    };

    const editarTexto = async (
        id: number,
        conteudoAtual: string
    ) => {

        const novoTexto = window.prompt(
            "Digite o novo texto:",
            conteudoAtual
        );

        if (!novoTexto) return;

        try {

            const resposta = await fetch(
                `http://127.0.0.1:8000/texto/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        texto: novoTexto,
                    }),
                }
            );

            const resultado =
                await resposta.json();

            console.log(resultado);

            setDados((dadosAtuais) =>
                dadosAtuais.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            conteudo: novoTexto,
                        }
                        : item
                )
            );

        } catch (erro) {

            console.error(
                "Erro ao editar:",
                erro
            );

        }
    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center">
                📚 Histórico de Análises
            </h2>

            <div className="mb-4">

                <input
                    type="text"
                    className="form-control"
                    placeholder="🔎 Buscar por conteúdo ou palavra-chave..."
                    value={busca}
                    onChange={(e) =>
                        setBusca(e.target.value)
                    }
                />

            </div>

            <div className="row">

                {dadosFiltrados.map((item) => (

                    <div
                        key={item.id}
                        className="col-md-6 mb-4"
                    >

                        <div className="card shadow-lg border-0 h-100">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <h5 className="mb-0">
                                        📄 Análise
                                    </h5>

                                    <span className="badge bg-dark fs-6">
                                        #{item.id}
                                    </span>

                                </div>

                                <div className="bg-light p-3 rounded">

                                    <p className="card-text mb-0">
                                        {item.conteudo}
                                    </p>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center">

                                    <h6 className="mb-0">
                                        🏷️ Palavras-chave
                                    </h6>

                                    <span className="badge bg-secondary">
                                        {
                                            item.palavras_chave
                                                .length
                                        } palavras
                                    </span>

                                </div>

                                <div className="d-flex flex-wrap gap-2 mt-3">

                                    {item.palavras_chave.map(
                                        (
                                            p,
                                            index
                                        ) => (

                                            <span
                                                key={index}
                                                className="badge rounded-pill text-bg-primary"
                                            >
                                                {p}
                                            </span>

                                        )
                                    )}

                                </div>

                                <hr />

                                <div className="d-flex justify-content-end gap-2">

                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() =>
                                            editarTexto(
                                                item.id,
                                                item.conteudo
                                            )
                                        }
                                    >
                                        ✏️ Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            excluirTexto(
                                                item.id
                                            )
                                        }
                                    >
                                        🗑️ Excluir
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Historico;