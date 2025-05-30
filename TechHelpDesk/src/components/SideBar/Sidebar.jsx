import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src="/assets/images/logo.png" alt="" />
        <div className="sidebar-header-data">
          <h4>João Victor</h4>
          <p>Técnico</p>
        </div>
      </div>
      <div className="sidebar-nav">
        <ul>
          <li>
            <p className="nav-title">Situação</p>
            <ul className="situacao-options">
              <li>Em aberto</li>
              <li>Em andamento</li>
              <li>Concluido</li>
            </ul>
          </li>
          <li>
            <p className="nav-title">Categoria</p>
            <ul className="categoria-options">
              <li>Hardware</li>
              <li>Software</li>
            </ul>
          </li>
          <li>
            <p className="nav-title">Prioridade</p>
            <ul className="prioridade-options">
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
