import { useState } from "react";
import "./ClienteChamados.css";

function ClienteChamados() {
  const chamados = [
    { id: 1, titulo: "Computador não liga", status: "Em aberto" },
    { id: 2, titulo: "Impressora travando", status: "Resolvido" },
    { id: 3, titulo: "Erro na internet", status: "Em aberto" },
  ];

  //State para armazenar quais dados estão abertos
  const [abertos, setAbertos] = useState({});

  //Função que alterna o estado de visibilidade de um chamado
  const toggleChamado = (id) => {
    setAbertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="clienteChamados-container">
      <div className="clienteChamados-header">
        <p>Chamados</p>
        <i className="fi fi-br-add"></i>
      </div>

      {chamados.map((chamado) => (
        <div
          key={chamado.id}
          className="clienteChamados-content"
          onClick={() => toggleChamado(chamado.id)}
        >
          <div className="clienteChamados-content-header">
            <h5>{chamado.titulo}</h5>
            <p>{chamado.status}</p>
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
