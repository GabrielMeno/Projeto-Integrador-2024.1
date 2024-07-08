import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Heading } from "../../components";
import PainelPrincipalRowordensdeserv from "../../components/PainelPrincipalRowordensdeserv";
import Header from "../../components/Header";
import { jwtDecode } from 'jwt-decode';

export default function PainelPrincipalPage() {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserType(decodedToken.tipo); 
        }
    }, []);

    const data = [
        { link: "/ordens", image: "/images/img_image_2.png", text: "Ordens de serviço" },
        { link: "/relatorio-ordens", image: "/images/img_image_3.png", text: "Gerar relatório" }, 
    ];

    if (userType === 1) {
        data.push({ link: "/painelusuarios", image: "/images/img_image_4.png", text: "Painel de usuários" });
    }

    return (
        <>
            <Helmet>
                <title>TopDuo</title>
                <meta name="description" content="Web site criado usando create-react-app" />
            </Helmet>
            <div className="flex flex-col items-center justify-center bg-gray-300 py-12 md:py-5">
                <div className="container-xs w-full max-w-[1016px] px-5">
                    <Header title="Top Duo Informática" showBackButton={false} />
                    <Heading size="textlg" as="h2" className="mt-4">
                        <span className="font-light text-indigo-700">Bem Vindo (a)!,</span>
                    </Heading>
                    <div className="mt-12 flex items-start gap-12 self-stretch rounded-[16px] py-7 shadow-md md:flex-col sm:py-5">
                        <div className="mb-7 flex flex-1 flex-col items-start gap-5 md:self-stretch">
                            <Heading size="headings" as="h3" className="!text-indigo-900">
                                Ações
                            </Heading>
                            <div className="flex w-full flex-col gap-[104px]">
                                {data.map((d, index) => (
                                    <PainelPrincipalRowordensdeserv {...d} key={"painelprincipal" + index} className="md:mr-0" />
                                ))}
                            </div>
                        </div>
                        <div className="flex w-[44%] items-center justify-between gap-5 md:w-full">
                            <div className="h-full w-[4px] bg-indigo-700" />
                            <Img src="images/img_image_1.png" alt="imageone" className="h-[366px] w-[84%] object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
