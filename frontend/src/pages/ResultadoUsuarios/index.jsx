import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import { Button, Heading } from "../../components";
import Header from "../../components/Header";
import axios from 'axios';

export default function ResultadoUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchUsuarios = async () => {
            const token = localStorage.getItem('token'); // Obtenha o token do localStorage
            try {
                const params = new URLSearchParams(location.search);
                console.log('Params:', params.toString());
                const response = await axios.get('http://localhost:3010/consultarUsuarios', {
                    headers: {
                        Authorization: `Bearer ${token}` // Adicione o token no cabeçalho
                    },
                    params
                });
                console.log('Response:', response.data);
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsuarios();
    }, [location.search]);

    return (
        <>
            <Helmet>
                <title>TopDuo - Consultar Usuário</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col items-center gap-[78px] md:gap-[58px] md:p-5 sm:gap-[39px]">
                    <Header className="self-stretch" title="Resultado da Consulta" />
                    <Heading size="textlg" as="h1" className="mt-[50px] uppercase">
                        Usuários Encontrados
                    </Heading>
                    <div className="mt-[30px] flex flex-col gap-7 self-stretch">
                        {usuarios.length > 0 ? (
                            usuarios.map(usuario => (
                                <div key={usuario.cpf} className="p-4 bg-white shadow rounded mb-4 w-full">
                                    <div className="flex flex-col items-start">
                                        <p><strong>Nome:</strong> {usuario.nome}</p>
                                        <p><strong>Nome de Usuário:</strong> {usuario.nome_de_usuario}</p>
                                        <p><strong>CPF:</strong> {usuario.cpf}</p>
                                        <p><strong>RG:</strong> {usuario.rg}</p>
                                        <p><strong>Cargo:</strong> {usuario.cargo}</p>
                                        <p><strong>Permissões:</strong> {usuario.permissoes}</p>
                                    </div>
                                    <Link to={`/editarusuario?cpf=${usuario.cpf}`} className="mt-4">
                                        <Button shape="round" className="font-semibold sm:px-5">
                                            Editar
                                        </Button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum usuário encontrado.</p>
                        )}
                    </div>
                    <Link to="/painelusuarios">
                        <Button shape="round" className="mt-[82px] min-w-[156px] font-semibold sm:px-5">
                            Voltar
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
