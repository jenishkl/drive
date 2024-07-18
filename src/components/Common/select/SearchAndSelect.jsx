import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useState } from "react";

export default function SearchAndSelect({ options, onChange, value = [] }) {
  return (
    <>
      <Autocomplete
        freeSolo={false}
        multiple
        size="small"
        fullWidth
        id="free-solo-2-demo"
        disableClearable
        options={options}
        value={value}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => option.tag())
        }
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            // label="Search input"
            placeholder="Change"
            InputProps={{
              ...params.InputProps,
              type: "search",
              disableUnderline: true,
            }}
            SelectProps={{ IconComponent: () => null }}
          />
        )}
        renderOption={(props, option, state, ownerState) => (
          <li {...props}>{option.tag()}</li>
        )}
      />
    </>
  );
}
