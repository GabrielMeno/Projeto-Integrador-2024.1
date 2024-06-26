import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import PainelPrincipal from "pages/PainelPrincipal";
import Ordens from "pages/Ordens";
import Cadastro from "pages/Cadastro";
import EditarOrdem from "pages/EditarOrdem";
import PainelUsuarios from "pages/PainelUsuarios";
import EditarUsuario from "pages/EditarUsuario";
import CadastrarUsuario from "pages/CadastrarUsuario";

const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/", element: <Home /> },
        { path: "*", element: <NotFound /> },
        {
            path: "/painelprincipal",
            element: <PainelPrincipal />,
        },
        {
            path: "/ordens",
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
