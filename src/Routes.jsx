import React from "react";
import { useRoutes } from "react-router-dom";
<<<<<<< HEAD
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import PainelPrincipal from "pages/PainelPrincipal";
import Ordens from "pages/Ordens";
import Cadastro from "pages/Cadastro";
import EditarOrdem from "pages/EditarOrdem";
import PainelUsuarios from "pages/PainelUsuarios";
import EditarUsuario from "pages/EditarUsuario";
import CadastrarUsuario from "pages/CadastrarUsuario";
=======
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PainelPrincipal from "./pages/PainelPrincipal";
import Ordens from "./pages/Ordens";
import Cadastro from "./pages/Cadastro";
import EditarOrdem from "./pages/EditarOrdem";
import PainelUsuarios from "./pages/PainelUsuarios";
import EditarUsuario from "./pages/EditarUsuario";
import LoginPage from "./pages/Login/LoginPage";
>>>>>>> c92ee522c1951215bd792050d15584995e21390b

const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/", element: <Home /> },
        { path: "*", element: <NotFound /> },
        {
            path: "/painelprincipal",
            element: <PainelPrincipal />,
        },
        {
<<<<<<< HEAD
            path: "/ordens",
=======
            path: "LoginPage",
            element: <LoginPage />,
        },
        {
            path: "ordens",
>>>>>>> c92ee522c1951215bd792050d15584995e21390b
            element: <Ordens />,
        },
        {
            path: "/cadastro",
            element: <Cadastro />,
        },
        {
            path: "/editarordem",
            element: <EditarOrdem />,
        },
        {
            path: "/painelusuarios",
            element: <PainelUsuarios />,
        },
        {
            path: "/editarusuario",
            element: <EditarUsuario />,
        },
        {
            path: "/cadastrarusuario",
            element: <CadastrarUsuario />,
        },
    ]);

    return element;
};

export default ProjectRoutes;
