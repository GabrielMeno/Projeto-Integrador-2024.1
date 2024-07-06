import { Helmet } from "react-helmet";
import { Button, SelectBox, Heading, Img } from "../../components";
import Header from "../../components/Header";
import React from "react";
import { Link } from "react-router-dom";


const dropDownOptions = [
    { label: "Em aberto", value: "status1" },
    { label: "Em execução", value: "status2" },
    { label: "Aguardando aprovação", value: "status3" },
    { label: "Aguardando peça", value: "status4" },
    { label: "Em processo", value: "status5" },
    { label: "Recusada", value: "status6" },
    { label: "Finalizada", value: "status7" },
    { label: "Em garantia", value: "status8" },
];


export default function OrdensPage() {
    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col items-center gap-20 md: gap-[60px] md:p-5 sm:gap-10">
                    <Header className="self-stretch" />
                    <div className="flex w- [28%] flex-col items-center md: w-full">
                        <Link to="/cadastro">
                            <Button shape="round" className="min-w-[156px] font-semibold sm: px-5">
                                Nova OS
                            </Button>
                        </Link>
                        <Heading size="textlg" as="h2" className="mt-12 uppercase">
                            Consultar ordem
                        </Heading>
                        <div className="mt-8 flex flex-col items-center self-stretch">
                            <Heading as="h3">Data</Heading>
                            <div className="flex rounded-[16px] border-[3px] border-solid border-indigo-700 p-1.5">
                                <Img src="images/img_calendar.svg" alt="calendar" className="h-[24px] w-[24px]" />
                                <Heading size="texts" as="h4" className="!font-light">
                                    DD/MM/AA
                                </Heading>
                            </div>
                            <div className="mt-[30px] flex flex-col items-center self-stretch">
                                <Heading as="h5" className="relative z-[1]">
                                    Status
                                </Heading>
                                <SelectBox shape="round" name="dropdown" options={dropDownOptions} className="self-stretch" />
                            </div>
                            <div className="mt-[26px] flex flex-col items-center self-stretch">
                                <Heading as="h6">Cliente</Heading>
                                <SelectBox shape="round" name="dropdown_one" options={dropDownOptions} className="self-stretch" />
                            </div>
                            <a href="https://www.youtube.com/embed/bv8Fxk@sz7I" target="_blank">
                                <Button shape="round" className="mt-[82px] min-w-[156px] font-semibold sm: px-5">
                                    Consultar
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}