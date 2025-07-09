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

  const confirmarSenhasIguais = () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          const payload = JSON.parse(atob(data.token.split(".")[1])); // decodifica o JWT
          const tipo = payload.role || payload.tipoDeUsuario || "CLIENTE"; // depende de como você construiu o JWT

          setUsuarioLogado({ tipo, token: data.token });
          localStorage.setItem(
            "usuario",
            JSON.stringify({ tipo, token: data.token })
          );

          console.log("Login bem-sucedido!");
          console.log("Tipo de usuário recebido:", `"${data.tipoDeUsuario}"`);
          console.log(usuarioLogado);
        } else {
          console.error("Erro: token não recebido");
        }
      })

      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <img src="../assets/images/logo.png" alt="" />
        <div className={`register-container ${isLogin ? "" : "show"}`}>
          <div className="completeName-container">
            <div className="auth-input-container">
              <label htmlFor="primeiroNome">Primeiro nome</label>
              <input
                type="text"
                placeholder="Primeiro nome"
                value={primeiroNome}
                onChange={(e) => setPrimeiroNome(e.target.value)}
              />
            </div>
            <div className="auth-input-container">
              <label htmlFor="ultimoNome">Ultimo nome</label>
              <input
                type="text"
                placeholder="Ultimo nome"
                value={ultimoNome}
                onChange={(e) => setUltimoNome(e.target.value)}
              />
            </div>
          </div>
          <div className="auth-input-container">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-input-container">
            <label htmlFor="senha">Senha</label>
            <input
              type="text"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="auth-input-container">
            <label htmlFor="ConfirmarSenha">Confirme a senha</label>
            <input
              type="text"
              placeholder="Confirme a senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-input-container">
            <label htmlFor="senhaLogin">Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
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
