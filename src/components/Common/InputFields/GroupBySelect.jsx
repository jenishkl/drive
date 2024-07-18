import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import { Controller } from "react-hook-form";
import { get } from "lodash";

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

export default function GruopBySelect({
  options,
  groupByName,
  keyLabel,
  keyValue = "value",
  setValue,
  name,
  onChange,
  control,
  label,
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: false,
        }}
        render={({ field, formState }) => {
          console.log('field?.value', field?.value)
          return (
            <Autocomplete
              id="grouped-demo"
              options={options}
              key={JSON.stringify(field.value + options)}
              size="small"
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
              groupBy={(option) => option[groupByName]}
              getOptionLabel={(option) => option[keyLabel]}
              sx={{ width: 300 }}
              onChange={(e, v, reason, detail) => {
                if (typeof onChange == "function") {
                  onChange(e, v, reason, detail);
                } else field.onChange(v);
              }}
              renderInput={(params) => <TextField {...params} label={label} />}
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
