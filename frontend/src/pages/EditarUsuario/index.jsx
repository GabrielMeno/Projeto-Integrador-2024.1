import { Helmet } from "react-helmet";
import { Button, Input, Heading } from "../../components";
import Header from "../../components/Header";
import React from "react";
import { Link } from "react-router-dom";


export default function EditarUsuarioPage() {
    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start bg-gray-300 py-11 md:py-5">
                <div className="container-xs mb-1 flex flex-col gap-[54px] md:p-5 sm:gap-[27px]">
                    <Header />
                    <div className="mx-[186px] flex flex-col items-end gap-[110px] md:mx-0 md:gap-[82px] sm:gap-[55px]">
                        <div className="flex w-[90%] justify-end md:w-full">
                            <div className="flex w-full flex-col items-center gap-[38px]">
                                <Heading size="textlg" as="h1" className="uppercase">
                                    Editar Usuário
                                </Heading>
                                <div className="flex items-center self-stretch md:flex-col">
                                    <div className="flex w-full flex-col items-start gap-[30px]">
                                        <div className="flex w-[90%] flex-col items-center gap-0.5 md:w-full">
                                            <Heading as="h2">Nome Completo</Heading>
                                            <Input shape="round" name="edittext" className="self-stretch sm:pr-5" />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="h3">Nome de Usuário</Heading>
                                            <Input shape="round" name="edittext_one" className="self-stretch sm:pr-5" />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-start md:w-full">
                                            <Heading as="h4" className="relative z-[1] ml-[158px] md:ml-0">
                                                Cargo
                                            </Heading>
                                            <Input shape="round" name="edittext_two" className="self-stretch sm:pr-5" />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-start md:w-full">
                                            <Heading as="h5" className="ml-[158px] md:ml-0">
                                                Senha
                                            </Heading>
                                            <Input shape="round" name="edittext_three" className="self-stretch sm:pr-5" />
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col items-end gap-[30px]">
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="h6">CPF</Heading>
                                            <Input shape="round" name="edittext_four" className="self-stretch sm:pr-5" />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="p" className="h-[20px] w-[20px]">
                                                RG
                                            </Heading>
                                            <Input shape="round" name="edittext_five" className="self-stretch sm:pr-5" />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="p">Permissões</Heading>
                                            <Input shape="round" name="edittext_six" className="self-stretch sm:pr-5" />
                                        </div>
                                        <div className="flex w-[90%] flex-col items-center md:w-full">
                                            <Heading as="p">Confirmar Senha</Heading>
                                            <Input shape="round" name="edittext_seven" className="self-stretch sm:pr-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mr-[102px] flex w-[76%] justify-between gap-5 md:mr-0 md:w-full sm:flex-col">
                            <a href="https://www.youtube.com/embed/bv8Fxk@sz7I" target="_blank">
                                <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                    Excluir
                                </Button>
                            </a>
                            <Link to="/painelusuarios">
                                <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                    Cancelar
                                </Button>
                            </Link>
                            <a href="https://www.youtube.com/embed/bv8Fxk@sz7I" target="_blank">
                                <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                    Salvar
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
