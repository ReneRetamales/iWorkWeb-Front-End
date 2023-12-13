import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Registro } from "./Pages/Registro";
import { MenuCli } from "./Pages/PagesCli/MenuCli";
import { EditarPerfilPro } from "./Pages/PagesPro/EditarPerfilPro";
import { EditarPerfilCli } from "./Pages/PagesCli/EditarPerfilCli";
import PerfilCliente from "./Pages/PagesCli/PerfilCliente";
import { PerfilPro } from "./Pages/PagesPro/PerfilProfesional";
import AgregarPortfolio from "./Pages/PagesPro/AgregarPortfolio";
import AdminView from "./Pages/ADMIN/VistaAdmin";
import VistaPerfilPro from "./Pages/PagesCli/VistaPerfilPro";
import { PreguntasFrecuentes } from "./Pages/PreguntasFrecuentes";

function App() {
  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Registro" element={<Registro />}></Route>
          <Route path="/MenuCli" element={<MenuCli />}></Route>
          <Route path="/PerfilCliente" element={<PerfilCliente />}></Route>
          <Route path="/EditarPerfilCli" element={<EditarPerfilCli />}></Route>
          <Route path="/PerfilProfesional" element={<PerfilPro />}></Route>
          <Route path="/EditarPerfilPro" element={<EditarPerfilPro />}></Route>
          <Route
            path="/AgregarPortfolio"
            element={<AgregarPortfolio />}
          ></Route>
          <Route path="/AdminView" element={<AdminView />}></Route>
          <Route path="/PreguntasFrecuentes" element={<PreguntasFrecuentes />}></Route>
          <Route path="/perfil-profesional/:id" element={<VistaPerfilPro />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
