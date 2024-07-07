import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, SelectBox, Heading, Img, Input } from "../../components";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";

const dropDownOptions = [
    { label: "Em aberto", value: "em_aberto" },
    { label: "Em execução", value: "em_execucao" },
    { label: "Aguardando aprovação", value: "aguardando_aprovacao" },
    { label: "Aguardando peça", value: "aguardando_peca" },
    { label: "Em processo", value: "em_processo" },
    { label: "Recusada", value: "recusada" },
    { label: "Finalizada", value: "finalizada" },
    { label: "Em garantia", value: "em_garantia" },
];

export default function OrdensPage() {
    const [formData, setFormData] = useState({
        data: '',
        status: '',
        cliente: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        setFormData(prevState => ({ ...prevState, [name]: selectedOption.value }));
    };

    const handleSubmit = () => {
        const queryString = new URLSearchParams(formData).toString();
        navigate(`/resultado-ordens?${queryString}`);
    };

    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col items-center gap-20 md:gap-[60px] md:p-5 sm:gap-10">
                    <Header className="self-stretch" />
                    <div className="flex w-[28%] flex-col items-center md:w-full">
                        <Link to="/cadastro">
                            <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                Nova OS
                            </Button>
                        </Link>
                        <Heading size="textlg" as="h2" className="mt-12 uppercase">
                            Consultar ordem
                        </Heading>
                        <div className="mt-8 flex flex-col items-center self-stretch">
                            <Heading as="h3">Data</Heading>
                            <Input
                                type="date"
                                shape="round"
                                name="data"
                                className="self-stretch sm:pr-5"
                                onChange={handleChange}
                            />
                            <div className="mt-[30px] flex flex-col items-center self-stretch">
                                <Heading as="h5" className="relative z-[1]">
                                    Status
                                </Heading>
                                <SelectBox
                                    shape="round"
                                    name="status"
                                    options={dropDownOptions}
                                    className="self-stretch"
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div className="mt-[26px] flex flex-col items-center self-stretch">
                                <Heading as="h6">Cliente</Heading>
                                <Input
                                    shape="round"
                                    name="cliente"
                                    className="self-stretch sm:pr-5"
                                    onChange={handleChange}
                                />
                            </div>
                            <Button shape="round" className="mt-[82px] min-w-[156px] font-semibold sm:px-5" onClick={handleSubmit}>
                                Consultar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
