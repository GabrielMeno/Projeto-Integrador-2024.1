import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
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
import RelatorioOrdens from 'pages/RelatorioOrdens';
import PrivateRoute from './PrivateRoute';

const ProjectRoutes = () => {
  let navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log("Usuário logado com sucesso!");
    navigate('/painelprincipal');
  };

  let element = useRoutes([
    { path: '/', element: <Login onLogin={handleLoginSuccess} /> },
    { path: '/login', element: <Login onLogin={handleLoginSuccess} /> },
    { 
      path: '/', 
      element: <PrivateRoute />, 
      children: [
        { path: '/painelprincipal', element: <PainelPrincipal /> },
        { path: '/ordens', element: <Ordens /> },
        { path: '/cadastro', element: <Cadastro /> },
        { path: '/editarordem/:numero', element: <EditarOrdem /> },
        { path: '/painelusuarios', element: <PainelUsuarios /> },
        { path: '/editarusuario/:cpf', element: <EditarUsuario /> }, 
        { path: '/cadastrarusuario', element: <CadastrarUsuario /> },
        { path: '/resultado-usuarios', element: <ResultadoUsuarios /> }, 
        { path: '/resultado-ordens', element: <ResultadoOrdens /> },
        { path: '/relatorio-ordens', element: <RelatorioOrdens /> },
      ] 
    }
  ]);

  return element;
};

export default ProjectRoutes;
