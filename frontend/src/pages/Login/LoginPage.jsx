import React from 'react';
import { Button } from '../../components'; // Importe o componente Button (ajuste o caminho conforme necessário)
import { useNavigate } from "react-router-dom";
import '../../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate(); // Mova useNavigate para dentro da função do componente

  const handleLogin = () => {
    navigate("/painelprincipal"); 
  };

  return (
    <div className="login-container">
      <div className="header">
        <h1>Top Duo Informática</h1>
      </div>
      <div className="login-content">
        <div className="login-form">
          <h2>Login</h2>
          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <Button onClick={handleLogin} className="login-button">
            Entrar
          </Button>
        </div>
        <div className="logo">
          <img src="/images/logo-circular.png" alt="Logo da Top Duo Informática" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
