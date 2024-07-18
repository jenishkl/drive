import CheckIcon from "@mui/icons-material/Check";
import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { get } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
import { Comment, ThreeDots } from "react-loader-spinner";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function SearchSelectWithAdd({
  control,
  name,
  label,
  options,
  multiple = false,
  onChange,
  loading,
  keyLabel = "label",
  keyValue = "value",
  variant = "outlined",
  value,
  disableCloseOnSelect = false,
  readOnly,
  disableUnderline = true,
  disabled = false,
  mandatory = false,
  required = false,
  noOptionsText,
}) {
  const Label = () =>
    mandatory || required ? (
      <p>
        {label} <span style={{ color: "red" }}> * </span>
      </p>
    ) : (
      <p>{label}</p>
    );
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
            <Autocomplete
              size="small"
              value={
                field.value != null
                  ? typeof field.value == "object"
                    ? field.value
                    : options?.find(
                        (option) => get(option, keyValue) == field.value
                      )
                  : undefined
              }
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  field.onChange({
                    [keyLabel]: newValue,
                    [keyValue]: newValue,
                  });
                  typeof onChange == "function" &&
                    onChange(event, {
                      [keyLabel]: newValue,
                      [keyValue]: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  field.onChange({
                    [keyLabel]: newValue.inputValue,
                    [keyValue]: newValue.inputValue,
                  });
                  typeof onChange == "function" &&
                    onChange(event, {
                      [keyLabel]: newValue.inputValue,
                      [keyValue]: newValue.inputValue,
                    });
                } else {
                  field.onChange(newValue);
                  typeof onChange == "function" &&
                    onChange(event, {
                      [keyLabel]: newValue[keyValue],
                      [keyValue]: newValue[keyLabel],
                    });
                }
              }}
              isOptionEqualToValue={(option, value) => {
                return get(option, keyValue) == get(value, keyValue)
                  ? true
                  : false;
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option[keyLabel]
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    [keyLabel]: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              //   selectOnFocus
              //   clearOnBlur
              //   handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={options}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option[keyLabel];
              }}
              renderOption={(props, option, value) => {
                return (
                  <Box {...props}>
                    <Box width={"100%"}>
                      <Box
                        width={"100%"}
                        gap={4}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="light" size="small">
                          {get(option, keyLabel)}
                        </Typography>
                        <Box>
                          {value?.selected && <CheckIcon fontSize="small" />}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              }}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Free solo with text demo" />
              )}
            />
          );
        }}
      />
    </>
  );
}
