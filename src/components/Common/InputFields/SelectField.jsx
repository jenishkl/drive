import {
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { get } from "lodash";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useController } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SelectField({
  options = [],
  name,
  defaultValue,
  handleChange,
  register,
  watch,
  control,
  label,
  size,
  width = "100%",
  keyLabel = "label",
  keyValue = "value",
  loading,
  readOnly,
  variant = "outlined",
  required,
}) {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "40vh",
      },
    },
  };
  // const [value, setValue] = useState();
  // let getValue = () => {};
  // useEffect(() => {
  //   if (field.value) {
  //     if (typeof field.value == "object") {
  //       setValue(field.value);
  //     } else {
  //       let v = options.filter((it) => it[keyValue] == field.value)[0];
  //       setValue(v);
  //     }
  //   }
  // }, [field.value]);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: required,
      }}
      render={({ field, fieldState, formState }) => (
        <FormControl sx={{ width: width }} size="small" key={field.value}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            IconComponent={
              variant == "standard"
                ? null
                : () => <IoMdArrowDropdown className="mr-2" size={20} />
            }
            readOnly={readOnly}
            // value={'Select'}
            ref={field.ref}
            // {...fields.field}
            defaultValue={defaultValue}
            // onChange={handleChange}
            value={field.value}
            name={name}
            MenuProps={MenuProps}
            onChange={(e) => {
              field.onChange(e);
              typeof handleChange == "function" && handleChange(e);
            }}
            // displayEmpty
            labelId="demo-simple-select-helper-label"
            error={formState.errors[name]?.message}
            id="demo-simple-select-helper"
            label={label}
            variant={variant}
            size={"small"}
            sx={{
              width: "100%",
              // background: "white",
              // color: "black",
              // borderRadius: "10px",
              fontSize: "14px !important",
            }}
            disableUnderline={true}
            // InputProps={{
            //   disableUnderline: true,
            //   readOnly: readOnly,
            // }}
            inputProps={{
              style: { color: "black" },
              "aria-label": "Without label",
            }}
          >
            <MenuItem value={label} disabled>
              {label}
            </MenuItem>
            {/* <MenuItem value={defaultValue?.id}>{defaultValue?.name}</MenuItem> */}
            {options?.map((item, i) => {
              return (
                <MenuItem key={i} value={item[keyValue]}>
                  {item[keyLabel]}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error={get(formState?.errors, name)?.message}>
            {get(formState?.errors, name)?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
