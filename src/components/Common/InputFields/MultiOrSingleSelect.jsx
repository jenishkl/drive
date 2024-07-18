import { useTheme } from "@emotion/react";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function MulltiOrSingleSelect({
  value = {},
  onChange,
  options = [],
  isSearchable = true,
  isLoading,
  isMulti,
  isDisabled,
  mandatory,
  placeholder = "Select...",
  keyLabel = "label",
  keyValue = "value",
  noOptionsMessage = () => {},
}) {
  const theme = useTheme();
  const customStyles = {
    // Custom styles for the control (the main input)

    control: (provided, state) => ({
      ...provided,
      border: `1px solid ${mandatory ? "red" : theme?.palette.input.border}`,
      borderRadius: "4px",
      color: mandatory ? "red" : theme?.palette.secondary.textColor,
      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
      backgroundColor: theme?.palette.input.background,
      padding: "3px 0px",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),

    // Custom styles for the option (each dropdown option)
    option: (provided, state) => ({
      ...provided,
      fontSize: "13px",
      fontWeight: "500",
      color: theme?.palette.secondary.textColor,
      backgroundColor: theme?.palette.input.background,
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: theme?.palette.smsBox.input,
      },
    }),

    // Custom styles for the menu (the dropdown)
    menu: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "0px",
      backgroundColor: theme?.palette.input.background,
    }),

    // Custom styles for the single value (displayed when an option is selected)
    singleValue: (provided) => ({
      ...provided,

      color: theme?.palette.secondary.textColor,
      fontSize: "13px",
      fontWeight: "500",
      fontFamily: "Montserrat",
    }),
    // placeholder style
    placeholder: (provided) => ({
      ...provided,
      color: mandatory ? "red" : theme?.palette.secondary.textColor,
      fontSize: "13px",
      fontWeight: "500",
      fontFamily: "Montserrat",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      padding: "0px",
    }),
  };
  const animatedComponents = makeAnimated();
  return (
    <div>
      <Select
        getOptionLabel={(opt) => opt[keyLabel]}
        getOptionValue={(opt) => opt[keyValue]}
        value={
          typeof value == "object"
            ? value
            : Array.isArray(value)
            ? value
            : options?.find((item) => item[keyValue] == value)
        }
        onChange={onChange}
        options={options}
        isSearchable={isSearchable}
        
        placeholder={placeholder}
        isLoading={isLoading}
        isMulti={isMulti}
        hideSelectedOptions={true}
        blurInputOnSelect={true}
        isDisabled={isDisabled}
        styles={customStyles}
        noOptionsMessage={noOptionsMessage}
        required={mandatory}
        components={animatedComponents}
      />
    </div>
  );
}
