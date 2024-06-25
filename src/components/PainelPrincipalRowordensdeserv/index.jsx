import { Heading, Img } from "./..";
import React from "react";

export default function PainelPrincipalRowOrdensDeServ({
    image = "images/img_image_2.png",
    text = "Ordens de serviço",
    ...props
}) {
    return (
        <div
            {...props}
            className={`${props.className} flex items-center mr-4 gap-[23px] bg-neutral-neutral_0 shadow-sm flex-1 rounded-[16px]`}
        >
            <div className="flex rounded-bl-[16px] rounded-tl-[16px] bg-indigo-700_01 p-1">
                <Img src={image} alt="ordens_de" className="h-[44px] w-[44px] object-cover" />
            </div>
            <Heading size="textlg" as="p" className="mb-2 self-end">
                {text}
            </Heading>
        </div>
    );
};
