import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import { Button, Heading } from "../../components";
import Header from "../../components/Header";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns'; 

export default function ResultadoOrdensPage() {
    const [ordens, setOrdens] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchOrdens = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setIsAdmin(decodedToken.tipo === 1); 
            }

            try {
                const params = new URLSearchParams(location.search);
                console.log('Params:', params.toString());
                const response = await axios.get('http://localhost:3010/consultarOrdens', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params
                });
                console.log('Response:', response.data);
                setOrdens(response.data);
            } catch (error) {
                console.error('Erro ao buscar ordens:', error);
            }
        };

        fetchOrdens();
    }, [location.search]);

    const handleDelete = async (numero) => {
        const token = localStorage.getItem('token');
        const confirmed = window.confirm("Tem certeza que deseja excluir esta ordem?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3010/ordem/${numero}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrdens(prevOrdens => prevOrdens.filter(ordem => ordem.numero !== numero));
                alert('Ordem excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir ordem:', error);
                alert('Erro ao excluir ordem. Tente novamente.');
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>TopDuo - Consultar Ordem</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col items-center gap-[78px] md:gap-[58px] md:p-5 sm:gap-[39px]">
                    <Header className="self-stretch" title="Resultado da Consulta" />
                    <Heading size="textlg" as="h1" className="mt-[50px] uppercase">
                        Ordens Encontradas
                    </Heading>
                    <div className="mt-[30px] flex flex-col gap-7 self-stretch">
                        {ordens.length > 0 ? (
                            ordens.map(ordem => (
                                <div key={ordem.numero} className="p-4 bg-white shadow rounded mb-4 w-full">
                                    <div className="flex flex-col items-start">
                                        <p><strong>Cliente:</strong> {ordem.cliente_nome}</p>
                                        <p><strong>Número da Ordem:</strong> {ordem.numero}</p>
                                        <p><strong>Status:</strong> {ordem.status}</p>
                                        <p><strong>Data:</strong> {format(new Date(ordem.data), 'dd/MM/yyyy')}</p>
                                        <p><strong>Data de Entrega:</strong> {format(new Date(ordem.data_de_entrega), 'dd/MM/yyyy')}</p>
                                        <p><strong>Descrição:</strong> {ordem.descricao_do_servico}</p>
                                    </div>
                                    <div className="flex mt-4">
                                        <Link to={`/editarordem/${ordem.numero}`} className="mr-4">
                                            <Button shape="round" className="font-semibold sm:px-5">
                                                Editar
                                            </Button>
                                        </Link>
                                        {isAdmin && (
                                            <Button 
                                                shape="round" 
                                                className="font-semibold sm:px-5 bg-red-500 text-white" 
                                                onClick={() => handleDelete(ordem.numero)}
                                            >
                                                Excluir
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma ordem encontrada.</p>
                        )}
                    </div>
                    <Link to="/ordens">
                        <Button shape="round" className="mt-[82px] min-w-[156px] font-semibold sm:px-5">
                            Voltar
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
