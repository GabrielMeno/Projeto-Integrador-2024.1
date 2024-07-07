import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import { Button, Heading } from "../../components";
import Header from "../../components/Header";
import axios from 'axios';

export default function ResultadoOrdensPage() {
    const [ordens, setOrdens] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchOrdens = async () => {
            const token = localStorage.getItem('token'); // Obtenha o token do localStorage
            try {
                const params = new URLSearchParams(location.search);
                console.log('Params:', params.toString());
                const response = await axios.get('http://localhost:3010/consultarOrdens', {
                    headers: {
                        Authorization: `Bearer ${token}` // Adicione o token no cabeçalho
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
                                        <p><strong>Data:</strong> {ordem.data}</p>
                                        <p><strong>Data de Entrega:</strong> {ordem.data_de_entrega}</p>
                                        <p><strong>Descrição:</strong> {ordem.descricao_do_servico}</p>
                                    </div>
                                    <Link to={`/editarordem/${ordem.numero}`} className="mt-4">
                                        <Button shape="round" className="font-semibold sm:px-5">
                                            Editar
                                        </Button>
                                    </Link>
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
