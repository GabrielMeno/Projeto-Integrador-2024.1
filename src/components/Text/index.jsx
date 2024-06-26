import React from "react";

const sizes = {
  textxl: "text-3xl font-normal not-italic md:text-[28px] sm:text-[26px]",
};

const Text = ({ children, className = "", as, size = "textxl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-white-a700 font-paytoneone ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
