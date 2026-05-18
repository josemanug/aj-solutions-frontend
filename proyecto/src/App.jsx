import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import GuestHome from "./guestHome.component";
import UserHome from "./userHome.component";
import AdminDashboard from "./components/dashboards/AdminDashboard";

import ListarUsuarios from "./components/dashboards/admin.components/usuarios/ListarUsuarios.component";
import RegisterEmpleado from "./components/dashboards/admin.components/usuarios/function/nuevoEmplaedo/registerEmpleado.component";
import Calendario from "./components/dashboards/admin.components/calendario/Calendario.component";
import Servicio from "./components/dashboards/admin.components/servicio/Servicio.component";
import Reseña from "./components/dashboards/admin.components/reseñas/Reseña.component";

import Citas from "./components/dashboards/empleado.components/citas/empleado.component";

import Historial from "./components/dashboards/cliente.component/historial/Historial.component";
import Pago from "./components/dashboards/cliente.component/pago/pago.component";
import Reserva from "./components/dashboards/cliente.component/reserva/reserva.component";


function Home() {
  return (
    <>
      <Header />
      <main className="container py-5">
        <GuestHome />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<UserHome />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/users" element={<ListarUsuarios />} />
        <Route path="/nuevoEmpleado" element={<RegisterEmpleado />} />
        <Route path="/admin/calendario" element={<Calendario />} />
        <Route path="/admin/servicio" element={<Servicio />} />
        <Route path="/admin/reseña" element={<Reseña />} />

        <Route path="/empleado/citas" element={<Citas />} />

        <Route path="/cliente/historial" element={<Historial />} />
        <Route path="/cliente/pago" element={<Pago />} />
        <Route path="/cliente/reseña" element={<Reseña />} />
        <Route path="/cliente/reserva" element={<Reserva />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;