import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Input, SelectBox, Heading } from '../../components';
import Header from "../../components/Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; 

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

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '2px solid #4B0082',
    borderRadius: '16px',
    padding: '2px',
    minHeight: '32px',
    fontSize: '14px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#4B0082',
    backgroundColor: state.isSelected ? '#4B0082' : 'white',
    fontSize: '14px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#4B0082',
    fontSize: '14px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#4B0082',
    fontSize: '14px',
  }),
};

export default function RelatorioOrdensPage() {
    const [formData, setFormData] = useState({
        dataInicio: '',
        dataFim: '',
        status: ''
    });
    const [ordens, setOrdens] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prevState => ({ ...prevState, status: selectedOption ? selectedOption.value : '' }));
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
                    <div className="flex w-[28%] flex-col items-center md:w-full">  {/* Adicionando a largura consistente */}
                        <Heading size="textlg" as="h2" className="mt-12 uppercase">
                            Relatório
                        </Heading>
                        <div className="mt-8 flex flex-col items-center self-stretch">
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
                            <SelectBox
                                shape="round"
                                name="status"
                                options={dropDownOptions}
                                value={formData.status}
                                className="self-stretch"
                                onChange={handleSelectChange}
                                styles={customStyles}  
                            />
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
                                        <p><strong>Data:</strong> {format(new Date(ordem.data), 'dd/MM/yyyy')}</p>
                                        <p><strong>Data de Entrega:</strong> {format(new Date(ordem.data_de_entrega), 'dd/MM/yyyy')}</p>
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
