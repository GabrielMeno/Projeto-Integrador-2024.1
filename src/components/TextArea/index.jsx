import React from "react";
import PropTypes from "prop-types";

const shapes = {
    round: "rounded-[16px]",
};

const variants = {
    tarOutlineIndigo700: "!border-indigo-700 border-2 border-solid",
};

const sizes = {
    xs: "h-[92px] p-5",
};

const TextArea = React.forwardRef(
    (
        {
            className = "",
            name = "",
            placeholder = "",
            shape,
            size = "xs",
            variant = "tarOutlineIndigo700", onChange,
            ...restProps
        },
        ref,
    ) => {
        const handleChange = (e) => {
            if (onChange) onChange(e?.target?.value);
        };

        return (
            <textarea
                ref={ref}
                className={`${className} ${(shape && shapes[shape]) || ""} ${sizes[size] || ""} ${variants[variant] || ""}`}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                {...restProps}
            />
        );
    },
);

TextArea.propTypes = {
    className: PropTypes.string, name: PropTypes.string,
    placeholder: PropTypes.string,
    shape: PropTypes.oneOf(["round"]),
    size: PropTypes.oneOf(["xs"]),
    variant: PropTypes.oneOf(["tarOutlineIndigo700"]),
};
export { TextArea };