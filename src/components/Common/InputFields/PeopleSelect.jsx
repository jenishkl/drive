import CheckIcon from "@mui/icons-material/Check";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
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
import { imageurl, randomColor } from "../../../helpers/utils";

export default function PeopleSelect({
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
  keyImage = "profile_img",
  keyEmail = "email",
  AddlOptionText = "Add",
  handleAddMore,
  showAdditional = false,
  disabledArr = [],
  listcomponent = false,
  asyncfunction,
  freesolo,
  endAdornment,
}) {
  const [search, setSearch] = React.useState();
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedOnChange = React.useCallback(
    debounce((newValue, index, i, type) => {
      setSearch(newValue);
    }, 300),
    []
  );
  React.useEffect(() => {
    if (search) {
      typeof asyncfunction == "function" && asyncfunction(search);
    }
  }, [search]);
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
              componentsProps={{
                paper: {
                  sx: {
                    border: "none !important",
                    borderRadius: "5px",
                    margin: "auto",
                    boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
                    mt: 1,
                  },
                },
              }}
              onFocus={scrollToInput}
              readOnly={readOnly}
              disabled={disabled}
              size="small"
              fullWidth
              clearIcon={false}
              key={JSON.stringify(field.value)}
              freeSolo={freesolo ?? variant == "outlined"}
              filterSelectedOptions={false}
              filterOptions={(op) => op}
              ListboxComponent={listcomponent && ListboxComponent}
              // disableCloseOnSelect={disableCloseOnSelect}
              // getOptionDisabled={(option) =>
              //   !!disabledArr.find((element) => element === option)
              // }
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
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    avatar={
                      <Avatar
                        sx={{
                          width: "30px",
                          height: "30px",
                          fontSize: "10px",
                          background: randomColor(option[keyLabel]),
                        }}
                        src={imageurl(option[keyImage])}
                      >
                        {option[keyLabel] && option[keyLabel]?.slice(0, 2)}
                      </Avatar>
                    }
                    label={option[keyLabel]}
                    {...getTagProps({ index })}
                  />
                ))
              }
              loading={loading}
              multiple={multiple}
              getOptionLabel={(option) =>
                option === "Add More..." ? "" : get(option, keyLabel)
              }
              onChange={(e, v, reason, detail) => {
                console.log("v", v);
                if (freesolo) {
                  return field.onChange(
                    v?.map((it) =>
                      it[keyValue] ? it : { [keyLabel]: it, [keyValue]: it }
                    )
                  );
                }
                if (value === "Add More...") {
                  e.preventDefault();
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
                showAdditional ? [...options, "Add More..."] : options ?? []
              }
              onInputChange={(e, v) => {
                debouncedOnChange(v);
              }}
              loadingText={
                <Typography variant="light" size={"vsmall"}>
                  Loading...
                </Typography>
              }
              noOptionsText={
                <Typography variant="light" size={"vsmall"}>
                  No Results
                </Typography>
              }
              renderOption={(props, option, value) => {
                if (option === "Add More...") {
                  // Render the custom Add More component
                  return <AddMoreComponent {...props} />;
                }
                return (
                  <Box {...props}>
                    <Box width={"100%"} py={0.5}>
                      <Box
                        width={"100%"}
                        gap={1}
                        display={"flex"}
                        justifyContent={"flex-start"}
                      >
                        <Avatar
                          sx={{
                            width: "40px",
                            height: "40px",
                            fontSize: "14px",
                            background: randomColor(option[keyLabel]),
                          }}
                          src={imageurl(option[keyImage])}
                        >
                          {option[keyLabel] && option[keyLabel]?.slice(0, 2)}
                        </Avatar>
                        <Stack direction={"column"} width={"100%"}>
                          <Stack
                            direction={"row"}
                            width={"100%"}
                            gap={1}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Typography variant="light" size="small">
                              {get(option, keyLabel)}
                            </Typography>
                            <Button
                              variant="text"
                              sx={{
                                px: 0,
                                fontSize: "10px !important",
                                width: "fit-content !important",
                                m: 0,
                                height: "10px",
                              }}
                            >
                              {option["is_client"] == 0 ? "Lezdo" : "Client"}
                            </Button>{" "}
                          </Stack>
                          {get(option, keyEmail) && (
                            <Typography variant="light" size="vsmall">
                              {get(option, keyEmail)}
                            </Typography>
                          )}
                        </Stack>

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
                  label={label}
                  variant={variant}
                  error={get(formState?.errors, name)?.message}
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
                  sx={{ caretColor: "black" }}
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
                        )}{" "}
                        {endAdornment}
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
