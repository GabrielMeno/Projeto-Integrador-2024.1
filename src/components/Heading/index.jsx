import React from "react";

const sizes = {
    textxs: "text-sm font-medium",
    texts: "text-base font-medium",
    textmd: "text-xl font-medium",
    textlg: "text-2xl font-medium md:text-[22px]",
    headingxs: "text-base font-bold",
    headings: "text-[32px] font-semibold md:text-3xl sm:text-[28px]",
};

const Heading = ({ children, className = "", size = "texts", as, ...restProps }) => {
    const Component = as || "h6";

    return (
        <Component className={`text-indigo-700 font-poppins ${className} ${sizes[size]} `} {...restProps}>
            {children}
        </Component>
    );
};

export { Heading };
