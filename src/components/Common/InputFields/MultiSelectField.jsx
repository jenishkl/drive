import { useTheme } from "@mui/material";
import { get } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function MultiSelectField({
  control,
  name,
  label,
  options,
  isSearchable = true,
  multiple = false,
  onChange,
  placeholder,
  loading,
  keyLabel = "label",
  keyValue = "value",
  variant = "outlined",
  value = null,
  disableCloseOnSelect = false,
  readOnly,
  disableUnderline = true,
  disabled = false,
  mandatory = false,
  required = false,
  noOptionsText,
  AddlOptionText = "Add",
  handleAddMore,
  showAdditional = false,
  disabledArr = [],
  noOptionsMessage = () => {},
}) {
  const inputRef = React.useRef(null);
  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
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
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required,
        }}
        render={({ field, formState }) => {
          return (
            <Select
              getOptionLabel={(v) => v[keyLabel]}
              getOptionValue={(v) => v[keyValue]}
              value={
                field.value != null
                  ? typeof field.value == "object"
                    ? typeof field.value?.[0] != "object" &&
                      field.value?.length > 0
                      ? options?.filter((it) =>
                          field.value?.includes(it[keyValue])
                        )
                      : field.value
                    : options?.find(
                        (option) => get(option, keyValue) == field.value
                      )
                  : undefined
              }
              components={animatedComponents}
              onFocus={scrollToInput}
              onChange={(v) => {
                if (typeof onChange == "function") {
                  return onChange(v);
                } else field.onChange(v);
              }}
              options={options ?? []}
              isSearchable={isSearchable}
              placeholder={placeholder}
              isLoading={loading}
              multiple={multiple}
              blurInputOnSelect={true}
              isDisabled={disabled}
              styles={customStyles}
              noOptionsMessage={noOptionsMessage}
              required={required}
            />
          );
        }}
      />
    </>
  );
}
