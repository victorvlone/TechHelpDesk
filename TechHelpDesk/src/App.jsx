import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideBar/Sidebar";
import Table from "./components/Table/Table";
import ChamadoSleecionado from "./components/ChamadoSelecionado/ChamadoSelecionado";
import ClienteChamados from "./components/ClienteChamados/ClienteChamados";
import NovoChamado from "./components/NovoChamado/NovoChamado";
import AuthComponent from "./components/AuthComponent/AuthComponent";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNovoChamado, setShowNovoChamado] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  if (!usuarioLogado) {
    return (
      <AuthComponent
        usuarioLogado={usuarioLogado}
        setUsuarioLogado={setUsuarioLogado}
      />
    );
  }

  console.log("Usuário logado no App.jsx:", usuarioLogado);
  return (
    <>
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={`tecnico-content container ${showSidebar ? "left" : ""}`}>
        {usuarioLogado.tipo === "TÉCNICO" && (
          <>
            <Table />
            <ChamadoSleecionado />
          </>
        )}
        {usuarioLogado.tipo === "CLIENTE" && (
          <>
            <NovoChamado
              showNovoChamado={showNovoChamado}
              setShowNovoChamado={setShowNovoChamado}
            />
            <ClienteChamados setShowNovoChamado={setShowNovoChamado} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
