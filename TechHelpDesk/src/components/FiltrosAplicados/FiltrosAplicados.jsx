import "./FiltrosAplicados.css";

function FiltrosAplicados({ filtros, setFiltros }) {
  function removerFiltro(chave) {
    const novosFiltros = { ...filtros };
    delete novosFiltros[chave];
    setFiltros(novosFiltros);
  }

  const nomesAmigaveis = {
    prioridade: "Prioridade",
    categoria: "Categoria",
    status: "Status",
  };

  const valoresAmigaveis = {
    BAIXA: "Baixa",
    MEDIA: "Média",
    ALTA: "Alta",
    SOFTWARE: "Software",
    HARDWARE: "Hardware",
    EM_ANDAMENTO: "Em andamento",
    EM_ABERTO: "Em aberto",
    CONCLUIDO: "Concluído",
  };

  return (
    <div className="filtrosAplicados-container">
      {Object.entries(filtros).map(([chave, valor]) => (
        <div key={chave} className="filtroAplicado">
          <p>{valoresAmigaveis[valor] || valor}</p>
          <i
            className="fi fi-br-cross"
            onClick={() => removerFiltro(chave)}
            title={`Remover filtro de ${nomesAmigaveis[chave] || chave}`}
          ></i>
        </div>
      ))}
    </div>
  );
}

export default FiltrosAplicados;
