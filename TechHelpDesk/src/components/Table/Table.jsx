import "./Table.css";

function Table() {
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
            <col className="col-situacao" />
            <col className="col-conclusao" />
          </colgroup>
          <tbody>
            <tr>
              <td>Dado 1</td>
              <td>Dado 2</td>
              <td>Dado 3</td>
              <td>
                Toda vez que tento salvar um novo registro no sistema de
                atendimento, a tela congela por alguns segundos e exibe uma...
              </td>
              <td>Dado 5</td>
              <td>Dado 6</td>
              <td>Dado 7</td>
            </tr>
            <tr>
              <td>Dado 3</td>
              <td>Dado 4</td>
            </tr>
            <tr>
              <td>Dado 3</td>
              <td>Dado 4</td>
            </tr>
            <tr>
              <td>Dado 3</td>
              <td>Dado 4</td>
            </tr>
            <tr>
              <td>Dado 3</td>
              <td>Dado 4</td>
            </tr>
            <tr>
              <td>Dado 3</td>
              <td>Dado 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
