import { Helmet } from "react-helmet";
import { Button, Input, Heading, SelectBox, TextArea, Img, Text } from "../../components";
import React from "react";

const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

export default function EditarOrdemPage() {
    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full flex-col items-start gap-24 bg-gray-300 py-11 md:gap-18 md:py-5 sm:gap-12">
                <div className="container-xs md:p-5">
                    <header className="flex items-center justify-between gap-5 md:flex-col">
                        <div className="relative h-16 w-1/10 self-end rounded-md bg-red-700 md:h-auto md:w-full md:self-auto">
                            <Heading size="headingxs" as="h6" className="ml-4 mt-2 !font-inter !text-white-a700 md:ml-0">
                                Voltar
                            </Heading>
                            <Button
                                color="red_A700"
                                size="xs"
                                className="absolute bottom-0 left-0 right-0 top-0 m-auto w-max flex-1 rounded-md font-inter font-bold sm:px-5"
                            >
                                Voltar
                            </Button>
                        </div>
                        <div className="flex w-4/5 items-end justify-between gap-5 rounded-lg bg-indigo-800 px-6 py-2.5 shadow-xs md:w-full sm:flex-col sm:px-5">
                            <Text as="p" className="ml-2.5 md:ml-0">
                                Editar ordem de serviço
                            </Text>
                            <div className="flex items-center gap-2">
                                <a href="#">
                                    <Img src="images/img_image_5.png" alt="imagefive" className="h-9 object-cover" />
                                </a>
                                <Heading size="texts" as="p" className="text-white-a700">
                                    Sair
                                </Heading>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="w-9/10 md:w-full md:p-5">
                    <div className="mb-5 ml-16 mr-16 mt-24 flex flex-col items-center gap-9 md:mx-0">
                        <div className="self-stretch">
                            <div className="flex items-start gap-9 md:flex-col">
                                <div className="w-2/5 md:w-full">
                                    <div className="flex items-start justify-between gap-5 sm:flex-col">
                                        <div className="flex w-9/10 flex-col items-center gap-4.5 sm:w-full">
                                            <Heading size="textmd" as="h1" className="uppercase">
                                                Dados do cliente
                                            </Heading>
                                            <div className="flex flex-col items-center self-stretch">
                                                <Heading as="h2">Nome</Heading>
                                                <div className="mr-1.5 flex flex-col gap-6.5 self-stretch md:mr-0">
                                                    <Input shape="round" name="edittext" className="sm:pr-5" />
                                                    <div className="flex flex-col items-center">
                                                        <Heading as="h3" className="relative z-10">
                                                            Endereço
                                                        </Heading>
                                                        <Input shape="round" name="edittext_one" className="self-stretch sm:pr-5" />
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <Heading as="h4">Email</Heading>
                                                        <Input shape="round" name="edittext_two" className="self-stretch sm:pr-5" />
                                                    </div>
                                                </div>
                                                <div className="ml-1.5 mt-5 flex flex-col items-center self-stretch md:ml-0">
                                                    <Heading as="h5">Telefone</Heading>
                                                    <Input shape="round" name="edittext_three" className="self-stretch sm:pr-5" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-full w-1 bg-indigo-700 sm:h-1 sm:w-full" />
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col items-start gap-4.5 md:self-stretch">
                                    <Heading size="textmd" as="h6" className="ml-66 md:ml-0 uppercase">
                                        Dados da ordem
                                    </Heading>
                                    <div className="flex items-center gap-10 self-stretch md:flex-col">
                                        <div className="w-full">
                                            <div>
                                                <div className="mx-1.5 flex flex-wrap justify-between gap-5 md:mx-0">
                                                    <Heading as="p" className="ml-10">
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
                                                        prefix={<Img src="images/img_calendar.svg" alt="calendar" className="h-6 w-6" />}
                                                        className="w-2/5 font-light"
                                                    />
                                                    <Input
                                                        size="xs"
                                                        shape="round"
                                                        name="calendar_one"
                                                        placeholder={`DD/MM/AA`}
                                                        prefix={<Img src="images/img_calendar.svg" alt="calendar" className="h-6 w-6" />}
                                                        className="w-2/5 font-light"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col items-center self-end md:self-auto">
                                            <Heading as="p" className="relative z-2">
                                                Status
                                            </Heading>
                                            <SelectBox
                                                shape="round"
                                                name="dropdown"
                                                options={dropDownOptions}
                                                className="self-stretch !border-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-5.5 self-stretch md:flex-col">
                                        <div className="flex w-full flex-col items-center">
                                            <Heading as="p" className="relative z-3">
                                                Reclamações e necessidades
                                            </Heading>
                                            <TextArea shape="round" name="textarea" className="self-stretch !border-indigo-700" />
                                            <div className="mt-6 flex flex-col items-center self-stretch">
                                                <Heading as="p">Descrição do serviço</Heading>
                                                <div className="h-23 self-stretch rounded-lg border-2 border-solid border-indigo-700" />
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col gap-2.5">
                                            <div className="flex flex-col items-center">
                                                <Heading as="p" className="relative z-4">
                                                    Peças do serviço
                                                </Heading>
                                                <TextArea shape="round" name="textarea_one" className="self-stretch !border-indigo-700" />
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Heading as="p" className="relative z-5">
                                                    Funcionário responsável
                                                </Heading>
                                                <SelectBox
                                                    shape="round"
                                                    name="dropdown_one"
                                                    options={dropDownOptions}
                                                    className="self-stretch !border-2"
                                                />
                                                <Heading as="p" className="relative z-6 mt-1">
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
                        </div>
                        <div className="flex w-1/2 justify-between gap-5 md:w-full sm:flex-col">
                            <a href="https://www.youtube.com/embed/bv8Fxk@sz71" target="_blank">
                                <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                    Cancelar
                                </Button>
                            </a>
                            <a href="https://www.youtube.com/embed/bv8Fxk@sz71" target="_blank">
                                <Button shape="round" className="min-w-[156px] font-semibold sm:px-5">
                                    Excluir
                                </Button>
                            </a>
                            <a href="https://www.youtube.com/embed/bv8Fxk@sz71" target="_blank">
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
