import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import PainelPrincipal from 'pages/PainelPrincipal';
import Ordens from 'pages/Ordens';
import Cadastro from 'pages/Cadastro';
import EditarOrdem from 'pages/EditarOrdem';
import PainelUsuarios from 'pages/PainelUsuarios';
import EditarUsuario from 'pages/EditarUsuario';
import CadastrarUsuario from 'pages/CadastrarUsuario';
import Login from 'pages/Login';
import ResultadoUsuarios from 'pages/ResultadoUsuarios'; // Importe a nova página

const ProjectRoutes = () => {
  let navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log("Usuário logado com sucesso!");
    navigate('/painelprincipal'); // Redireciona para a página principal após o login
  };

  let element = useRoutes([
    { path: '/', element: <Login onLogin={handleLoginSuccess} /> },
    { path: '*', element: <NotFound /> },
    { path: '/painelprincipal', element: <PainelPrincipal /> },
    { path: '/login', element: <Login onLogin={handleLoginSuccess} /> },
    { path: '/ordens', element: <Ordens /> },
    { path: '/cadastro', element: <Cadastro /> },
    { path: '/editarordem', element: <EditarOrdem /> },
    { path: '/painelusuarios', element: <PainelUsuarios /> },
    { path: '/editarusuario', element: <EditarUsuario /> },
    { path: '/cadastrarusuario', element: <CadastrarUsuario /> },
    { path: '/consultar-usuario', element: <ResultadoUsuarios /> }, // Adicione a nova rota
  ]);

  return element;
};

export default ProjectRoutes;
