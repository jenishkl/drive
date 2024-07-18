import { TextField } from "@mui/material";
import React from "react";
import { NumberFormatBase, PatternFormat } from "react-number-format";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const format = (val) => {
    if (val === "") return "";
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && month[0] > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = "12";
      }
    }

    return `${month}/${year}`;
  };

  return (
    <PatternFormat
      {...props}
      format={"####"}
      mask={" "}
      //   onChange={(e) => console.log("e", e)}
    />
  );
});
export default function CardCvcField({ onChange, value }) {
  return (
    <TextField
    fullWidth
      label="Card CVC"
      value={value}
      onChange={(e) => onChange(e.target.value?.replaceAll(" ", ""))}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
    />
  );
}
