import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Img, Heading, Text, Button } from "../../components";
import { jwtDecode } from 'jwt-decode';


export default function Header({ title, showBackButton = true }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken); // Log para depuração
            setUserType(decodedToken.tipo); // Supondo que o tipo de usuário está no campo "tipo"
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token de autenticação
        navigate("/login"); // Redireciona para a página de login
    };

    return (
        <header className="flex md:flex-col justify-between items-center gap-5">
            {showBackButton && location.pathname !== "/painelprincipal" && (
                <Link to="/painelprincipal">
                    <Button
                        color="red_A700"
                        size="xs"
                        className="min-w-[142px] self-end rounded-[5px] font-inter font-bold md:self-auto"
                    >
                        Voltar
                    </Button>
                </Link>
            )}
            <div className="mx-auto flex w-full max-w-[1016px] items-center justify-between rounded-[16px] bg-indigo-800 px-[30px] py-2.5 shadow-xs">
                <Text as="p" className="self-end sm:self-auto">
                    {title}
                </Text>
                <div className="flex items-center gap-[9px]">
                    {userType === 1 && (
                        <Link to="/painelusuarios">
                            <Button color="blue_A700" size="xs" className="min-w-[142px] self-end rounded-[5px] font-inter font-bold md:self-auto">
                                Painel de Usuários
                            </Button>
                        </Link>
                    )}
                    <Img
                        src="images/img_image_5.png"
                        alt="imagefive"
                        className="h-[36px] object-cover cursor-pointer"
                        onClick={handleLogout}
                    />
                    <Heading
                        size="texts"
                        as="h1"
                        className="text-white-a700 cursor-pointer"
                        onClick={handleLogout}
                    >
                        Sair
                    </Heading>
                </div>
            </div>
        </header>
    );
}
