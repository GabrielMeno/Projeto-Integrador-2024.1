import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Heading, SelectBox, TextArea, Img, Text } from "../../components";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'; // Importar a biblioteca de formatação de datas

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

export default function EditarOrdemPage() {
    const [ordem, setOrdem] = useState(null);
    const [status, setStatus] = useState('');
    const { numero } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrdem = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3010/ordem/${numero}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const ordemData = response.data;
                ordemData.data = format(new Date(ordemData.data), 'yyyy-MM-dd');
                ordemData.data_de_entrega = format(new Date(ordemData.data_de_entrega), 'yyyy-MM-dd');
                setOrdem(ordemData);
                setStatus(ordemData.status);
            } catch (error) {
                console.error('Erro ao buscar ordem:', error);
            }
        };

        fetchOrdem();
    }, [numero]);

    const handleStatusChange = (selectedOption) => {
        setStatus(selectedOption ? selectedOption.value : '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrdem(prevOrdem => ({ ...prevOrdem, [name]: value }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const { data_de_entrega, descricao_do_servico, pecas } = ordem;
        try {
            await axios.put(`http://localhost:3010/ordem/${numero}`, { 
                status,
                data_de_entrega,
                descricao_do_servico,
                pecas
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/ordens');
        } catch (error) {
            console.error('Erro ao atualizar ordem:', error);
        }
    };

    if (!ordem) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start gap-[30px] bg-gray-300 py-5 md:gap-[20px] sm:gap-10"> {/* Ajuste o gap e padding */}
                <div className="container-xs md:p-5">
                    <header className="flex items-center justify-between gap-5 md:flex-col">
                        <div className="relative h-[64px] w-[10%] self-end rounded-[5px] bg-indigo-700 md:h-auto md:w-full md:self-auto">
                            <Heading size="headingxs" as="h6" className="ml-4 mt-2 !font-inter !text-white-a700 md:ml-0">
                                Voltar
                            </Heading>
                            <Link to="/ordens">
                                <Button
                                    color="red_A700"
                                    size="xs"
                                    className="absolute bottom-0 left-0 right-0 top-0 m-auto w-max flex-1 rounded-[5px] font-inter font-bold sm:px-5"
                                >
                                    Voltar
                                </Button>
                            </Link>
                        </div>
                        <div className="flex w-[78%] items-end justify-between gap-5 rounded-[16px] bg-indigo-800 px-6 py-2 shadow-xs md:w-full sm:flex-col sm:px-5">
                            <Text as="p" className="ml-2.5 mt-1 md:ml-0">
                                Editar ordem de serviço
                            </Text>
                            <div className="flex items-center gap-2">
                                <a href="#">
                                    <Img src="images/img_image_5.png" alt="imagefive" className="h-[36px] object-cover" />
                                </a>
                                <Heading size="texts" as="p" className="!text-white-a700">
                                    Sair
                                </Heading>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="w-[100%] md:w-full md:p-5">
                    <div className="mb-[22px] ml-[62px] mr-[66px] mt-8 md:mx-0"> {/* Ajuste a margem superior */}
                        <div className="flex flex-col items-center gap-[20px]"> {/* Ajuste o gap */}
                            <div className="self-stretch">
                                <div className="flex items-start gap-9 md:flex-col">
                                    <div className="w-[36%] md:w-full">
                                        <div className="flex items-start justify-between gap-5 sm:flex-col">
                                            <div className="flex w-[88%] flex-col items-center gap-[18px] sm:w-full">
                                                <Heading size="textmd" as="h1" className="uppercase">
                                                    Dados do cliente
                                                </Heading>
                                                <div className="flex flex-col items-center self-stretch">
                                                    <Heading as="h2" className="relative z-[2]">
                                                        Nome
                                                    </Heading>
                                                    <Input shape="round" name="nome" value={ordem.cliente_nome || ''} readOnly className="self-stretch sm:pr-5" />
                                                    <div className="mt-[22px] flex flex-col items-center self-stretch">
                                                        <Heading as="h3" className="relative z-[1]">
                                                            Endereço
                                                        </Heading>
                                                        <Input shape="round" name="endereco" value={`${ordem.cliente_logradouro}, ${ordem.cliente_numero} - ${ordem.cliente_complemento}`} readOnly className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-[1px] flex flex-col items-center self-stretch">
                                                        <Heading as="h4" className="mt-[30px]">
                                                            Email
                                                        </Heading>
                                                        <Input shape="round" name="email" value={ordem.cliente_email || ''} readOnly className="self-stretch sm:pr-5" />
                                                    </div>
                                                </div>
                                                <div className="mt-5 flex flex-col items-center self-stretch">
                                                    <Heading as="h5">Telefone</Heading>
                                                    <Input shape="round" name="telefone" value={ordem.cliente_telefone || ''} readOnly className="self-stretch sm:pr-5" />
                                                </div>
                                            </div>
                                            <div className="h-full w-[4px] bg-indigo-700 sm:h-[4px] sm:w-full" />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col items-center md:self-stretch">
                                        <Heading size="textmd" as="h6" className="ml-[264px] uppercase md:ml-0">
                                            Dados da ordem
                                        </Heading>
                                        <div className="mt-4 flex items-start gap-10 self-stretch md:flex-col">
                                            <div className="w-full">
                                                <div>
                                                    <div className="mx-1.5 flex flex-wrap justify-between gap-5 md:mx-0">
                                                        <Heading as="p" className="ml-[42px]">
                                                            Data
                                                        </Heading>
                                                        <Heading as="p">Data de entrega</Heading>
                                                    </div>
                                                    <div className="flex justify-between gap-5">
                                                        <Input
                                                            size="xs"
                                                            shape="round"
                                                            name="data"
                                                            value={ordem.data || ''}
                                                            readOnly
                                                            className="w-[40%] font-light"
                                                        />
                                                        <Input
                                                            size="xs"
                                                            shape="round"
                                                            name="data_de_entrega"
                                                            type="date"
                                                            value={ordem.data_de_entrega || ''}
                                                            onChange={handleChange}
                                                            className="w-[40%] font-light"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-full flex-col items-center self-end md:self-auto">
                                                <Heading as="p" className="relative z-[3]">
                                                    Status
                                                </Heading>
                                                <SelectBox
                                                    shape="round"
                                                    name="status"
                                                    options={dropDownOptions}
                                                    value={status}
                                                    onChange={handleStatusChange}
                                                    className="self-stretch"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5 flex gap-[22px] self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[4]">
                                                    Reclamações e necessidades
                                                </Heading>
                                                <TextArea shape="round" name="reclamacoes_e_necessidades" value={ordem.reclamacoes_e_necessidades || ''} readOnly className="self-stretch !border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[5]">
                                                    Peças do serviço
                                                </Heading>
                                                <TextArea shape="round" name="pecas" value={ordem.pecas || ''} onChange={handleChange} className="self-stretch !border-indigo-700" />
                                            </div>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-[22px] self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center self-end md:self-auto">
                                                <Heading as="p">Descrição do serviço</Heading>
                                                <TextArea shape="round" name="descricao_do_servico" value={ordem.descricao_do_servico || ''} onChange={handleChange} className="self-stretch !border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[6]">
                                                    Funcionário responsável
                                                </Heading>
                                                <Input shape="round" name="funcionario_responsavel" value={ordem.funcionario_nome || ''} readOnly className="self-stretch sm:pr-5" />
                                                <Heading as="p" className="relative z-[7] mt-1">
                                                    Valor do serviço
                                                </Heading>
                                                <Input
                                                    size="xs"
                                                    shape="round"
                                                    name="valor"
                                                    value={ordem.valor || ''}
                                                    readOnly
                                                    className="self-stretch font-medium sm:pr-5"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[30%] justify-between gap-5 md:w-full">
                                <Link to="/ordens">
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
            </div>
        </>
    );
}
