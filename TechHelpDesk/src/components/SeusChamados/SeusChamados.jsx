import { useState } from "react";
import "./SeusChamados.css";

function SeusChamados({ tecChamados, chamadosDoTecnico, setShowSeusChamados, darkMode }) {
  const [filtroAtivo, setFiltroAtivo] = useState("EM_ANDAMENTO");

  function finalizarOuRemoverChamado(chamado, status) {
    const tecnico = JSON.parse(localStorage.getItem("usuario"));

    let dados = null;

    if (status === "FINALIZACAO_PENDENTE") {
      dados = {
        titulo: chamado.titulo,
        descricao: chamado.descricao,
        prioridade: chamado.prioridade,
        categoria: chamado.categoria,
        status: status,
        tecnico: {
          id: tecnico.id,
        },
        usuario: {
          id: chamado.usuario.id,
        },
      };
    } else {
      dados = {
        titulo: chamado.titulo,
        descricao: chamado.descricao,
        prioridade: chamado.prioridade,
        categoria: chamado.categoria,
        status: status,
        tecnico: null,
        usuario: {
          id: chamado.usuario.id,
        },
      };
    }

    fetch(`http://localhost:8080/chamados/atualizar/${chamado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tecnico.token}`,
      },
      body: JSON.stringify(dados),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir chamados: " + response.statusText);
        }
        return chamadosDoTecnico(filtroAtivo);
      })
      .then((data) => {
        console.log("Chamado excluido: ", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  return (
    <div className="seusChamados-container">
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
          className={filtroAtivo === "FINALIZACAO_PENDENTE" ? "blue" : ""}
          onClick={() => {
            setFiltroAtivo("FINALIZACAO_PENDENTE");
            chamadosDoTecnico("FINALIZACAO_PENDENTE");
          }}
        >
          Em conclusão
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
              <img
                src={
                  darkMode
                    ? "../assets/images/icon-emAndamento-light.png"
                    : "../assets/images/icon-emAndamento.png"
                }
                alt=""
              />
              <div className="seusChamados-list-title">
                <h5>{chamado.titulo}</h5>
                <p>{chamado.descricao}</p>
              </div>
              <div className={`seusChamados-buttons ${filtroAtivo === "CONCLUIDO" ? "hiden" : ""}`}>
                <button
                  className={`btn-verde ${
                    filtroAtivo === "FINALIZACAO_PENDENTE" ? "desativado" : ""
                  }`}
                  onClick={() =>
                    finalizarOuRemoverChamado(chamado, "FINALIZACAO_PENDENTE")
                  }
                  disabled={filtroAtivo === "FINALIZACAO_PENDENTE"}
                >
                  <i className="fi fi-br-check"></i>
                </button>
                <button
                  className="btn-vermelho"
                  onClick={() =>
                    finalizarOuRemoverChamado(
                      chamado,
                      filtroAtivo === "FINALIZACAO_PENDENTE"
                        ? "EM_ANDAMENTO"
                        : "EM_ABERTO"
                    )
                  }
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
