import { useState } from "react";
import "./Header.css";
import SeusChamados from "../SeusChamados/SeusChamados";
import UserProfile from "../UserProfile/UserProfile";
import { useTransition, animated } from "@react-spring/web";
import UserOptions from "../UserOptions/UserOptions";
import Notificacoes from "../Notificacoes/Notificacoes";

function Header({
  setShowSidebar,
  setChamadoPesquisado,
  onLogout,
  setDarkMode,
  darkMode,
}) {
  const [idPesquisado, setIdPesquisado] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showSeusChamados, setShowSeusChamados] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const [tecChamados, setTecChamados] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const transitionUserProfile = useTransition(showUserProfile, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  const transitionSeusChamados = useTransition(showSeusChamados, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  const transitionUserOptions = useTransition(showUserOptions, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  const transitionNotificacoes = useTransition(showNotificacoes, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  function renderComTransicao(transition, Component, props) {
    return transition((style, item) =>
      item ? (
        <animated.div
          style={{
            ...style,
            position: "absolute",
            top: "100px",
            right: 0,
            zIndex: 3,
          }}
        >
          <Component {...props} />
        </animated.div>
      ) : null
    );
  }

  function chamadosDoTecnico(status) {
    const tecnico = JSON.parse(localStorage.getItem("usuario"));
    console.log("ID do técnico usado na requisição:", tecnico.id);
    fetch(`http://localhost:8080/chamados/tecnico/chamados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tecnico.token}`,
      },
      body: JSON.stringify({
        id: tecnico.id,
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
        console.log("dados que chegaram: ", data);
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

    if (valor.trim() === "") {
      setChamadoPesquisado(null);
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
            <div
              className="header-icon-container"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <i className="fi fi-br-moon-stars header-icon"></i>
            </div>
            <div
              className="header-icon-container"
              onClick={() => {
                setShowNotificacoes((prev) => !prev);
                setShowUserOptions(false);
                setShowSeusChamados(false);
                setShowUserProfile(false);
              }}
            >
              <i className="fi fi-br-bell header-icon"></i>
            </div>
            <img
              className="user-icon"
              src={
                usuario.fotoDePerfil
                  ? `http://localhost:8080${usuario.fotoDePerfil}`
                  : "/assets/images/userProfile.png"
              }
              alt=""
              onClick={() => {
                setShowUserOptions((prev) => !prev);
                setShowSeusChamados(false);
                setShowUserProfile(false);
                setShowNotificacoes(false);
              }}
            />
          </div>
        </div>
        {renderComTransicao(transitionUserOptions, UserOptions, {
          onLogout,
          setShowSeusChamados,
          setShowUserProfile,
          chamadosDoTecnico,
          usuario,
        })}

        {renderComTransicao(transitionUserProfile, UserProfile, {
          showUserProfile,
          setShowUserProfile,
        })}

        {renderComTransicao(transitionSeusChamados, SeusChamados, {
          tecChamados,
          chamadosDoTecnico,
          setShowSeusChamados,
          darkMode,
        })}

        {renderComTransicao(transitionNotificacoes, Notificacoes, {
          showNotificacoes,
          setShowNotificacoes,
        })}
      </div>
    </div>
  );
}
export default Header;
