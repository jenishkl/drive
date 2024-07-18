import React from "react";
import "./Input.css";
import { Box, TextField, Typography } from "@mui/material";
import { register } from "react-scroll/modules/mixins/scroller";
import { get } from "lodash";

function Input(props) {
  return (
    <>
      <Box
        className={
          props.error
            ? "did-floating-label-content-error"
            : "did-floating-label-content"
        }
      >
        <Typography
          {...(typeof register == "function" && props?.register(props?.name))}
          component={"input"}
          className={
            props.error ||
            get(props?.errors, props?.name)?.message ||
            props.error
              ? "did-floating-input-error"
              : "did-floating-input"
          }
          name={props.name}
          type={props.type}
          onChange={(e) => {
            typeof props.onChange == "function" && props.onChange(e);
            typeof props.setValue == "function" &&
              props.setValue(props.name, e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
          }}
          // placeholder={props.placeholder}
          placeholder={''}
          value={props.value}
          disabled={props.disable}
          minLength={props.minLength}
          maxLength={props.maxLength}
          autoComplete={props.autoComplete && "off"}
          defaultValue={props.defaultValue}
          readOnly={props.readOnly}
        />
        <Typography
          component={"label"}
          className={
            props.error ? "did-floating-label-error" : "did-floating-label"
          }
        >
          {props.label} {props.mandatory ? <span>*</span> : null}{" "}
        </Typography>
        {(get(props?.errors, props?.name)?.message || props.error) && (
          <Box className={"did-floating-input-error-below"}>
            <i className="fa fa-info-circle"></i>{" "}
            {props.error ?? get(props?.errors, props?.name)?.message}
          </Box>
        )}
      </Box>
    </>
  );
}

export default Input;
