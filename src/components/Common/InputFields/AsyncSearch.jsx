import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../../store/crm/clients/clientActions";
import { crmClientSelector } from "../../../store/crm/clients/clientSlice";
import { get } from "lodash";
import { Box, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Controller } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function AsyncSearchSelect({
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
  asyncfunction,
  placeholder,
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
    asyncfunction(search);
  }, [search]);

  const Label = () =>
    mandatory || required ? (
      <p>
        {label} <span style={{ color: "red" }}> * </span>
      </p>
    ) : (
      <p>{label}</p>
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
              onFocus={scrollToInput}
              readOnly={readOnly}
              disabled={disabled}
              size="small"
              fullWidth
              clearIcon={false}
              key={JSON.stringify(field.value)}
              freeSolo
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
              onInputChange={(e, v) => {
                debouncedOnChange(v);
              }}
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
              onChange={(e, v, reason, detail) => {
                console.log("v", v);
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
              noOptionsText={noOptionsText}
              renderOption={(props, option, value) => {
                if (option === "Add More...") {
                  // Render the custom Add More component
                  return <AddMoreComponent {...props} />;
                }
                return (
                  <Box {...props}>
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
                          {value?.selected && <CheckIcon fontSize="small" />}
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
                  label={label && <Label />}
                  variant={variant}
                  placeholder={placeholder}
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
                        )}
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
