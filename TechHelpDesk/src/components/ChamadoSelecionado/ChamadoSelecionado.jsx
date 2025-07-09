import "./ChamadoSelecionado.css"

function ChamadoSleecionado({ chamadoClicado }) {
    return (
        <div className="chamados-container">
            <div className="chamados-content">
                <p><b>ID:</b> {chamadoClicado.id} </p>
                <p><b>Status:</b> {chamadoClicado.status?.replace("_", " ")}</p>
            </div>
            <div className="chamados-content">
                <p><b>Cliente:</b> Diego Santana</p>
                <p><b>Categoria:</b> {chamadoClicado.categoria}</p>
            </div>
            <div className="chamados-content">
                <p><b>Titulo:</b> {chamadoClicado.titulo}</p>
                <p><b>Prioridade:</b> {chamadoClicado.prioridade}</p>
            </div>
            <div className="chamados-content">
                <div className="descricao">
                <p><b>Descrição:</b> {chamadoClicado.descricao}</p>
                </div>
                <button>Atender chamado<i class="fi fi-br-add"></i></button>
            </div>
        </div>
    )
}
export default ChamadoSleecionado;
