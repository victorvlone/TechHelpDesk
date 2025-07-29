import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ showSidebar, setShowSidebar, setFiltros }) {
  const [showSituacao, setShowSituacao] = useState(false);
  const [showPrioridade, setShowPrioridade] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleFiltroClick = (campo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const opcoesSituacao = ["EM_ABERTO", "EM_ANDAMENTO", "CONCLUIDO"];
  const opcoesCategoria = ["HARDWARE", "SOFTWARE"];
  const opcoesPrioridade = ["BAIXA", "MEDIA", "ALTA"];

  return (
    <div className={`sidebar-container ${showSidebar ? "show" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/assets/images/logo-name.png" alt="" />
        </div>
        <div className="sidebar-header-data">
          <h4>{usuario.nome}</h4>
          <p>{usuario.tipo}</p>
        </div>
      </div>
      <div className="sidebar-nav">
        <ul>
          <li>
            <div
              className="option-container"
              onClick={() => setShowSituacao((prev) => !prev)}
            >
              <p className="nav-title">Situação</p>
              <i className={`fi fi-sr-caret-down ${showSituacao ? "invert-icon" : ""}`}></i>
            </div>
            <ul className={`sidebar-options ${showSituacao ? "show" : ""}`}>
              {opcoesSituacao.map((opcao) => (
                <li
                  key={opcao}
                  onClick={() => handleFiltroClick("status", opcao)}
                >
                  {opcao.replace("_", " ").toLowerCase()}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div
              className="option-container"
              onClick={() => setShowCategoria((prev) => !prev)}
            >
              <p className="nav-title">Categoria</p>
              <i className={`fi fi-sr-caret-down ${showCategoria ? "invert-icon" : ""}`}></i>
            </div>
            <ul className={`sidebar-options ${showCategoria ? "show" : ""}`}>
              {opcoesCategoria.map((opcao) => (
                <li
                  key={opcao}
                  onClick={() => handleFiltroClick("categoria", opcao)}
                >
                  {opcao.toLowerCase()}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div
              className="option-container"
              onClick={() => setShowPrioridade((prev) => !prev)}
            >
              <p className="nav-title">Prioridade</p>
              <i className={`fi fi-sr-caret-down ${showPrioridade ? "invert-icon" : ""}`}></i>
            </div>
            <ul className={`sidebar-options ${showPrioridade ? "show" : ""}`}>
              {opcoesPrioridade.map((opcao) => (
                <li
                  key={opcao}
                  onClick={() => handleFiltroClick("prioridade", opcao)}
                >
                  {opcao.toLowerCase()}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
