import React from "react";

const Img = ({ className, scr = "defaultNoData.png", alt = "testImg", ...restProps }) => {
    return <img className={className} src={scr} alt={alt} {...restProps} loading={"lazy"} />;
};
export { Img };