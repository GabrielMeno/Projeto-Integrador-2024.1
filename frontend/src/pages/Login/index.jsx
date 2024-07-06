import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Heading, Img } from '../../components';
import { useNavigate } from "react-router-dom";
import '../../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/painelprincipal"); 
  };

  return (
    <>
      <Helmet>
        <title>TopDuo - Login</title>
        <meta name="description" content="Login to TopDuo Informática" />
      </Helmet>
      <div className="flex w-full flex-col items-center bg-gray-300 py-11 md:py-5">
        <div className="container-xs mb-1 flex flex-col items-center gap-20 md:gap-[60px] md:p-5 sm:gap-10">
          <div className="self-stretch text-center">
            <Heading as="h1">Top Duo Informática</Heading>
          </div>
          <div className="flex w-[28%] flex-col items-center md:w-full">
            <div className="login-form self-stretch flex flex-col items-center">
              <Heading size="textlg" as="h2" className="mt-12 uppercase">Login</Heading>
              <input type="text" placeholder="Usuário" className="mt-4 p-2 border rounded" />
              <input type="password" placeholder="Senha" className="mt-4 p-2 border rounded" />
              <Button onClick={handleLogin} shape="round" className="mt-6 min-w-[156px] font-semibold sm:px-5">
                Entrar
              </Button>
            </div>
            <div className="logo mt-12">
              <Img src="/images/logo-circular.png" alt="Logo da Top Duo Informática" className="h-[150px] w-[150px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
