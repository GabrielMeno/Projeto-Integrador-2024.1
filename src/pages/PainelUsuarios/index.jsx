import { Helmet } from "react-helmet";
import { Button, Input, Heading } from "../../components";
import Header from "../../components/Header";
import React from "react";

export default function PainelUsuariosPage() {
    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col items-center gap-[78px] md:gap-[58px] md:p-5 sm: gap-[39px] ">
                    <Header className="self-stretch" />
                    <div className="flex w-[28%] flex-col items-center md:w-full">
                        <a href="https://www.youtube.com/embed/bv8Fxk@sz71" target="_blank">
                            <Button shape="round" className="mx-[92px] w-full font-semibold md:mx-0 sm:px-5">
                                Cadastrar usuário
                            </Button>
                        </a>
                        <Heading size="textlg" as="hl" className="mt-[50px] uppercase">
                            Consultar usuário
                        </Heading>
                        <div className="mt-[30px] flex flex-col gap-7 self-stretch">
                            <div className="flex flex-col items-center gap-1">
                                <Heading as="h2">Nome do Usuário</Heading>
                                <Input shape="round" name="edittext" className="self-stretch sm:pr-5" />
                            </div>
                            <div className="flex flex-col items-center">
                                <Heading as="h3">CPF</Heading>
                                <Input shape="round" name="edittext_one" className="self-stretch sm:pr-5" />
                            </div>
                            <div className="flex flex-col items-center">
                                <Heading as="h4" className="relative z-[1]"> Cargo
                                </Heading>
                                <Input shape="round" name="edittext_two" className="self-stretch sm:pr-5" />
                            </div>
                        </div>
                        <a href="https://www.youtube.com/embed/bv8Fxk@sz71" target="_blank">
                            <Button shape="round" className="mt-[82px] min-w-[156px] font-semibold sm:px-5">
                                Consultar
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}