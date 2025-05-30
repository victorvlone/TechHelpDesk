import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="logo-btn">
          <img className="logo" src="/assets/images/logo.png" alt="" />
          <i class="fi fi-rr-menu-burger list-icon"></i>
        </div>
        <div className="search">
          <div className="dropbox-text">
            <p>Em andamento</p>
            <i class="fi fi-rr-angle-small-down"></i>
          </div>
          <input
            className="search-bar"
            type="text"
            placeholder="Pesquise pelo ID..."
          />
          <i class="fi fi-rs-search search-icon"></i>
        </div>
        <div className="user-content">
          <i class="fi fi-rr-moon header-icon"></i>
          <i className="fi fi-rr-bell header-icon"></i>
          <img
            className="user-icon"
            src="/assets/images/usuario-icon.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
export default Header;
