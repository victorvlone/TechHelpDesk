import { useState } from "react";
import "./Header.css";
import SeusChamados from "../SeusChamados/SeusChamados";

function Header({ setShowSidebar, setChamadoPesquisado }) {
  const [idPesquisado, setIdPesquisado] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showSeusChamados, setShowSeusChamados] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [tecChamados, setTecChamados] = useState([]);

  function chamadosDoTecnico(status) {
    const tecnico = JSON.parse(localStorage.getItem("usuario"));
    fetch(`http://localhost:8080/chamados/tecnico/chamados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tecnico.token}`,
      },
      body: JSON.stringify({
        tecnico: {
          id: tecnico.id,
        },
        status: [status],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar chamados: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Chamado encontrados: ", data);
        setTecChamados(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

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
              onClick={() => {
                setShowUserOptions((prev) => !prev);
                setShowSeusChamados(false);
                setShowUserProfile(false);
              }}
            />
          </div>
        </div>
        <div
          className={`user-options-container ${showUserOptions ? "show" : ""}`}
        >
          <div
            className="user-options-option"
            onClick={() => setShowUserProfile(true)}
          >
            <i className="fi fi-sr-user"></i>
            <p>Perfil</p>
          </div>
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
          <div className="user-options-option logout">
            <i className="fi fi-br-sign-out-alt"></i>
            <p>Sair</p>
          </div>
        </div>
        <div
          className={`user-profile-container ${showUserProfile ? "show" : ""}`}
        >
          <div className="user-profise-banner">
            <img src="../assets/images/userProfile.png" alt="" />
          </div>
          <div className="user-profile-content">
            <h4>João Victor</h4>
            <p>Cliente</p>
          </div>
          <div
            className="user-profile-back"
            onClick={() => setShowUserProfile(false)}
          >
            <i className="fi fi-sr-arrow-circle-left"></i>
            <p>voltar</p>
          </div>
        </div>
        {showSeusChamados && (
          <SeusChamados
            showSeusChamados={showSeusChamados}
            tecChamados={tecChamados}
            chamadosDoTecnico={chamadosDoTecnico}
            setShowSeusChamados={setShowSeusChamados}
          />
        )}
      </div>
    </div>
  );
}
export default Header;
