import { Helmet } from "react-helmet";
import { Button, Input, Heading, SelectBox, TextArea, Img, Text } from "../../components";
import React from "react";

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
            <div className="flex w-full flex-col items-start gap-24 bg-gray-300 py-11 md:gap-18 md:py-5 sm:gap-12">
                <div className="container-xs md:p-5">
                    <header className="flex items-center justify-between gap-5 md:flex-col">
                        <div className="relative h-16 w-10% self-end rounded-5 bg-indigo-700 md:h-auto md:w-full md:self-auto">
                            <Heading size="headingxs" as="h6" className="ml-4 mt-2 font-inter text-white md:ml-0">
                                Voltar
                            </Heading>
                            <Button
                                color="red_A700"
                                size="xs"
                                className="absolute bottom-0 left-0 right-0 top-0 m-auto w-max flex-1 rounded-5 font-inter font-bold sm:px-5"
                            >
                                Voltar
                            </Button>
                        </div>
                        <div className="flex w-4/5 items-end justify-between gap-5 rounded-16 bg-indigo-800 px-6 py-2 shadow-xs md:w-full sm:flex-col sm:px-5">
                            <Text as="p" className="ml-2.5 mt-1 text-white md:ml-0">
                                Cadastrar ordem de serviço
                            </Text>
                            <div className="flex items-center gap-2">
                                <a href="#">
                                    <Img src="images/img_image_5.png" alt="imagefive" className="h-9 object-cover" />
                                </a>
                                <Heading size="texts" as="p" className="text-white">
                                    Sair
                                </Heading>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="w-9/10 md:w-full md:p-5">
                    <div className="mb-6 ml-16 mr-16 mt-24 md:mx-0">
                        <div className="flex flex-col items-center gap-10">
                            <div className="self-stretch">
                                <div className="flex items-start gap-9 md:flex-col">
                                    <div className="w-2/5 md:w-full">
                                        <div className="flex items-start justify-between gap-5 sm:flex-col">
                                            <div className="flex w-11/12 flex-col items-center gap-5 sm:w-full">
                                                <Heading size="textmd" as="h1" className="uppercase">
                                                    Dados do cliente
                                                </Heading>
                                                <div className="flex flex-col items-center self-stretch">
                                                    <Heading as="h2" className="relative z-10">
                                                        Nome
                                                    </Heading>
                                                    <Input shape="round" name="edittext" className="self-stretch sm:pr-5" />
                                                    <div className="mt-6 flex flex-col items-center self-stretch">
                                                        <Heading as="h3" className="relative z-10">
                                                            Endereço
                                                        </Heading>
                                                        <Input shape="round" name="edittext_one" className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-6 flex flex-col items-center self-stretch">
                                                        <Heading as="h4" className="relative z-10">
                                                            Email
                                                        </Heading>
                                                        <Input shape="round" name="edittext_two" className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="mt-6 flex flex-col items-center self-stretch">
                                                        <Heading as="h5" className="relative z-10">
                                                            Telefone
                                                        </Heading>
                                                        <Input shape="round" name="edittext_three" className="self-stretch sm:pr-5" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-full w-1 bg-indigo-700 sm:h-1 sm:w-full" />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col items-start md:self-stretch">
                                        <Heading size="textmd" as="h6" className="ml-64 uppercase md:ml-0">
                                            Dados da ordem
                                        </Heading>
                                        <div className="mt-4 flex items-center gap-10 self-stretch md:flex-col">
                                            <div className="w-full">
                                                <div>
                                                    <div className="mx-1.5 flex flex-wrap justify-between gap-5 md:mx-0">
                                                        <Heading as="p" className="ml-10">
                                                            Data
                                                        </Heading>
                                                        <Heading as="p">
                                                            Data de entrega
                                                        </Heading>
                                                    </div>
                                                    <div className="flex justify-between gap-5">
                                                        <Input
                                                            size="xs"
                                                            shape="round"
                                                            name="calendar"
                                                            placeholder="DD/MM/AA"
                                                            prefix={
                                                                <Img src="images/img_calendar.svg" alt="calendar" className="h-6 w-6" />
                                                            }
                                                            className="w-2/5 font-light"
                                                        />
                                                        <Input
                                                            size="xs"
                                                            shape="round"
                                                            name="calendar_one"
                                                            placeholder="DD/MM/AA"
                                                            prefix={
                                                                <Img src="images/img_calendar.svg" alt="calendar" className="h-6 w-6" />
                                                            }
                                                            className="w-2/5 font-light"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-full flex-col items-center md:self-auto">
                                                <Heading as="p" className="relative z-10">
                                                    Status
                                                </Heading>
                                                <SelectBox shape="round" name="dropdown" options={dropDownOptions} className="self-stretch" />
                                            </div>
                                        </div>
                                        <div className="mt-6 flex gap-6 self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-10">
                                                    Reclamações e necessidades
                                                </Heading>
                                                <TextArea shape="round" name="textarea" className="self-stretch border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-10">
                                                    Peças do serviço
                                                </Heading>
                                                <TextArea shape="round" name="textarea_one" className="self-stretch border-indigo-700" />
                                            </div>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-6 self-stretch md:flex-col">
                                            <div className="flex w-full flex-col items-center md:self-auto">
                                                <Heading as="p" className="relative z-10">
                                                    Descrição do serviço
                                                </Heading>
                                                <div className="h-24 self-stretch rounded-16 border-2 border-solid border-indigo-700" />
                                            </div>
                                            <div className="flex w-full flex-col items-center">
                                                <Heading as="p" className="relative z-10">
                                                    Funcionário responsável
                                                </Heading>
                                                <SelectBox shape="round" name="dropdown_one" options={dropDownOptions} className="self-stretch border-2" />
                                                <Heading as="p" className="relative z-10 mt-2">
                                                    Valor do serviço
                                                </Heading>
                                                <Input
                                                    size="xs"
                                                    shape="round"
                                                    name="price"
                                                    placeholder="R$"
                                                    className="self-stretch font-medium sm:pr-5"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-3/10 justify-between gap-5 md:w-full">
                                <a href="https://www.youtube.com/embed/bv8Fxk@sz71" target="_blank" rel="noopener noreferrer">
                                    <Button shape="round" className="min-w-40 font-semibold sm:px-5">
                                        Cancelar
                                    </Button>
                                </a>
                                <a href="https://www.youtube.com/embed/bv8Fxk@sz71" target="_blank" rel="noopener noreferrer">
                                    <Button shape="round" className="min-w-40 font-semibold sm:px-5">
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
