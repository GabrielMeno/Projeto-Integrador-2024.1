import { Helmet } from "react-helmet";
import { Img, Heading, Text } from "../../components";
import PainelPrincipalRowordensdeserv from "../../components/PainelPrincipalRowordensdeserv";
import React, { Suspense } from "react";

const data = [
    {},
    { image: "images/img_image_3.png", text: "Gerar relatório" },
    { image: "images/img_image_4.png", text: "Painel de usuários" },
];

export default function PainelPrincipalPage() {
    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="flex w-full justify-center bg-gray-300 py-12 md:py-5">
                <div className="container-xs mb-3 flex justify-center px-14 md:p-5 md:px-5">
                    <div className="flex w-full flex-col items-start md:w-full">
                        <div className="flex items-center justify-center self-stretch rounded-[16px] bg-indigo-800 p-3 shadow-xs sm:flex-col">
                            <Text as="p" className="text-white">Top Duo Informática</Text>
                            <div className="flex flex-1 items-center justify-end gap-2 sm:self-stretch">
                                <Img src="images/img_image_5.png" alt="imagefive" className="h-9 object-cover" />
                                <Heading size="text-base" as="h1" className="Text-white">
                                    Sair
                                </Heading>
                            </div>
                        </div>
                        <Heading size="text-lg" as="h2" className="mt-6 text-indigo-700">
                            <span className="font-light">Bem Vindo (a),</span>
                            <span>&nbsp;Usuário (a)!</span>
                        </Heading>
                        <div className="mt-12 flex items-start gap-12 self-stretch rounded-[16px] py-7 shadow-md md:flex-col sm:py-5">
                            <div className="mb-7 flex flex-1 flex-col items-start gap-5 md:self-stretch">
                                <Heading size="text-lg" as="h3" className="text-indigo-900">
                                    Ações
                                </Heading>
                                <div className="flex w-full flex-col gap-12">
                                    <Suspense fallback={<div>Loading feed...</div>}>
                                        {data.map((d, index) => (
                                            <PainelPrincipalRowordensdeserv {...d} key={"painelprincipal" + index} className="md:mr-0" />
                                        ))}
                                    </Suspense>
                                </div>
                            </div>
                            <div className="flex w-full md:w-full items-center justify-between gap-5">
                                <div className="h-full w-1 bg-indigo-700" />
                                <Img src="images/img_image_1.png" alt="imageone" className="h-96 w-full object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
