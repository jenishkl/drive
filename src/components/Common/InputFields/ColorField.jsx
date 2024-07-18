"use client";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Overlay } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { Controller } from "react-hook-form";

export default function ColorField({
  name,
  control,
  value,
  label,
  multiline = false,
  minRows = 1,
  type = "text",
}) {
  const [showColorContainer, setShowColorContainer] = useState(false);
  const target = useRef(null);
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        rules={{
          required: false,
        }}
        render={({ field, formState }) => (
          <Box className="row-align-center gap-2">
            <p
              ref={target}
              onClick={() => setShowColorContainer(!showColorContainer)}
              className="pointer-hand px-3 color-container"
              style={{ background: field.value ?? "gray" }}
            ></p>
            <Overlay
              target={target.current}
              show={showColorContainer}
              placement="right"
            >
              {({
                placement: right,
                arrowProps: _arrowProps,
                show: showColorContainer,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
              }) => (
                <div
                  className="overlay-color-container"
                  onMouseLeave={() => setShowColorContainer(false)}
                >
                  <SketchPicker
                    color={value ?? field.value}
                    onChangeComplete={(color) => field.onChange(color.hex)}
                  />
                </div>
              )}
            </Overlay>

            <Typography mb={2}>{label}</Typography>
          </Box>
        )}
      />
    </Box>
  );
}
