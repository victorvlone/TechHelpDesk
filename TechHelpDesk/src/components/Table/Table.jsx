import { useEffect, useState } from "react";
import "./Table.css";

function Table({ filtros, setChamadoClicado, chamadoClicado }) {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    console.log("filtros que chegaram: ", filtros);
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
  }, [filtros]);

  return (
    <div className="table-container">
      <div className="table-header-container">
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
              <th className="col-id">ID</th>
              <th className="col-cliente">Cliente</th>
              <th className="col-titulo">Titulo</th>
              <th className="col-descricao">Descrição</th>
              <th className="col-criacao">Criação</th>
              <th className="col-categoria">Cate...</th>
              <th className="col-prioridade">Prio...</th>
              <th className="col-situacao">Status</th>
              <th className="col-conclusao">Conclusão</th>
            </tr>
          </thead>
        </table>
      </div>
      </div>
      <div
        className={`table-content ${
          chamadoClicado && chamadoClicado.id ? "extend" : ""
        }`}
      >
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
                <td className="col-id">{chamado.id}</td>
                <td className="col-cliente">
                  {chamado.usuario?.primeiroNome || "Sem nome"}
                </td>
                <td className="col-titulo">{chamado.titulo || "Sem título"}</td>
                <td className="col-descricao">
                  <div className="descricao-limitada">
    {chamado.descricao || "Sem descrição"}
  </div>
                </td>
                <td className="col-criacao">
                  {new Date(chamado.dataCriacao).toLocaleDateString("pt-BR")}
                </td>
                <td className="col-categoria">{chamado.categoria}</td>
                <td className="col-prioridade">{chamado.prioridade}</td>
                <td className="col-situacao">
                  {chamado.status.replace("_", " ")}
                </td>
                <td className="col-conclusao">
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
