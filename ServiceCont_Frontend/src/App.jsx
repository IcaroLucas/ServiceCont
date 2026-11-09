import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Entrada from "./pages/Maintenance/Entrada";
import ConsultaMain from "./pages/Maintenance/Consulta";
import CadastroInve from "./pages/Inventory/Cadastro";
import ConsultaInve from "./pages/Inventory/Consulta";
import EditarInv from "./pages/Inventory/Editar";
import Perfil from "./pages/Profile/Perfil";
import PrivateRoute from "./components/ModularRoute/PrivateRoute";

const route = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    path: "/Dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/Maintenance/Entrada",
    element: (
      <PrivateRoute>
        <Entrada />
      </PrivateRoute>
    ),
  },
  {
    path: "/Maintenance/Consulta",
    element: (
      <PrivateRoute>
        <ConsultaMain />
      </PrivateRoute>
    ),
  },

  {
    path: "/Inventory/Cadastro",
    element: (
      <PrivateRoute>
        <CadastroInve />
      </PrivateRoute>
    ),
  },
  {
    path: "/Inventory/Consulta",
    element: (
      <PrivateRoute>
        <ConsultaInve />
      </PrivateRoute>
    ),
  },
  {
    path: "/Inventory/Editar/:id",
    element: (
      <PrivateRoute>
        <EditarInv />
      </PrivateRoute>
    ),
  },
  {
    path: "/Perfil",
    element: (
      <PrivateRoute>
        <Perfil />
      </PrivateRoute>
    ),
  },

  // {
  //   path: "*",
  //   element: (
  //     <PrivateRoute>
  //       <Navigate to="/Dashboard" replace />
  //     </PrivateRoute>
  //   ),
  // },
]);
export default function App() {
  return <RouterProvider router={route} />;
}
