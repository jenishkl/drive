import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomizedSelect({
  width = 200,
  onChange,
  options = [],
  label,
  value,
  multiple,
  placeholder,
  variant = "outlined",
}) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: width,
      },
    },
  };

  const theme = useTheme();

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: width,

          "& .MuiInputBase-input": {
            borderRadius: 4,
            position: "relative",
            padding: "10px 26px 10px 12px",
          },
        }}
      >
        {label && (
          <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        )}
        <Select
          labelId="demo-multiple-name-label"
          label={label}
          id="demo-multiple-name"
          multiple={multiple}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          MenuProps={MenuProps}
          variant={variant}
        >
          {options.map((option) => (
            <MenuItem key={option?.value} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
