import { useEffect } from "react";
import "./ChamadoSelecionado.css";

function ChamadoSleecionado({ chamadoClicado }) {
  function atenderChamado(chamado) {
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
        status: "EM_ANDAMENTO",
        tecnico: {
          id: tecnico.id,
        },
      }),
    });
  }

  useEffect(() => {
    console.log("chamado clicado: ", chamadoClicado);
  },[])
  return (
    <div className={`chamados-container ${chamadoClicado && chamadoClicado.id ? "show" : ""}`}>
      <div className="chamados-content">
        <p>
          <b>ID:</b> {chamadoClicado.id}
        </p>
        <p>
          <b>Status:</b> {chamadoClicado.status?.replace("_", " ")}
        </p>
      </div>
      <div className="chamados-content">
        <p>
          <b>Cliente:</b>{" "}
          {chamadoClicado.usuario
            ? `${chamadoClicado.usuario.primeiroNome} ${chamadoClicado.usuario.ultimoNome}`
            : "Cliente não identificado"}
        </p>
        <p>
          <b>Categoria:</b> {chamadoClicado.categoria}
        </p>
      </div>
      <div className="chamados-content">
        <p>
          <b>Titulo:</b> {chamadoClicado.titulo}
        </p>
        <p>
          <b>Prioridade:</b> {chamadoClicado.prioridade}
        </p>
      </div>
      <div className="chamados-content">
        <div className="descricao">
          <p>
            <b>Descrição:</b> {chamadoClicado.descricao}
          </p>
        </div>
          <button onClick={() => atenderChamado(chamadoClicado)}>
            Atender chamado<i className="fi fi-br-add"></i>
          </button>
      </div>
    </div>
  );
}
export default ChamadoSleecionado;
