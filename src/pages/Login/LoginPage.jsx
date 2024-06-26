import React from 'react';
import '../../styles/LoginPage.css';

const LoginPage = () => {
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
        </div>
        <div className="logo">
        <img src="/images/logo-circular.png" alt="Logo da Top Duo Informática" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
