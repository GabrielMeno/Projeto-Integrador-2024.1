import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Input, SelectBox, Heading } from '../../components';
import Header from "../../components/Header";
import axios from 'axios';

const dropDownOptions = [
    { label: "Em aberto", value: "Em aberto" },
    { label: "Em execução", value: "Em execução" },
    { label: "Aguardando aprovação", value: "Aguardando aprovação" },
    { label: "Aguardando peça", value: "Aguardando peça" },
    { label: "Em processo", value: "Em processo" },
    { label: "Recusada", value: "Recusada" },
    { label: "Finalizada", value: "Finalizada" },
    { label: "Em garantia", value: "Em garantia" },
];

export default function RelatorioOrdensPage() {
    const [formData, setFormData] = useState({
        dataInicio: '',
        dataFim: '',
        status: ''
    });
    const [ordens, setOrdens] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (e) => {
        setFormData(prevState => ({ ...prevState, status: e.target.value }));
    };

    const handleSubmit = async () => {
        const queryString = new URLSearchParams(formData).toString();
        try {
            const response = await axios.get(`http://localhost:3010/consultarOrdens?${queryString}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOrdens(response.data);
        } catch (error) {
            console.error('Erro ao buscar ordens:', error);
        }
    };

    const groupedOrdens = ordens.reduce((acc, ordem) => {
        if (!acc[ordem.status]) {
            acc[ordem.status] = [];
        }
        acc[ordem.status].push(ordem);
        return acc;
    }, {});

    return (
        <>
            <Helmet>
                <title>Relatório de Ordens de Serviço</title>
                <meta name="description" content="Relatório de Ordens de Serviço filtrado por data e status" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col items-center gap-20 md:gap-[60px] md:p-5 sm:gap-10">
                    <Header title="Relatório de Ordens de Serviço" />
                    <Heading size="textlg" as="h2" className="mt-12 uppercase">
                        Relatório de Ordens de Serviço
                    </Heading>
                    <div className="mt-8 flex flex-col items-center self-stretch">
                        <div className="flex flex-col items-center self-stretch">
                            <Heading as="h3">Data de Início</Heading>
                            <Input
                                type="date"
                                shape="round"
                                name="dataInicio"
                                className="self-stretch sm:pr-5"
                                onChange={handleChange}
                                value={formData.dataInicio}
                            />
                        </div>
                        <div className="mt-[30px] flex flex-col items-center self-stretch">
                            <Heading as="h3">Data de Fim</Heading>
                            <Input
                                type="date"
                                shape="round"
                                name="dataFim"
                                className="self-stretch sm:pr-5"
                                onChange={handleChange}
                                value={formData.dataFim}
                            />
                        </div>
                        <div className="mt-[30px] flex flex-col items-center self-stretch">
                            <Heading as="h5" className="relative z-[1]">
                                Status
                            </Heading>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleSelectChange}
                                className="self-stretch p-2 border rounded"
                            >
                                <option value="">Selecione o status</option>
                                {dropDownOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button shape="round" className="mt-[82px] min-w-[156px] font-semibold sm:px-5" onClick={handleSubmit}>
                            Gerar Relatório
                        </Button>
                    </div>
                    <div className="mt-8 flex flex-col items-center self-stretch">
                        {Object.keys(groupedOrdens).map(status => (
                            <div key={status} className="mb-8 w-full">
                                <Heading size="textmd" as="h3" className="mb-4">
                                    {status}
                                </Heading>
                                {groupedOrdens[status].map(ordem => (
                                    <div key={ordem.numero} className="p-4 bg-white shadow rounded mb-4">
                                        <p><strong>Cliente:</strong> {ordem.cliente_nome}</p>
                                        <p><strong>Número da Ordem:</strong> {ordem.numero}</p>
                                        <p><strong>Data:</strong> {ordem.data}</p>
                                        <p><strong>Data de Entrega:</strong> {ordem.data_de_entrega}</p>
                                        <p><strong>Descrição:</strong> {ordem.descricao_do_servico}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
