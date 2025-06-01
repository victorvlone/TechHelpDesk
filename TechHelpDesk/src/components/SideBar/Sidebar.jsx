import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ showSidebar, setShowSidebar }) {
  const [showSituacao, setShowSituacao] = useState(false);
  const [showPrioridade, setShowPrioridade] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);
  return (
    <div className={`sidebar-container ${showSidebar ? "show" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <i
            className="fi fi-rs-angle-double-small-left header-icon"
            onClick={() => setShowSidebar(false)}
          ></i>
          <img src="/assets/images/logo.png" alt="" />
        </div>
        <div className="sidebar-header-data">
          <h4>João Victor</h4>
          <p>Técnico</p>
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
              <i className="fi fi-sr-play"></i>
            </div>
            <ul className={`sidebar-options ${showSituacao ? "show" : ""}`}>
              <li>Em aberto</li>
              <li>Em andamento</li>
              <li>Concluido</li>
            </ul>
          </li>
          <li>
            <div
              className="option-container"
              onClick={() => setShowCategoria((prev) => !prev)}
            >
              <p className="nav-title">Categoria</p>
              <i className="fi fi-sr-play"></i>
            </div>
            <ul className={`sidebar-options ${showCategoria ? "show" : ""}`}>
              <li>Hardware</li>
              <li>Software</li>
            </ul>
          </li>
          <li>
            <div
              className="option-container"
              onClick={() => setShowPrioridade((prev) => !prev)}
            >
              <p className="nav-title">Prioridade</p>
              <i className="fi fi-sr-play"></i>
            </div>
            <ul className={`sidebar-options ${showPrioridade ? "show" : ""}`}>
              <li>Baixa</li>
              <li>Média</li>
              <li>Alta</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
