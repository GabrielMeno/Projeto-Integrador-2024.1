import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '2px solid #4B0082', // cor da borda indigo
    borderRadius: '16px', // arredondamento
    padding: '2px', // padding
    minHeight: '40px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#4B0082',
    backgroundColor: state.isSelected ? '#4B0082' : 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#4B0082',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#4B0082',
  }),
};

const SelectBox = ({ className, name, options, value, onChange }) => {
  console.log('SelectBox props:', { className, name, options, value, onChange });

  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name,
        value: selectedOption ? selectedOption.value : '',
      }
    });
  };

  const selectedValue = options.find(option => option.value === value) || null;

  return (
    <Select
      className={className}
      styles={customStyles}
      name={name}
      value={selectedValue}
      onChange={handleChange}
      options={options}
      placeholder="Selecione..."
      isClearable
    />
  );
};

SelectBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export { SelectBox };
