import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[16px]",
};

const variants = {
  outline: {
    indigo_700: "border-indigo-700 border-2 border-solid text-indigo-700",
  },
};

const sizes = {
  xs: "h-[40px] pl-1.5 pr-3 text-base",
  sm: "h-[40px] pl-3.5 pr-[34px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "outline",
      size = "sm",
      color = "indigo_700",
      ...restProps
    },
    ref
  ) => {
    return (
      <label
        className={`flex items-center justify-center cursor-text ${className} ${shapes[shape] || ""} ${
          variants[variant]?.[color] || ""
        } ${sizes[size] || ""}`}
      >
        {label && <span>{label}</span>}
        {prefix && <span>{prefix}</span>}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none"
          {...restProps}
        />
        {suffix && <span>{suffix}</span>}
      </label>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["outline"]),
  color: PropTypes.oneOf(["indigo_700"]),
};

export { Input };
