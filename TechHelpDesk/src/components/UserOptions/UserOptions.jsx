import "./UserOptions.css";

function UserOptions({ onLogout, setShowSeusChamados, setShowUserProfile, chamadosDoTecnico,  usuario }) {
  return (
    <div className="user-options-container">
      <div
        className="user-options-option"
        onClick={() => setShowUserProfile(true)}
      >
        <i className="fi fi-sr-user"></i>
        <p>Perfil</p>
      </div>
      {usuario?.tipodeUsuario === "TECNICO" && (
        <div
          className="user-options-option"
          onClick={() => {
            setShowSeusChamados(true);
            chamadosDoTecnico("EM_ANDAMENTO");
          }}
        >
          <i className="fi fi-sr-phone-office"></i>
          <p>Seus chamados</p>
        </div>
      )}
      <div className="user-options-option logout" onClick={onLogout}>
        <i className="fi fi-br-sign-out-alt"></i>
        <p>Sair</p>
      </div>
    </div>
  );
}
export default UserOptions;
