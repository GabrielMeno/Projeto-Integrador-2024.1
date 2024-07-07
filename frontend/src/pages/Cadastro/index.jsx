import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Heading, SelectBox, TextArea, Img, Text } from "../../components";
import axios from "axios";
import dayjs from "dayjs";

export default function CadastroPage() {
    const [formData, setFormData] = useState({
        nome: '',
        endereco: {
            logradouro: '',
            numero: '',
            complemento: ''
        },
        email: '',
        telefone: '',
        cpfCnpj: '',
        data: '',
        dataDeEntrega: '',
        status: 'Em aberto', 
        reclamacoes: '',
        pecas: '',
        descricao: '',
        funcionario: '',
        valor: ''
    });
    const [funcionarios, setFuncionarios] = useState([]);
    const [clienteAtual, setClienteAtual] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFuncionarios = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3010/funcionarios', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFuncionarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
            }
        };

        fetchFuncionarios();
    }, []);

    useEffect(() => {
        const fetchCliente = async () => {
            if (formData.cpfCnpj) {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get('http://localhost:3010/cliente', {
                        params: { cpf: formData.cpfCnpj },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setClienteAtual(response.data);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.log('Cliente não encontrado');
                    } else {
                        console.error('Erro ao buscar cliente:', error);
                    }
                }
            }
        };

        fetchCliente();
    }, [formData.cpfCnpj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            if (name.startsWith('endereco.')) {
                const [_, key] = name.split('.');
                return {
                    ...prevState,
                    endereco: {
                        ...prevState.endereco,
                        [key]: value
                    }
                };
            } else {
                return { ...prevState, [name]: value };
            }
        });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prevState => ({ ...prevState, funcionario: selectedOption ? selectedOption.value : '' }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        const formattedDate = dayjs(value, 'YYYY-MM-DD').isValid() ? value : '';
        setFormData(prevState => ({ ...prevState, [name]: formattedDate }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token'); 
        
        console.log('Dados enviados:', formData);

        if (!formData.nome || !formData.email || !formData.telefone || !formData.cpfCnpj || 
            !formData.data || !formData.dataDeEntrega || !formData.funcionario || !formData.valor) {
            console.error('Campos obrigatórios estão faltando');
            return;
        }

        if (clienteAtual) {
            const camposDiferentes = [];
            if (clienteAtual.nome !== formData.nome) camposDiferentes.push('Nome');
            if (clienteAtual.email !== formData.email) camposDiferentes.push('Email');
            if (clienteAtual.telefone !== formData.telefone) camposDiferentes.push('Telefone');
            if (clienteAtual.logradouro !== formData.endereco.logradouro) camposDiferentes.push('Logradouro');
            if (clienteAtual.numero !== formData.endereco.numero) camposDiferentes.push('Número');
            if (clienteAtual.complemento !== formData.endereco.complemento) camposDiferentes.push('Complemento');

            if (camposDiferentes.length > 0) {
                const confirmar = window.confirm(`Os seguintes campos do cliente foram alterados: ${camposDiferentes.join(', ')}. Deseja atualizar os dados do cliente no banco de dados?`);
                if (confirmar) {
                    try {
                        await axios.put('http://localhost:3010/cliente', {
                            nome: formData.nome,
                            email: formData.email,
                            telefone: formData.telefone,
                            logradouro: formData.endereco.logradouro,
                            numero: formData.endereco.numero,
                            complemento: formData.endereco.complemento
                        }, {
                            params: { cpf: formData.cpfCnpj },
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        console.log('Dados do cliente atualizados com sucesso');
                    } catch (error) {
                        console.error('Erro ao atualizar dados do cliente', error);
                        return;
                    }
                }
            }
        }

        try {
            const valorFormatado = String(formData.valor).replace(',', '.');
            const response = await axios.post('http://localhost:3010/novaOrdem', {
                ...formData,
                valor: parseFloat(valorFormatado)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Resposta do servidor:', response.data);
            navigate('/painelprincipal');
        } catch (error) {
            console.error('Erro ao cadastrar ordem', error.response ? error.response.data : error);
        }
    };

    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start gap-[97px] bg-gray-300 py-11 md:gap-[72px] md:py-5 sm:gap-12">
                <div className="container-xs md:p-5">
                    <header className="flex items-center justify-between gap-5 md:flex-col">
                        <Link to="/painelprincipal">
                            <Button
                                color="red_A700"
                                size="xs"
                                className="min-w-[142px] self-end rounded-[5px] font-inter font-bold md:self-auto"
                            >
                                Voltar
                            </Button>
                        </Link>
                        <div className="flex w-[80%] justify-between gap-5 rounded-[16px] bg-indigo-800 px-6 py-2 shadow-xs md:w-full ">
                            <Text as="p" className="ml-2.5 mt-1 md:ml-0">
                                Cadastrar ordem de serviço
                            </Text>
                            <div className="flex items-center gap-2">
                                <a href="#">
                                    <Img src="images/img_image_5.png" alt="imagefive" className="h-[36px] object-cover" />
                                </a>
                                <Heading size="texts" as="p" className="text-white-a700">
                                    Sair
                                </Heading>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="w-[100%] md:w-full md:p-5">
                    <div className="mb-[22px] ml-[62px] mr-[66px] mt-24 md:mx-0">
                        <div className="flex flex-col items-center gap-[38px]">
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
                                                    <Input shape="round" name="nome" value={formData.nome} onChange={handleChange} className="self-stretch sm:pr-5" />
                                                    <div className="mt-[22px] flex flex-col items-center self-stretch">
                                                        <Heading as="h3" className="relative z-[1]">
                                                            Logradouro
                                                        </Heading>
                                                        <Input shape="round" name="endereco.logradouro" value={formData.endereco.logradouro} onChange={handleChange} className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-[22px] flex flex-col items-center self-stretch">
                                                        <Heading as="h3" className="relative z-[1]">
                                                            Número
                                                        </Heading>
                                                        <Input shape="round" name="endereco.numero" value={formData.endereco.numero} onChange={handleChange} className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-[22px] flex flex-col items-center self-stretch">
                                                        <Heading as="h3" className="relative z-[1]">
                                                            Complemento
                                                        </Heading>
                                                        <Input shape="round" name="endereco.complemento" value={formData.endereco.complemento} onChange={handleChange} className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-[1px] flex flex-col items-center self-stretch">
                                                        <Heading as="h4" className="mt-[30px]">
                                                            Email
                                                        </Heading>
                                                        <Input shape="round" name="email" value={formData.email} onChange={handleChange} className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-5 flex flex-col items-center self-stretch">
                                                        <Heading as="h5">Telefone</Heading>
                                                        <Input shape="round" name="telefone" value={formData.telefone} onChange={handleChange} className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-5 flex flex-col items-center self-stretch">
                                                        <Heading as="h5">CPF/CNPJ</Heading>
                                                        <Input shape="round" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} className="self-stretch sm:pr-5" />
                                                    </div>
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
                                                            type="date"
                                                            value={formData.data}
                                                            onChange={handleDateChange}
                                                            className="w-[40%] font-light"
                                                        />
                                                        <Input
                                                            size="xs"
                                                            shape="round"
                                                            name="dataDeEntrega"
                                                            type="date"
                                                            value={formData.dataDeEntrega}
                                                            onChange={handleDateChange}
                                                            className="w-[40%] font-light"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-full flex-col items-center self-end md:self-auto">
                                                <Heading as="p" className="relative z-[3]">
                                                    Status
                                                </Heading>
                                                <Input shape="round" name="status" value={formData.status} readOnly className="self-stretch" />
                                            </div>
                                        </div>
                                        <div className="mt-5 flex gap-[22px] self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[4]">
                                                    Reclamações e necessidades
                                                </Heading>
                                                <TextArea shape="round" name="reclamacoes" value={formData.reclamacoes} onChange={handleChange} className="self-stretch !border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[5]">
                                                    Peças do serviço
                                                </Heading>
                                                <TextArea shape="round" name="pecas" value={formData.pecas} onChange={handleChange} className="self-stretch !border-indigo-700" />
                                            </div>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-[22px] self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center self-end md:self-auto">
                                                <Heading as="p">Descrição do serviço</Heading>
                                                <TextArea shape="round" name="descricao" value={formData.descricao} onChange={handleChange} className="self-stretch !border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[6]">
                                                    Funcionário responsável
                                                </Heading>
                                                <SelectBox 
                                                    shape="round" 
                                                    name="funcionario" 
                                                    options={funcionarios.map(f => ({ label: f.nome, value: f.cpf }))} 
                                                    value={formData.funcionario}
                                                    onChange={handleSelectChange}
                                                    className="self-stretch !border-2" 
                                                />
                                                <Heading as="p" className="relative z-[7] mt-1">
                                                    Valor do serviço
                                                </Heading>
                                                <Input
                                                    size="xs"
                                                    shape="round"
                                                    name="valor"
                                                    placeholder={`R$`}
                                                    value={formData.valor}
                                                    onChange={handleChange}
                                                    className="self-stretch font-medium sm:pr-5"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[30%] justify-between gap-5 md:w-full">
                                <Link to="/painelprincipal">
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
