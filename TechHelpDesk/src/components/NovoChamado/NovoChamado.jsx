import "./NovoChamado.css";

function NovoChamado({ showNovoChamado, setShowNovoChamado }) {
  return (
    <div className={`novoChamado-container ${showNovoChamado ? "show" : ""}`}>
      <img src="/assets/images/logo.png" alt="" />
      <i
        class="fi fi-bs-cross close-icon"
        onClick={() => setShowNovoChamado(false)}
      ></i>
      <div className="novoChamado-input">
        <label htmlFor="">Titulo:</label>
        <input type="text" placeholder="Titulo" />
      </div>
      <div className="novoChamado-input">
        <label htmlFor="">Descrição:</label>
        <textarea
          rows={5}
          cols={40}
          maxLength={500}
          placeholder="Descreva seu problema"
        />
      </div>
      <div className="novoChamado-input">
        <label htmlFor="">Prioridade:</label>
        <select name="prioridade" id="">
          <option value="">Baixa</option>
          <option value="">Média</option>
          <option value="">Alta</option>
        </select>
      </div>
      <div className="novoChamado-input">
        <label htmlFor="">Categoria:</label>
        <select name="categoria" id="">
          <option value="">Software</option>
          <option value="">Wardware</option>
        </select>
      </div>
      <button>Adicionar chamado</button>
    </div>
  );
}

export default NovoChamado;
