"use client";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
// import { get } from "../../../helpers/utils";
import { get } from "lodash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function StringField({
  name,
  control,
  label,
  multiline = false,
  minRows = 1,
  type = "text",
  readOnly,
  onChange,
  variant = "outlined",
  value,
  setValue,
  required,
  mandatory = false,
  placeholder = label,
  currency = false,
  isDirty = false,
  endAdornment = null,
  sx = {},
  onBlur = () => {},
}) {
  const [view, setView] = useState(false);
  useEffect(() => {
    if (typeof setValue == "function" && value) {
      setValue(name, value, { shouldValidate: true });
    }
  }, [value]);

  const inputRef = React.useRef(null);
  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required || mandatory,
          pattern: type == "email" && {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        }}
        render={({ field, formState }) => (
          <TextField
            {...field}
            ref={field.ref()}
            autocomplete="new-password"
            inputRef={(e) => {
              // Connect the ref provided by Controller to your custom ref
              field.ref(e);
              inputRef.current = e;
            }}
            onFocus={scrollToInput}
            type={!view && type}
            required={required}
            defaultValue={field.value}
            // disabled={readOnly}
            fullWidth
            label={label}
            name={name}
            error={get(formState?.errors, name)?.message}
            // error={formState.errors[name]?.message}
            helperText={
              <>
                {get(formState?.errors, name)?.message && (
                  <Stack direction={"row"} alignItems={"center"}>
                    <ErrorOutlineOutlinedIcon
                      style={{ fontSize: "13px", marginRight: "4px" }}
                    />
                    <Typography color={"error"} variant="light" size="small">
                      {get(formState?.errors, name)?.message}
                    </Typography>
                  </Stack>
                )}
              </>
            }
            variant={variant}
            size="small"
            onChange={(e) => {
              field.onChange(e);
              if (typeof onChange == "function") {
                onChange(e);
              }
            }}
            onBlur={onBlur}
            multiline={multiline}
            minRows={minRows}
            sx={{
              ...sx,
              width: "100%",
              fontWeight: "600",
              color: "#000",
              "& .MuiFormLabel-root": {
                color: "#707070;", // or black
                fontSize: "12px",
                fontWeight: "500",
              },
              //   border: 0,
              //   "& .MuiOutlinedInput-root": {
              //     "&.Mui-focused fieldset": {
              //       border: 0,
              //     },
              //   },
            }}
            InputProps={{
              disableUnderline: true,
              readOnly: readOnly,
              autocomplete: "new-password",
              startAdornment: (
                <>
                  {currency && (
                    <Box
                      className="d-flex flex-row"
                      sx={{ padding: "0px 3px 4px" }}
                    >
                      $
                    </Box>
                  )}
                </>
              ),
              endAdornment: (
                <>
                  {type == "password" && (
                    <>
                      <IconButton onClick={() => setView(!view)}>
                        {view ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </>
                  )}
                  {endAdornment}
                </>
              ),
            }}
            inputProps={{
              style: {
                // padding: "14px",
              },
            }}
            placeholder={!readOnly && placeholder}
          />
        )}
      />
    </>
  );
}
