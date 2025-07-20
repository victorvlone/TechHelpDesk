import "./Header.css";

function Header({ setShowSidebar }) {
  console.log("setShowSidebar:", setShowSidebar);
  return (
    <div className="header-container container">
      <div className="header-content">
        <div className="logo-btn">
          <div className="logo-btn-container">
            <div className="header-icon-container">
              <i
                class="fi fi-br-menu-burger header-icon"
                onClick={() => setShowSidebar((prev) => !prev)}
              ></i>
            </div>
            <div className="logo-img-container">
              <img className="logo" src="/assets/images/logo2.png" alt="" />
            </div>
          </div>
          <div className="search">
            <input
              className="search-bar"
              type="text"
              placeholder="Pesquise pelo ID..."
            />
            <div className="search-icon-container">
              <i className="fi fi-br-search search-icon"></i>
            </div>
          </div>
        </div>

        <div className="user-content">
          <div className="user-content-container">
            <div className="header-icon-container">
              <i class="fi fi-br-moon-stars header-icon"></i>
            </div>
            <div className="header-icon-container">
              <i class="fi fi-br-bell header-icon"></i>
            </div>
            <img
              className="user-icon"
              src="/assets/images/userProfile.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
