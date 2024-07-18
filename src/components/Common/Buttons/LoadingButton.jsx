import { Button, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingButton({
  loading,
  disabled = false,
  variant = "save",
  onClick,
  size = "small",
  label = "Save",
  type = "button",
  sx = {},
  endIcon,
  startIcon,
}) {
  return (
    <>
      <Button
        disabled={loading || disabled}
        variant={variant}
        size={size}
        onClick={onClick}
        type={type}
        endIcon={!loading && endIcon}
        startIcon={!loading && startIcon}
        sx={{ color: disabled && "grey !important", ...sx }}
      >
        {loading ? (
          <CircularProgress
            color="warning"
            size={"20px !important"}
            sx={{
              fontSize: "20px !important",
              width: "20px !important",
              height: "20px !important",
            }}
          />
        ) : (
          label
        )}
      </Button>
    </>
  );
}
