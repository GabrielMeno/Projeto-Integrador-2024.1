import { Heading, Img, Text, Button } from "../../components";
import React from "react";

export default function Header({ ...props }) {
    return (
        <header {...props} className={`${props.className} flex md:flex-col justify-between items-center gap-5`}> 
            <Button
                color="red_A700"
                size="xs"
                className="min-w-[142px] self-end rounded-[5px] font-inter font-bold md:self-auto"
            >
                Voltar
            </Button>
            <div className="mx-auto flex w-full max-w-[1016px] items-center justify-between rounded-[16px] bg-indigo-800 px-[30px] py-2.5 shadow-xs"> 
                <Text as="p" className="self-end sm:self-auto text-white">
                    Painel ordens de serviço
                </Text>
                <div className="flex items-center gap-1.5">
                    <a href="#">
                        <Img src="images/img_image_5.png" alt="imagefive" className="h-[36px] object-cover" /> 
                    </a>
                    <Heading size="texts" as="p" className="text-white">
                        Sair
                    </Heading>
                </div>
            </div>
        </header>
    );
}
