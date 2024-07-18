"use client";
import CheckIcon from "@mui/icons-material/Check";
import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { get } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
import { Comment, ThreeDots } from "react-loader-spinner";
import { Cascader } from "rsuite";
import FolderIcon from "@mui/icons-material/Folder";
import TTTypography from "../ToolTipComponents/TTTypography";
// import "~rsuite/dist/rsuite-no-reset.min.css";
import { FormHelperText } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function CasCaderField({
  control,
  name,
  label,
  options,
  mandatory = false,
}) {
  const Label = () =>
    mandatory ? (
      <p>
        {label} <span style={{ color: "red" }}> * </span>
      </p>
    ) : (
      <p>{label}</p>
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
            <>
              <Cascader
                data={options ?? []}
                onChange={(v, e) => field.onChange(v)}
                // onSelect={(e) => {
                //   console.log("select", e);
                //   // setValue2(e.value);
                // }}

                value={field.value}
                appearance="default"
                parentSelectable={true}
                placeholder="Select"
                style={{ width: "100%" }}
                menuAutoWidth
                renderMenuItem={(label, item) => {
                  return (
                    <Typography
                      variant="bold"
                      size="small"
                      className="doubleLine"
                      sx={{ display: "flex" }}
                    >
                      {item.children && <FolderIcon color="primary" />}
                      {label}
                    </Typography>
                  );
                }}
                renderMenu={(children, menu, parentNode) => {
                  if (parentNode && parentNode.loading) {
                    return (
                      <p
                        style={{
                          padding: 4,
                          color: "#999",
                          textAlign: "center",
                        }}
                      >
                        Loading...
                      </p>
                    );
                  }
                  return menu;
                }}
              />
              <FormHelperText error={true} sx={{ ml: 2 }}>
                {get(formState?.errors, name)?.message && (
                  <Stack direction={"row"} alignItems={"center"}>
                    <ErrorOutlineOutlinedIcon
                      style={{ fontSize: "13px", marginRight: "4px" }}
                    />
                    <Typography color={"error"} variant="light" size="small">
                      {get(formState?.errors, name)?.message}
                    </Typography>
                  </Stack>
                )}
              </FormHelperText>
            </>
          );
        }}
      />
    </>
  );
}
