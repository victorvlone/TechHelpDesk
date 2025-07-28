import { useState } from "react";
import "./NovoChamado.css";

function NovoChamado({ showNovoChamado, setShowNovoChamado }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("BAIXA");
  const [categoria, setCategoria] = useState("SOFTWARE");
  const [status, setStatus] = useState("EM_ABERTO");
  const [tituloError, setTituloError] = useState(false);
  const [descricaoError, setDescricaoError] = useState(false);

  const criarChamado = (e) => {
    e.preventDefault();

    if (titulo === "") {
      setTituloError(true);
      return;
    }

    if (descricao === "") {
      setDescricaoError(true);
      return;
    }
    const cliente = JSON.parse(localStorage.getItem("usuario"));
    fetch("http://localhost:8080/chamados/novo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cliente.token}`,
      },
      body: JSON.stringify({
        cliente: {
          id: cliente.id,
        },
        titulo,
        descricao,
        prioridade,
        categoria,
        status,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao criar chamado: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Chamado adicionado:", data);
        setShowNovoChamado(false);
      })
      .catch((error) => {
        console.error("Erro ao adicionar chamado:", error);
      });
  };

  return (
    <div className={`novoChamado-container ${showNovoChamado ? "show" : ""}`}>
      <img src="/assets/images/logo-name.png" alt="" />
      <i
        className="fi fi-bs-cross close-icon"
        onClick={() => setShowNovoChamado(false)}
      ></i>
      <div className="novoChamado-input">
        <label htmlFor="">Titulo:</label>
        <input
          type="text"
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => {setTitulo(e.target.value); setTituloError(false)}}
          required
        />
      </div>
      {tituloError && <p>Digite um título para o seu chamado.</p>}
      <div className="novoChamado-input">
        <label htmlFor="">Descrição:</label>
        <textarea
          rows={5}
          cols={40}
          maxLength={500}
          placeholder="Descreva seu problema"
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
            setDescricaoError(false);
          }}
          required
        />
      </div>
      {descricaoError && <p>Descreva seu problema para abrir seu chamado.</p>}
      <div className="novoChamado-input">
        <label htmlFor="">Prioridade:</label>
        <select
          name="prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          required
        >
          <option value="BAIXA">Baixa</option>
          <option value="MÉDIA">Média</option>
          <option value="ALTA">Alta</option>
        </select>
      </div>
      <div className="novoChamado-input">
        <label htmlFor="">Categoria:</label>
        <select
          name="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="SOFTWARE">Software</option>
          <option value="HARDWARE">Hardware</option>
        </select>
      </div>
      <button type="button" onClick={criarChamado}>
        Adicionar chamado
      </button>
    </div>
  );
}

export default NovoChamado;
