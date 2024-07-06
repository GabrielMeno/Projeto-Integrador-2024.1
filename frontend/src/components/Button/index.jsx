import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[16px]",
};

const variants = {
  fill: {
    red_A700: "bg-red-a700 text-white-a700",
    indigo_700_01: "bg-indigo-700_01 text-white-a700",
  },
};

const sizes = {
  xs: "h-[64px] px-[34px] text-base",
  sm: "h-[74px] px-[34px] text-base",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "round",
  variant = "fill",
  size = "sm",
  color = "indigo_700_01",
  ...restProps
}) => {
  return (
    <button
      className={`flex flex-row items-center justify-center text-center cursor-pointer text-white-a700 text-base ${shape && shapes[shape] || ""} ${size && sizes[size] || ""} ${variant && variants[variant]?.[color] || ""} ${className}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["red_A700", "indigo_700_01"]),
};

export { Button };
