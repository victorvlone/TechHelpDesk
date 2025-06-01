import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideBar/SideBar";
import Table from "./components/Table/Table";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Table />
    </>
  );
}

export default App;
