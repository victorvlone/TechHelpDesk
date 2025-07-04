import { useEffect, useState } from "react";
import "./ClienteChamados.css";

function ClienteChamados({ setShowNovoChamado }) {
  const [chamados, setChamados] = useState([]);
  const [abertos, setAbertos] = useState({});

  const buscarChamados = () => {
    fetch("http://localhost:8080/chamados/meus-chamados", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("usuario")).token
        }`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao listar chamados: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setChamados(data);
        console.log("Chamados encontrados:", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  useEffect(() => {
    buscarChamados();
  }, []);

  const toggleChamado = (id) => {
    setAbertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="clienteChamados-container">
      <div className="clienteChamados-header">
        <div className="clienteChamados-header-title">
          <p>Chamados</p>
          <i
            className="fi fi-br-add add-icon"
            onClick={() => setShowNovoChamado(true)}
          ></i>
        </div>
        <i className="fi fi-br-refresh" onClick={buscarChamados}></i>
      </div>

      {chamados.map((chamado) => (
        <div
          key={chamado.id}
          className="clienteChamados-content"
          onClick={() => toggleChamado(chamado.id)}
        >
          <div className="clienteChamados-content-header">
            <h5>{chamado.titulo}</h5>
            <p
              className={`status-${chamado.status
                .toLowerCase()
                .replace("_", "-")}`}
            >
              {chamado.status}
            </p>
          </div>
          <div
            className={`clienteChamados-content-body ${
              abertos[chamado.id] ? "show" : ""
            }`}
          >
            <div className="clienteChamados-content-data">
              <p>
                <b>ID:</b> {chamado.id}
              </p>
              <p>
                <b>Categoria:</b> Hardware
              </p>
            </div>
            <div className="clienteChamados-content-data">
              <p>
                <b>Prioridade:</b> Alta
              </p>
              <p>
                <b>Criação:</b> 2024-12-01
              </p>
            </div>
            <div className="clienteChamados-content-data">
              <p>
                <b>Técnico Responsável:</b> João
              </p>
              <p>
                <b>Conclusão:</b> —
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClienteChamados;
