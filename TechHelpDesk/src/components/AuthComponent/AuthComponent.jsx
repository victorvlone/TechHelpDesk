import { useState } from "react";
import "./AuthComponent.css";

function AuthComponent({ usuarioLogado, setUsuarioLogado }) {
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tipoDeUsuario, setTipoDeUsuario] = useState("CLIENTE");

  const [isLogin, setIsLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  const [primeiroNomeError, setPrimeiroNomeError] = useState(false);
  const [ultimoNomeError, setUltimoNomeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [senhaConfirmError, setSenhaConfirmError] = useState(false);
  const [emailPasswordError, setEmailPasswordError] = useState(false);

  const confirmarSenhasIguais = () => {
    if (senha !== confirmarSenha) {
      setSenhaConfirmError(true);
      return false;
    }
    return true;
  };

  const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === "") {
      setEmailError(true);
      return;
    } else if (loginSenha === "") {
      setSenhaError(true);
      return;
    }
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        senha: loginSenha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          const payload = JSON.parse(atob(data.token.split(".")[1]));
          const tipo = payload.role || payload.tipoDeUsuario || "CLIENTE";
          const id = payload.id;
          const nome = payload.nome;
          const sobrenome = payload.sobreNome;

          setUsuarioLogado({ tipo, id, nome, sobrenome, token: data.token });
          localStorage.setItem(
            "usuario",
            JSON.stringify({ tipo, id, nome, sobrenome, token: data.token })
          );

          console.log("Login bem-sucedido!");
        } else {
          console.error("Erro: token não recebido");
        }
      })

      .catch((error) => {
        setEmailPasswordError(true);
        console.error("Erro na requisição:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (primeiroNome === "") {
      setPrimeiroNomeError(true);
      return;
    } else if (ultimoNome === "") {
      setUltimoNomeError(true);
      return;
    } else if (email === "" || !emailValido(email)) {
      setEmailError(true);
      return;
    } else if (senha === "") {
      setSenhaError(true);
      return;
    }
    if (!confirmarSenhasIguais()) return;
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        primeiroNome,
        ultimoNome,
        email,
        senha,
        tipoDeUsuario,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Usuário cadastrado com sucesso!");
          setIsLogin(true);
          setPrimeiroNome("");
          setUltimoNome("");
          setEmail("");
          setSenha("");
          setConfirmarSenha("");
        } else {
          console.error("Erro ao cadastrar usuário:", data.message);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <img src="../assets/images/logo-icon.png" alt="" />
        <div className={`register-container ${isLogin ? "" : "show"}`}>
          <div className="completeName-container">
            <div className="auth-input-container">
              <label htmlFor="primeiroNome">Primeiro nome</label>
              <input
                type="text"
                placeholder="Primeiro nome"
                value={primeiroNome}
                onChange={(e) => {
                  setPrimeiroNome(e.target.value);
                  setPrimeiroNomeError(false);
                }}
              />
              <p className={`message-error ${primeiroNomeError ? "show" : ""}`}>
                Campo obrigatório.
              </p>
            </div>
            <div className="auth-input-container">
              <label htmlFor="ultimoNome">Ultimo nome</label>
              <input
                type="text"
                placeholder="Ultimo nome"
                value={ultimoNome}
                onChange={(e) => {
                  setUltimoNome(e.target.value);
                  setUltimoNomeError(false);
                }}
              />
              <p className={`message-error ${ultimoNomeError ? "show" : ""}`}>
                Campo obrigatório.
              </p>
            </div>
          </div>
          <div className="auth-input-container">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />

            <p className={`message-error ${emailError ? "show" : ""}`}>
              Digite um e-mail válido.
            </p>
          </div>
          <div className="auth-input-container">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setSenhaError(false);
              }}
            />

            <p className={`message-error ${senhaError ? "show" : ""}`}>
              O campo de senha é obrigatório.
            </p>
          </div>
          <div className="auth-input-container">
            <label htmlFor="ConfirmarSenha">Confirme a senha</label>
            <input
              type="password"
              placeholder="Confirme a senha"
              value={confirmarSenha}
              onChange={(e) => {
                setConfirmarSenha(e.target.value);
                setSenhaConfirmError(false);
              }}
            />

            <p className={`message-error ${senhaConfirmError ? "show" : ""}`}>
              As senhas não coincidem.
            </p>
          </div>
          <div className="auth-input-container">
            <label htmlFor="tipoDeUsuario">TIpo de Usuario</label>
            <select
              value={tipoDeUsuario}
              onChange={(e) => setTipoDeUsuario(e.target.value)}
            >
              <option value="CLIENTE">Cliente</option>
              <option value="TECNICO">Técnico</option>
            </select>
          </div>
          <button type="button" onClick={handleSubmit}>
            Cadastre-se
          </button>
          <p>
            Já possui uma conta? <a onClick={() => setIsLogin(true)}>Login</a>
          </p>
        </div>
        <div className={`login-container ${isLogin ? "show" : ""}`}>
          <div className="auth-input-container">
            <label htmlFor="emailLogin">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
                setEmailError(false);
              }}
            />

            <p className={`message-error ${emailError ? "show" : ""}`}>
              Digite um e-mail válido.
            </p>
          </div>
          <div className="auth-input-container">
            <label htmlFor="senhaLogin">Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={loginSenha}
              onChange={(e) => {
                setLoginSenha(e.target.value);
                setSenhaError(false);
                setEmailPasswordError(false);
              }}
            />
            <p className={`message-error ${senhaError ? "show" : ""}`}>
              Digite a senha.
            </p>

            <p className={`message-error ${emailPasswordError ? "show" : ""}`}>
              Email ou senha incorretos.
            </p>
          </div>

          <button type="button" onClick={handleLogin}>
            Entrar
          </button>
          <p>
            Não possui uma conta?
            <a onClick={() => setIsLogin(false)}>Cadastrar-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
