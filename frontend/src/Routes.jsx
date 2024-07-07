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
import ResultadoUsuarios from 'pages/ResultadoUsuarios';
import ResultadoOrdens from 'pages/ResultadoOrdens';
import PrivateRoute from './PrivateRoute';

const ProjectRoutes = () => {
  let navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log("Usuário logado com sucesso!");
    navigate('/painelprincipal'); // Redireciona para a página principal após o login
  };

  let element = useRoutes([
    { path: '/', element: <Login onLogin={handleLoginSuccess} /> },
    { path: '*', element: <NotFound /> },
    { path: '/login', element: <Login onLogin={handleLoginSuccess} /> },
    { 
      path: '/', 
      element: <PrivateRoute />, 
      children: [
        { path: '/painelprincipal', element: <PainelPrincipal /> },
        { path: '/ordens', element: <Ordens /> },
        { path: '/cadastro', element: <Cadastro /> },
        { path: '/editarordem/:numero', element: <EditarOrdem /> }, // Corrigindo a rota aqui
        { path: '/painelusuarios', element: <PainelUsuarios /> },
        { path: '/editarusuario', element: <EditarUsuario /> },
        { path: '/cadastrarusuario', element: <CadastrarUsuario /> },
        { path: '/resultado-usuarios', element: <ResultadoUsuarios /> },
        { path: '/resultado-ordens', element: <ResultadoOrdens /> }, // Adicionando a rota para resultados de ordens
      ] 
    }
  ]);

  return element;
};

export default ProjectRoutes;
