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
      className={`${
        props.className || ""
      } flex items-center mr-4 gap-6 bg-neutral-100 shadow-sm flex-1 rounded-lg p-4`}
    >
      <div className="flex rounded-bl-lg rounded-tl-lg bg-indigo-700 p-2">
        <Img src={image} alt="ordens_de" className="h-11 w-11 object-cover rounded-full" />
      </div>
      <Heading size="text-lg" as="p" className="mb-0 self-center text-indigo-700">
        {text}
      </Heading>
    </div>
  );
}
