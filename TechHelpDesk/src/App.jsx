import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideBar/Sidebar";
import Table from "./components/Table/Table";
import ChamadoSleecionado from "./components/ChamadoSelecionado/ChamadoSelecionado";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="tecnico-content">

      <ChamadoSleecionado />
      <Table />
      </div>
    </>
  );
}

export default App;
