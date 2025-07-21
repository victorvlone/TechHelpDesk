import { useState } from "react";
import "./Header.css";

function Header({ setShowSidebar, setChamadoPesquisado }) {
  const [idPesquisado, setIdPesquisado] = useState("");

  function pesquisar(id) {
    fetch(`http://localhost:8080/chamados/chamadoPorId/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("usuario")).token
        }`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar chamado: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Chamado encontrado: ", data);
        setChamadoPesquisado(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      pesquisar(idPesquisado);
    }
  }

  function handleChange(e) {
  const valor = e.target.value;
  setIdPesquisado(valor);

  // Se apagar o valor, limpa o resultado da busca
  if (valor.trim() === "") {
    setChamadoPesquisado(null); // ou {}
  }
}

  return (
    <div className="header-container container">
      <div className="header-content">
        <div className="logo-btn">
          <div className="logo-btn-container">
            <div className="header-icon-container">
              <i
                className="fi fi-br-menu-burger header-icon"
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
              value={idPesquisado}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            <div
              className="search-icon-container"
              onClick={() => pesquisar(idPesquisado)}
            >
              <i className="fi fi-br-search search-icon"></i>
            </div>
          </div>
        </div>

        <div className="user-content">
          <div className="user-content-container">
            <div className="header-icon-container">
              <i className="fi fi-br-moon-stars header-icon"></i>
            </div>
            <div className="header-icon-container">
              <i className="fi fi-br-bell header-icon"></i>
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
