import { useState } from "react";
import "./SeusChamados.css";

function SeusChamados({ showSeusChamados, tecChamados, chamadosDoTecnico }) {
  const [filtroAtivo, setFiltroAtivo] = useState("EM_ANDAMENTO");
  function removerChamado(chamado) {
    const tecnico = JSON.parse(localStorage.getItem("usuario"));
    console.log("Token atual:", tecnico.token);

    fetch(`http://localhost:8080/chamados/emAndamento/${chamado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tecnico.token}`,
      },
      body: JSON.stringify({
        titulo: chamado.titulo,
        descricao: chamado.descricao,
        prioridade: chamado.prioridade,
        categoria: chamado.categoria,
        status: "EM_ABERTO",
        tecnico: null,
        usuario: {
          id: chamado.usuario.id,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir chamados: " + response.statusText);
        }
        return chamadosDoTecnico("EM_ANDAMENTO");
      })
      .then((data) => {
        console.log("Chamado excluido: ", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  return (
    <div className={`seusChamados-container ${showSeusChamados ? "show" : ""}`}>
      <h4>Seus chamados</h4>
      <div className="seusChamados-options">
        <h5
          className={filtroAtivo === "EM_ANDAMENTO" ? "blue" : ""}
          onClick={() => {
            setFiltroAtivo("EM_ANDAMENTO");
            chamadosDoTecnico("EM_ANDAMENTO");
          }}
        >
          Em andamento
        </h5>
        <h5
          className={filtroAtivo === "CONCLUIDO" ? "blue" : ""}
          onClick={() => {
            setFiltroAtivo("CONCLUIDO");
            chamadosDoTecnico("CONCLUIDO");
          }}
        >
          Concluídos
        </h5>
      </div>
      <div className="seuschamados-list">
        {tecChamados.length > 0 ? (
          tecChamados.map((chamado) => (
            <div key={chamado.id} className="seusChamados-list-item">
              <img src="../assets/images/icon-emAndamento.png" alt="" />
              <div className="seusChamados-list-title">
                <h5>{chamado.titulo}</h5>
                <p>{chamado.descricao}</p>
              </div>
              <div className="seusChamados-buttons">
                <button className="btn-verde">
                  <i className="fi fi-br-check"></i>
                </button>
                <button
                  className="btn-vermelho"
                  onClick={() => removerChamado(chamado)}
                >
                  <i className="fi fi-br-cross"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum chamado encontrado</p>
        )}
      </div>
      <div
        className="user-profile-back"
        onClick={() => setShowSeusChamados(false)}
      >
        <i className="fi fi-sr-arrow-circle-left"></i>
        <p>voltar</p>
      </div>
    </div>
  );
}

export default SeusChamados;
