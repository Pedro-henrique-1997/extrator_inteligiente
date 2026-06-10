import { useState } from "react";

function Formulario() {

    const [texto, setTexto] = useState("");

    const enviarTexto = async () => {

        if (!texto.trim()) {
            alert("Digite um texto");
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        texto: texto
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            alert("Texto analisado com sucesso!");

            setTexto("");

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert("Erro ao enviar texto");

        }
    };

    return (

        <div className="card shadow border-0 mb-4">

            <div className="card-body">

                <h3>📝 Nova Análise</h3>

                <textarea
                    className="form-control mt-3"
                    rows={5}
                    value={texto}
                    onChange={(e) =>
                        setTexto(e.target.value)
                    }
                    placeholder="Digite um texto para análisar..."
                />

                <button
                    className="btn btn-success mt-3"
                    onClick={enviarTexto}
                >
                    Analisar Texto
                </button>

            </div>

        </div>

    );
}

export default Formulario;