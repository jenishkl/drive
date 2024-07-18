import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import { Controller } from "react-hook-form";
import { statesOptions } from "../../../helpers/options";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export default function StateField({
  groupByName = "country",
  keyLabel = "name",
  keyValue = "name",
  setValue,
  name,
  onChange,
  control,
  label,
  watch,
  variant = "outlined",
  countryKeyName = "country",
  readOnly,
}) {
  const options = statesOptions.filter(
    (c) => c.country == watch(countryKeyName)
  );

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: false,
        }}
        render={({ field, formState }) => {
          return (
            <Autocomplete
              readOnly={readOnly}
              id="grouped-demo"
              options={options}
              size="small"
              value={
                field.value != null
                  ? typeof field.value == "object"
                    ? field.value
                    : options?.find(
                        (option) => option[keyValue] == field.value
                      ) || {}
                  : undefined
              }
              groupBy={(option) => option[groupByName]}
              getOptionLabel={(option) => option[keyLabel]}
              onChange={(e, v, reason, detail) => {
                if (typeof onChange == "function") {
                  onChange(e, v, reason, detail);
                } else field.onChange(v.name);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant={variant}
                  // InputProps={{ disableUnderline: true }}
                />
              )}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
            />
          );
        }}
      />
    </>
  );
}
