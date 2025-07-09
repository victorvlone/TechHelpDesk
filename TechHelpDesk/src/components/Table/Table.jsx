import { useEffect, useState } from "react";
import "./Table.css";

function Table({ filtros, setChamadoClicado }) {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/chamados/todos-chamados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("usuario")).token
        }`,
      },
      body: JSON.stringify(filtros || {}),
    })
      .then((res) => res.json())
      .then((data) => {
        setChamados(data);
        console.log("chamados recebidos: ", data);
      })
      .catch((err) => console.error("Erro ao buscar chamados:", err));
  }, []);

  return (
    <div className="table-container">
      <div className="table-header">
        <table>
          <colgroup>
            <col className="col-id" />
            <col className="col-cliente" />
            <col className="col-titulo" />
            <col className="col-descricao" />
            <col className="col-criacao" />
            <col className="col-categoria" />
            <col className="col-prioridade" />
            <col className="col-situacao" />
            <col className="col-conclusao" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Criação</th>
              <th>Categoria</th>
              <th>Priori...</th>
              <th>Status</th>
              <th>Conclusão</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="table-content">
        <table>
          <colgroup>
            <col className="col-id" />
            <col className="col-cliente" />
            <col className="col-titulo" />
            <col className="col-descricao" />
            <col className="col-criacao" />
            <col className="col-categoria" />
            <col className="col-prioridade" />
            <col className="col-situacao" />
            <col className="col-conclusao" />
          </colgroup>
          <tbody>
            {chamados.map((chamado) => (
              <tr key={chamado.id} onClick={() => setChamadoClicado(chamado)}>
                <td>{chamado.id}</td>
                <td>{chamado.usuario?.primeiroNome || "Sem nome"}</td>
                <td>{chamado.titulo || "Sem título"}</td>
                <td>{chamado.descricao || "Sem descrição"}</td>
                <td>
                  {new Date(chamado.dataCriacao).toLocaleDateString("pt-BR")}
                </td>
                <td>{chamado.categoria}</td>
                <td>{chamado.prioridade}</td>
                <td>{chamado.status.replace("_", " ")}</td>
                <td>
                  {chamado.dataConclusao
                    ? new Date(chamado.dataConclusao).toLocaleDateString(
                        "pt-BR"
                      )
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
