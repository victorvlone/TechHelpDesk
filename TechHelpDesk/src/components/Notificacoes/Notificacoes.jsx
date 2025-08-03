import { useEffect, useState } from "react";
import "./Notificacoes.css";

function Notificacoes({ showNotificacoes, setShowNotificacoes }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    buscarNotificacoes();
  }, []);

  function buscarNotificacoes() {
    fetch(`http://localhost:8080/notificacoes/nao-lidas/${usuario.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta");
        return res.json();
      })
      .then((data) => {
        setNotificacoes(data);
        console.log("notificacoes que chegaram: ", notificacoes);
      })
      .catch((err) => {
        console.error("Erro ao buscar notificações: ", err);
      });
  }

  function marcarComoLida(id) {
    fetch(`http://localhost:8080/notificacoes/marcar-como-lido/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
      body: JSON.stringify({
        lida: true,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta");
        return res.text();
      })
      .then((mensagem) => {
        console.log(mensagem);
        buscarNotificacoes(); // Atualiza as notificações
      })
      .catch((err) => {
        console.error("Erro ao marcar notificação como lida: ", err);
      });
  }
  return (
    <div className="notificacao-container">
      <h5>Notificações</h5>
      {notificacoes.length > 0 ? (
        notificacoes.map((notificacao) => (
          <div key={notificacao.id} className="notificacao-list-item">
            <i className="fi fi-rr-envelope-dot"></i>
            <p>{notificacao.mensagem}</p>
            <button
              className="notificacao-btn"
              onClick={() => marcarComoLida(notificacao.id)}
            >
              <i className="fi fi-br-check"></i>
            </button>
          </div>
        ))
      ) : (
        <p>Nenhuma notificação encontrada</p>
      )}
    </div>
  );
}
export default Notificacoes;
