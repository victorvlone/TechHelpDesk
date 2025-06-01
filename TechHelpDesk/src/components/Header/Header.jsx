import "./Header.css";

function Header({ setShowSidebar }) {
  console.log("setShowSidebar:", setShowSidebar);
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="logo-btn">
          <i
            class="fi fi-rr-menu-burger header-icon"
            onClick={() => setShowSidebar(true)}
          ></i>
          <img className="logo" src="/assets/images/logo.png" alt="" />
        </div>
        <div className="search">
          <div className="dropbox-text">
            <p>Em andamento</p>
            <i className="fi fi-rr-angle-small-down"></i>
          </div>
          <input
            className="search-bar"
            type="text"
            placeholder="Pesquise pelo ID..."
          />
          <i className="fi fi-rs-search search-icon"></i>
        </div>
        <div className="user-content">
          <i className="fi fi-rr-moon header-icon"></i>
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
