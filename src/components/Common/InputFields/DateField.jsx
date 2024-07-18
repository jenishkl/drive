import { Box, FormLabel, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { get } from "lodash";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function DateField({
  name,
  control,
  label,
  readOnly,
  minDate = false,
  dateOnly = false,
  variant = "outlined",
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: false,
        }}
        render={({ field, formState }) => (
          <Box className="d-flex flex-column" key={field.value}>
            {/* <Typography variant="light" size="small">
              {label}
            </Typography> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {!dateOnly ? (
                <DateTimePicker
                  minDate={minDate ? dayjs() : undefined}
                  slotProps={{
                    textField: {
                      size: "small",

                      error: get(formState?.errors, name)?.message,
                      helperText: get(formState?.errors, name)?.message && (
                        <Stack direction={"row"} alignItems={"center"}>
                          <ErrorOutlineOutlinedIcon
                            style={{ fontSize: "13px", marginRight: "4px" }}
                          />
                          <Typography
                            color={"error"}
                            variant="light"
                            size="small"
                          >
                            {get(formState?.errors, name)?.message}
                          </Typography>
                        </Stack>
                      ),
                      variant: variant,

                      inputProps: {
                        sx: { padding: " 6.5px 14px ", outline: "none" },
                      },
                      InputProps: {
                        size: "small",
                        disableUnderline: true,
                        // sx: { padding: " 6.5px 14px " },
                      },
                    },
                  }}
                  label={label}
                  format="DD/MM/YYYY hh:mm A"
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(e) => {
                    field.onChange(dayjs(e).format("YYYY-MM-DD HH:mm:ss"));
                    //   setValue("date", dayjs(e).format("DD/MM/YYYY"), {
                    //     shouldValidate: "true",
                    //   });
                  }}
                  // defaultValue={dayjs().format("MM/DD/YYYY")}
                />
              ) : (
                <DatePicker
                  minDate={minDate ? dayjs() : undefined}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: get(formState?.errors, name)?.message,
                      helperText: get(formState?.errors, name)?.message && (
                        <Stack direction={"row"} alignItems={"center"}>
                          <ErrorOutlineOutlinedIcon
                            style={{ fontSize: "13px", marginRight: "4px" }}
                          />
                          <Typography
                            color={"error"}
                            variant="light"
                            size="small"
                          >
                            {get(formState?.errors, name)?.message}
                          </Typography>
                        </Stack>
                      ),
                      variant: variant,
                      inputProps: {
                        sx: { padding: " 6.5px 14px ", outline: "none" },
                      },
                      InputProps: {
                        size: "small",
                        disableUnderline: true,
                        // sx: { padding: " 6.5px 14px " },
                      },
                    },
                  }}
                  label={label}
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(e, v) => {
                    field.onChange(dayjs(e).format("YYYY-MM-DD"));
                  }}
                />
              )}
            </LocalizationProvider>
          </Box>
        )}
      />
    </>
  );
}
