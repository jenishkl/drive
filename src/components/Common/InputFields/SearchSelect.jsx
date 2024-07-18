import CheckIcon from "@mui/icons-material/Check";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { get } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
import { Comment, ThreeDots } from "react-loader-spinner";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ListboxComponent from "./ListComponent";
import { IoAddCircleOutline } from "react-icons/io5";

export default function SearchSelect({
  control,
  name,
  label,
  options,
  multiple = false,
  onChange,
  loading,
  keyLabel = "label",
  keyValue = "value",
  variant = "outlined",
  value = null,
  disableCloseOnSelect = false,
  readOnly,
  disableUnderline = true,
  disabled = false,
  mandatory = false,
  required = false,
  noOptionsText,
  AddlOptionText = "Add",
  handleAddMore,
  showAdditional = false,
  disabledArr = [],
  listboxComponent = true,
  placeholder,
  freeSolo,
}) {
  const AddMoreComponent = (props) => (
    <Button
      {...props}
      variant="text"
      style={{ width: "100%" }}
      onClick={handleAddMore}
    >
      {AddlOptionText}
    </Button>
  );

  const inputRef = React.useRef(null);
  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const handleAdd = (e, v, field) => {
    if (v) {
      if (multiple) {
        return field.onChange(
          v?.map((it) =>
            get(it, keyValue) ? it : { [keyLabel]: it, [keyValue]: it }
          )
        );
      } else {
        console.log("verrrrrrrrrrrrrrrr", v);
        options = [{ [keyLabel]: v, [keyValue]: v }, ...options];
        onChange(e, { [keyLabel]: v, [keyValue]: v });
        return field.onChange({ [keyLabel]: v, [keyValue]: v });
      }
    }
  };
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required,
        }}
        render={({ field, formState }) => {
          return (
            <Autocomplete
              // {...field}
              onFocus={scrollToInput}
              readOnly={readOnly}
              disabled={disabled}
              size="small"
              fullWidth
              sx={{
                paddingRight: 0,
              }}
              clearIcon={false}
              key={JSON.stringify(field.value + options)}
              freeSolo={freeSolo || variant != "outlined"}
              filterSelectedOptions
              ListboxComponent={listboxComponent && ListboxComponent}
              disableCloseOnSelect={disableCloseOnSelect}
              getOptionDisabled={(option) =>
                !!disabledArr.find((element) => element === option)
              }
              value={
                field.value != null
                  ? typeof field.value == "object"
                    ? typeof field.value?.[0] != "object" &&
                      field.value?.length > 0
                      ? options?.filter((it) =>
                          field.value?.includes(it[keyValue])
                        )
                      : field.value
                    : options?.find(
                        (option) => get(option, keyValue) == field.value
                      )
                  : undefined
              }
              // value={
              //   field.value != null
              //     ? typeof field.value == "object"
              //       ? field.value
              //       : options?.find(
              //           (option) => get(option, keyValue) == field.value
              //         )
              //     : undefined
              // }
              // defaultValue={[]}
              isOptionEqualToValue={(option, value) => {
                return get(option, keyValue) == get(value, keyValue)
                  ? true
                  : false;
              }}
              // filterSelectedOptions={
              //   options?.find((option) => option?.id == 1) || {}
              // }
              loading={loading}
              multiple={multiple}
              getOptionLabel={(option) =>
                option === "Add More..." ? "" : get(option, keyLabel)
              }
              onInputChange={(e, v, reason, detail) => {
                if (
                  freeSolo &&
                  !options.some((opt) => get(opt, keyLabel) === v)
                ) {
                  return handleAdd(e, v, field);
                }
              }}
              onChange={(e, v, reason, detail) => {
                console.log("v", v);

                if (value === "Add More...") {
                  e.preventDefault();
                }
                if (
                  freeSolo &&
                  !options.some((opt) => get(opt, keyValue) === v[keyValue])
                ) {
                  return handleAdd(e, v, field);
                }
                if (typeof onChange == "function") {
                  return onChange(e, v, reason, detail);
                }

                if (typeof v == "string") {
                  field.onChange({ [keyLabel]: v, [keyValue]: v });
                } else field.onChange(v);
              }}
              // disableClearable
              // clearIcon={<>dd</>}
              id="free-solo-2-demo"
              options={
                (showAdditional ? ["Add More...", ...options] : options) ?? []
              }
              noOptionsText={noOptionsText}
              renderOption={(props, option, value) => {
                if (option === "Add More...") {
                  // Render the custom Add More component
                  return <AddMoreComponent {...props} />;
                }
                return (
                  <Box {...props}>
                    {console.log(
                      "get(formState?.errors, name)",
                      formState?.name
                    )}
                    <Box width={"100%"}>
                      <Box
                        width={"100%"}
                        gap={4}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="light" size="small">
                          {get(option, keyLabel)}
                        </Typography>
                        <Box>
                          {value?.selected && (
                            <IconButton>
                              <CheckIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  ref={field.ref()}
                  inputRef={(e) => {
                    // Connect the ref provided by Controller to your custom ref
                    field.ref(e);
                    inputRef.current = e;
                  }}
                  placeholder={placeholder}
                  label={label}
                  variant={variant}
                  error={get(formState?.errors, name)}
                  helperText={
                    <>
                      {get(formState?.errors, name)?.message && (
                        <Stack direction={"row"} alignItems={"center"}>
                          <ErrorOutlineOutlinedIcon
                            style={{ fontSize: "13px", marginRight: "4px" }}
                          />
                          {get(formState?.errors, name)?.message}
                        </Stack>
                      )}
                    </>
                  }
                  sx={{ caretColor: "black", paddingRight: "0 !important" }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    disableUnderline: disableUnderline,
                    endAdornment: (
                      <React.Fragment>
                        {loading && options?.length == 0 && (
                          <ThreeDots
                            visible={true}
                            height="20"
                            width="20"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            color={"#9E9E9E"}
                          />
                        )}
                        {/* {freeSolo && (
                          <IconButton
                            sx={(th) => {
                              return {
                                color: th.palette.primary.main,
                                padding: 0,
                              };
                            }}
                           
                          >
                            <IoAddCircleOutline size={17} strokeWidth={1} />
                          </IconButton>
                        )} */}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          );
        }}
      />
    </>
  );
}
