import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Controller } from "react-hook-form";
import { countryOptions } from "../../../helpers/addEmployeeOptions";
import CheckIcon from "@mui/icons-material/Check";

export default function CountryField({
  control,
  name,
  label,
  multiple = false,
  onChange,
  loading,
  keyLabel = "label",
  keyValue = "value",
  variant = "outlined",
  value,
  disableCloseOnSelect = false,
  readOnly,
}) {
  const options = countryOptions;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => (
        <Autocomplete
          // {...field}

          readOnly={readOnly}
          size="small"
          fullWidth
          clearIcon={false}
          key={field.value}
          freeSolo
          disableCloseOnSelect={disableCloseOnSelect}
          // value={field?.value ?? []}
          value={
            field.value != null
              ? typeof field.value == "object"
                ? field.value
                : options?.find((option) => option[keyValue] == field.value) ||
                  {}
              : undefined
          }
          // defaultValue={[]}
          isOptionEqualToValue={(option, value) => {
            return option[keyValue] == value[keyValue] ? true : false;
          }}
          // filterSelectedOptions={
          //   options?.find((option) => option?.id == 1) || {}
          // }
          loading={loading}
          multiple={multiple}
          getOptionLabel={(row) => row?.[keyLabel]}
          onChange={(e, v, reason, detail) => {
            if (typeof onChange == "function") {
              onChange(e, v, reason, detail);
            }
            field.onChange(v?.value);
          }}
          // disableClearable
          // clearIcon={<>dd</>}
          id="free-solo-2-demo"
          options={countryOptions}
          noOptionsText="sss"
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
                      {option?.[keyLabel]}
                    </Typography>
                    <Box>
                      {value?.selected && <CheckIcon fontSize="small" />}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant={variant}
              error={formState?.errors[name]?.message}
              helperText={formState?.errors[name]?.message}
              sx={{ caretColor: "black" }}
              InputProps={{
                ...params.InputProps,
                type: "search",
                disableUnderline: true,
              }}
            />
          )}
        />
      )}
    />
  );
}
