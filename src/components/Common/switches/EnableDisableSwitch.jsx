import { FormControl, FormHelperText, Switch } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function EnableDisableSwitch({
  name,
  watch,
  control,
  defaultValue,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
        value: watch(name) == true ? 1 : 0,
      }}
      render={(fields) => (
        <FormControl>
          <Switch
            ref={fields.field.ref}
            {...fields.field}
            defaultValue={defaultValue}
            checked={watch(name) ?? defaultValue}
            onChange={(e, v) => fields.field.onChange(v ? 1 : 0)}
            name={name}
            error={fields.formState.errors[name]?.message}
          />
          <FormHelperText error={fields?.formState?.errors[name]?.message}>
            {fields?.formState?.errors[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
