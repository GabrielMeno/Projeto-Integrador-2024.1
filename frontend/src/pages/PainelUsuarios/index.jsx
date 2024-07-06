import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Heading } from "../../components";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";

export default function PainelUsuariosPage() {
    const [formData, setFormData] = useState({
        nome_de_usuario: '',
        cpf: '',
        cargo: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        const queryString = new URLSearchParams(formData).toString();
        navigate(`/consultar-usuario?${queryString}`);
    };

    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col items-center gap-[78px] md:gap-[58px] md:p-5 sm:gap-[39px]">
                    <Header className="self-stretch" title="Painel de Usuários" />
                    <div className="flex w-[48%] flex-col items-center md:w-full">
                        <Link to="/cadastrarusuario">
                            <Button shape="round" className="mx-[92px] w-[50%] font-semibold md:mx-0 sm:px-5">
                                Cadastrar Usuário
                            </Button>
                        </Link>
                        <Heading size="textlg" as="h1" className="mt-[50px] uppercase">
                            Consultar Usuário
                        </Heading>
                        <div className="mt-[30px] flex flex-col gap-7 self-stretch">
                            <div className="flex flex-col items-center gap-1">
                                <Heading as="h2">Nome do Usuário</Heading>
                                <Input shape="round" name="nome_de_usuario" className="self-stretch sm:pr-5" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col items-center">
                                <Heading as="h3">CPF</Heading>
                                <Input shape="round" name="cpf" className="self-stretch sm:pr-5" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col items-center">
                                <Heading as="h4" className="relative z-[1]">
                                    Cargo
                                </Heading>
                                <Input shape="round" name="cargo" className="self-stretch sm:pr-5" onChange={handleChange} />
                            </div>
                        </div>
                        <Button shape="round" className="mt-[82px] min-w-[156px] font-semibold sm:px-5" onClick={handleSubmit}>
                            Consultar
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}