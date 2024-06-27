import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button, Input, Heading, SelectBox, TextArea, Img, Text } from "../../components";

const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

export default function CadastroPage() {
    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start gap-[97px] bg-gray-300 py-11 md:gap-[72px] md:py-5 sm:gap-12">
                <div className="container-xs md:p-5">
                    <header className="flex items-center justify-between gap-5 md:flex-col">
                        <Link to="/painelprincipal"> {/* Link para voltar ao Painel Principal */}
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
                                                    <Input shape="round" name="edittext" className="self-stretch sm:pr-5" />
                                                    <div className="mt-[22px] flex flex-col items-center self-stretch">
                                                        <Heading as="h3" className="relative z-[1]">
                                                            Endereço
                                                        </Heading>
                                                        <Input shape="round" name="edittext_one" className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-[1px] flex flex-col items-center self-stretch">
                                                        <Heading as="h4" className="mt-[30px]">
                                                            Email
                                                        </Heading>
                                                        <Input shape="round" name="edittext_two" className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-5 flex flex-col items-center self-stretch">
                                                        <Heading as="h5">Telefone</Heading>
                                                        <Input shape="round" name="edittext_three" className="self-stretch sm:pr-5" />
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
                                                            name="calendar"
                                                            placeholder={`DD/MM/AA`}
                                                            className="w-[40%] font-light"
                                                        />
                                                        <Input
                                                            size="xs"
                                                            shape="round"
                                                            name="calendar_one"
                                                            placeholder={`DD/MM/AA`}
                                                            className="w-[40%] font-light"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-full flex-col items-center self-end md:self-auto">
                                                <Heading as="p" className="relative z-[3]">
                                                    Status
                                                </Heading>
                                                <SelectBox shape="round" name="dropdown" options={dropDownOptions} className="self-stretch" />
                                            </div>
                                        </div>
                                        <div className="mt-5 flex gap-[22px] self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[4]">
                                                    Reclamações e necessidades
                                                </Heading>
                                                <TextArea shape="round" name="textarea" className="self-stretch !border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[5]">
                                                    Peças do serviço
                                                </Heading>
                                                <TextArea shape="round" name="textarea_one" className="self-stretch !border-indigo-700" />
                                            </div>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-[22px] self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center self-end md:self-auto">
                                                <Heading as="p">Descrição do serviço</Heading>
                                                <TextArea shape="round" name="textarea" className="self-stretch !border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-[6]">
                                                    Funcionário responsável
                                                </Heading>
                                                <SelectBox 
                                                    shape="round" 
                                                    name="dropdown_one" 
                                                    options={dropDownOptions} 
                                                    className="self-stretch !border-2" 
                                                />
                                                <Heading as="p" className="relative z-[7] mt-1">
                                                    Valor do serviço
                                                </Heading>
                                                <Input
                                                    size="xs"
                                                    shape="round"
                                                    name="price"
                                                    placeholder={`R\$`}
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
                                <a href="https://www.youtube.com/embed/bv8Fxk@sz7I" target="_blank">
                                    <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                        Salvar
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
