import "./Header.css";

function Header({ setShowSidebar }) {
  console.log("setShowSidebar:", setShowSidebar);
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="logo-btn">
          <div className="logo-btn-container">
            <i
              class="fi fi-br-menu-burger header-icon"
              onClick={() => setShowSidebar(true)}
            ></i>
            <img className="logo" src="/assets/images/logo.png" alt="" />
          </div>
        </div>
        <div className="search-container">

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
        </div>
        <div className="user-content">
          <div className="user-content-container">
            <i class="fi fi-bs-moon header-icon"></i>
            <i class="fi fi-br-bell header-icon"></i>
            <img
              className="user-icon"
              src="/assets/images/usuario-icon.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
