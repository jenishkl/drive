import React from 'react';
import './InputTextArea.css'
import { Box, Typography } from "@mui/material";

function InputTextArea(props) {
  return (
    <>
      <Box className="floating-label-content-textarea">
        <Typography
          component={"textarea"}
          className="floating-input-textarea floating-textarea"
          placeholder={props.placeholder || " "}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          rows={props.rows}
          cols={props.cols}
          style={{ fontFamily: "Montserrat !important" }}
        />
        <Typography component={"label"} className="floating-label-textarea">
          {props.label}
        </Typography>
      </Box>
    </>
  );
}

export default InputTextArea;