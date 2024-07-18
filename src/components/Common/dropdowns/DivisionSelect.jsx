import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

export default function DivisionSelect({ options = [], label, value,handleChange }) {
  return (
    <Select
      labelId="demo-simple-select-autowidth-label"
      id="demo-simple-select-autowidth"
      value={value}
      onChange={(e, v) => {
        typeof handleChange == "function" && handleChange(e.target.value);
      }}
      autoWidth
      variant="outlined"
      size={"small"}
      sx={{
        width: "100%",
        // background: "white",
        // color: "black",
        // borderRadius: "10px",
        fontSize: "14px !important",
      }}
      inputProps={{
        style: { color: "black" },
        "aria-label": "Without label",
      }}
    >
      {/* <MenuItem value={defaultValue?.id}>{defaultValue?.name}</MenuItem> */}
      {options?.map((item) => {
        return <MenuItem value={item["value"]}>{item["label"]}</MenuItem>;
      })}
    </Select>
  );
}
