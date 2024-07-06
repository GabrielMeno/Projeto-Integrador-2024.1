import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Heading } from "../../components";
import Header from "../../components/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export default function EditarUsuarioPage() {
    const [formData, setFormData] = useState({
        nome: '',
        nome_de_usuario: '',
        cargo: '',
        senha: '',
        confirmar_senha: '',
        cpf: '',
        rg: '',
        permissoes: ''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const cpf = params.get('cpf');

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3010/usuario?cpf=${cpf}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFormData({
                    nome: response.data.nome,
                    nome_de_usuario: response.data.nome_de_usuario,
                    cargo: response.data.cargo,
                    senha: '',
                    confirmar_senha: '',
                    cpf: response.data.cpf,
                    rg: response.data.rg,
                    permissoes: response.data.permissoes
                });
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        if (cpf) {
            fetchUser();
        }
    }, [cpf]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        if (formData.senha !== formData.confirmar_senha) {
            alert("As senhas não coincidem!");
            return;
        }

        const dataToSend = {
            nome: formData.nome,
            nome_de_usuario: formData.nome_de_usuario,
            cargo: formData.cargo,
            senha: formData.senha ? formData.senha : undefined,
            cpf: formData.cpf,
            rg: formData.rg,
            permissoes: formData.permissoes
        };

        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:3010/usuario?cpf=${cpf}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Usuário atualizado com sucesso!');
            navigate('/painelusuarios');
        } catch (error) {
            console.error('Erro ao atualizar usuário', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site criado usando create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col gap-[54px] md:p-5 sm:gap-[27px]">
                    <Header />
                    <div className="mx-[186px] flex flex-col items-end gap-[110px] md:mx-0 md:gap-[82px] sm:gap-[55px]">
                        <div className="flex w-[90%] justify-end md:w-full">
                            <div className="flex w-full flex-col items-center gap-[38px]">
                                <Heading size="textlg" as="h1" className="uppercase">
                                    Editar Usuário
                                </Heading>
                                <div className="flex items-center self-stretch md:flex-col">
                                    <div className="flex w-full flex-col items-start gap-[30px]">
                                        <div className="flex w-[90%] flex-col items-center gap-0.5 md:w-full">
                                            <Heading as="h2">Nome Completo</Heading>
                                            <Input shape="round" name="nome" className="self-stretch sm:pr-5" value={formData.nome} onChange={handleChange} />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="h3">Nome de Usuário</Heading>
                                            <Input shape="round" name="nome_de_usuario" className="self-stretch sm:pr-5" value={formData.nome_de_usuario} onChange={handleChange} />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-start md:w-full">
                                            <Heading as="h4" className="relative z-[1] ml-[158px] md:ml-0">
                                                Cargo
                                            </Heading>
                                            <Input shape="round" name="cargo" className="self-stretch sm:pr-5" value={formData.cargo} onChange={handleChange} />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-start md:w-full">
                                            <Heading as="h5" className="ml-[158px] md:ml-0">
                                                Senha
                                            </Heading>
                                            <Input shape="round" name="senha" type="password" className="self-stretch sm:pr-5" value={formData.senha} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col items-end gap-[30px]">
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="h6">CPF</Heading>
                                            <Input shape="round" name="cpf" className="self-stretch sm:pr-5" value={formData.cpf} onChange={handleChange} readOnly />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="p" className="h-[20px] w-[20px]">
                                                RG
                                            </Heading>
                                            <Input shape="round" name="rg" className="self-stretch sm:pr-5" value={formData.rg} onChange={handleChange} />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="p">Permissões</Heading>
                                            <Input shape="round" name="permissoes" className="self-stretch sm:pr-5" value={formData.permissoes} onChange={handleChange} />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="p">Confirmar Senha</Heading>
                                            <Input shape="round" name="confirmar_senha" type="password" className="self-stretch sm:pr-5" value={formData.confirmar_senha} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mr-[102px] flex w-[65%] justify-between gap-5 md:mr-0 md:w-full sm:flex-col">
                            <Link to="/painelusuarios">
                                <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button shape="round" className="min-w-[156px] font-semibold sm:px-5" onClick={handleSubmit}>
                                Salvar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
