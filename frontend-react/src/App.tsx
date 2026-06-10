import Historico from "./components/Historico";
import Formulario from "./components/Formulario";
import Dashboard from "./components/Dashboard";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
     <nav className="navbar navbar-dark bg-primary shadow-lg py-4">
    <div className="container text-center justify-content-center">

        <div>
            <h1 className="navbar-brand fw-bold fs-2 m-0">
                🚀 Extrator Inteligente
            </h1>

            <p className="text-light mb-0">
                Análise automática de textos com FastAPI + React
            </p>
        </div>

    </div>
</nav>

<p className="text-black mb-0">
    NLP com spaCy • FastAPI • React
</p>

      <div className="container mt-4">

        <Dashboard />

        <Formulario />

        <Historico />

      </div>
    </>
  );
}

export default App;