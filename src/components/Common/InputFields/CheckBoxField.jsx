import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { get } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";

export default function CheckBoxField({
  label,
  control,
  name,
  readOnly,
  value,
  onChange,
  required = true,
  defaultValue,
}) {
  return (
    <Box sx={{ pointerEvents: readOnly && "none" }}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, formState }) => (
          <>
            <FormGroup>
              <FormControlLabel
                slotProps={{
                  typography: {
                    fontSize: "12px!important",
                  },
                }}
                control={
                  <Checkbox
                    required={required || get(formState?.errors, name)?.message}
                    readOnly={readOnly}
                    {...field}
                    checked={value ?? field.value == 1 ? true : false}
                    onChange={(e) => {
                      typeof onChange == "function" && onChange(e);
                      field.onChange(e.target.checked ? 1 : 0);
                    }}
                  />
                }
                label={label}
              />
            </FormGroup>
          </>
        )}
      />
    </Box>
  );
}
