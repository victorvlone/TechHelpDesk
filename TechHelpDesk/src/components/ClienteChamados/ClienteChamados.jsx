import { useEffect, useState } from "react";
import "./ClienteChamados.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function ClienteChamados({ setShowNovoChamado }) {
  const [chamados, setChamados] = useState([]);
  const [abertos, setAbertos] = useState({});

  function concluirChamado(chamado, status) {
    const tecnico = JSON.parse(localStorage.getItem("usuario"));
    console.log("tecnico existe? ", tecnico);

    fetch(`http://localhost:8080/chamados/atualizar/${chamado.id}`, {
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
        status: status,
        tecnico: {
          id: tecnico.id,
        },
        usuario: {
          id: chamado.usuario.id,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          buscarChamados();
        }
      })
      .catch((err) => console.error("Erro ao atender chamado:", err));
  }

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
              {chamado.status
                .toLowerCase()
                .replaceAll("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
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
                <b>Categoria:</b> {chamado.categoria}
              </p>
            </div>
            <div className="clienteChamados-content-data">
              <p>
                <b>Prioridade:</b> {chamado.prioridade}
              </p>
              <p>
                <b>Criação:</b>{" "}
                {format(new Date(chamado.dataCriacao), "dd/MM/yyyy HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <div className="clienteChamados-content-data">
              <p>
                <b>Técnico Responsável:</b>{" "}
                {chamado.tecnico ? chamado.tecnico.primeiroNome : "A definir"}
              </p>
              <p>
                <b>Conclusão:</b>{" "}
                {chamado.dataConclusao
                  ? format(
                      new Date(chamado.dataConclusao),
                      "dd/MM/yyyy HH:mm",
                      {
                        locale: ptBR,
                      }
                    )
                  : ""}
              </p>
            </div>
            <div className="clienteChamados-content-data">
              <p>
                <b></b>
              </p>
              {chamado.status === "FINALIZACAO_PENDENTE" && (
                <div className="concluir-chamado-btn">
                  <b>Seu chamado foi atendido?</b>
                  <button
                    className="btn-verde"
                    onClick={() => concluirChamado(chamado, "CONCLUIDO")}
                  >
                    <i className="fi fi-br-check"></i>
                  </button>
                  <button
                    className="btn-vermelho"
                    onClick={() => concluirChamado(chamado, "EM_ANDAMENTO")}
                  >
                    <i className="fi fi-br-cross"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClienteChamados;
