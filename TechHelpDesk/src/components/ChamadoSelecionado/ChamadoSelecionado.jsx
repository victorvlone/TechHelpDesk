import "./ChamadoSelecionado.css"

function ChamadoSleecionado() {
    return (
        <div className="chamados-container">
            <div className="chamados-content">
                <p><b>ID:</b> 312 </p>
                <p><b>Status:</b> Em andamento</p>
            </div>
            <div className="chamados-content">
                <p><b>Cliente:</b> Diego Santana</p>
                <p><b>Categoria:</b> Hardware</p>
            </div>
            <div className="chamados-content">
                <p><b>Titulo:</b> Impressora não imprime documentos</p>
                <p><b>Prioridade:</b> Baixa</p>
            </div>
            <div className="chamados-content">
                <div className="descricao">
                <p><b>Descrição:</b> Ao tentar imprimir qualquer documento, a impressora HP LaserJet 1020 apresenta o status "offline", mesmo estando ligada e conectada ao computador via USB. Já reiniciei o equipamento e verifiquei os cabos, mas o problema persiste. Preciso imprimir relatórios com urgência. Solicito atendimento o mais breve possível.</p>
                </div>
                <button>Atender chamado<i class="fi fi-br-add"></i></button>
            </div>
        </div>
    )
}
export default ChamadoSleecionado;
