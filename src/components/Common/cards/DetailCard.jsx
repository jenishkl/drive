import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StringField from "../InputFields/StringField";
import SelectField from "../InputFields/SelectField";
import { Each } from "../../../helpers/utils";
import LoadingButton from "../Buttons/LoadingButton";
import SearchSelect from "../InputFields/SearchSelect";
import StateField from "../InputFields/StateField";
import CountryField from "../InputFields/CountryField";
import DateField from "../InputFields/DateField";
import RadioField from "../InputFields/RadioField";
import GoogleAutoComplete from "../InputFields/GoogleAutoComplete";

export default function DetailCard({
  label,
  list,
  formProps,
  loading = false,
  buttonLoading = false,
  onSubmit,
  editAll,
  isEdit = true,
}) {
  let { control, watch, setValue, handleSubmit, isDirty, errors, dirtyFields } =
    formProps;
  const [edit, setEdit] = useState(null);
  const fieldnames = list?.map((item) => item?.name);
  const dirty = Object.keys(dirtyFields).some((item) =>
    fieldnames?.includes(item)
  );
  const getField = (field) => {
    switch (field?.field) {
      case "text":
        return (
          <StringField
            control={control}
            name={field.name}
            variant={!edit ? "standard" : "outlined"}
            readOnly={field?.readOnly ?? !edit}
            required={field?.required}
            // label={field?.label}
          />
        );
      case "number":
        return (
          <StringField
            type={"number"}
            control={control}
            name={field?.name}
            variant={!edit ? "standard" : "outlined"}
            readOnly={field?.readOnly ?? !edit}
            required={field?.required}

            // label={field?.label}
          />
        );
      case "email":
        return (
          <StringField
            type={"email"}
            control={control}
            name={field.name}
            readOnly={field?.readOnly ?? !edit}
            variant={!edit ? "standard" : "outlined"}
            required={field?.required}
            // label={field?.label}
          />
        );
      case "select":
        return (
          <SelectField
            control={control}
            options={field?.options}
            name={field.name}
            watch={watch}
            // label={field?.label}
            keyLabel={field?.keyLabel}
            keyValue={field?.keyValue}
            loading={field?.loading}
            variant={!edit ? "standard" : "outlined"}
            readOnly={field?.readOnly ?? !edit}
            required={field?.required}
          />
        );
      case "autocomplete":
        return (
          <SearchSelect
            control={control}
            options={field?.options}
            name={field?.name}
            watch={watch}
            loading={field?.loading}
            onChange={field?.onChange}
            multiple={field?.multiple}
            keyLabel={field?.keyLabel}
            keyValue={field?.keyValue}
            variant={!edit ? "standard" : "outlined"}
            readOnly={field?.readOnly ?? !edit}
            required={field?.required}
          />
        );
      case "state":
        return (
          <StateField
            {...formProps}
            control={control}
            name={field?.name}
            watch={watch}
            onChange={field?.onChange}
            required={field?.required}
            // label={field?.label}
            countryKeyName={field?.countryKeyName}
            variant={!edit ? "standard" : "outlined"}
            readOnly={field?.readOnly ?? !edit}
          />
        );
      case "country":
        return (
          <CountryField
            {...formProps}
            control={control}
            name={field?.name}
            watch={watch}
            onChange={field?.onChange}
            // label={field?.label}
            readOnly={field?.readOnly ?? !edit}
            variant={!edit ? "standard" : "outlined"}
          />
        );
      case "address":
        return (
          <GoogleAutoComplete
            {...formProps}
            control={control}
            name={field.name}
            variant={!edit ? "standard" : "outlined"}
            readOnly={field?.readOnly ?? !edit}
            required={field?.required}
            country={field?.country}
            value={field?.value}
            onChange={field?.onChange}
          />
        );
      case "date":
        return (
          <DateField
            {...formProps}
            control={control}
            dateOnly={true}
            name={field?.name}
            watch={watch}
            onChange={field?.onChange}
            readOnly={field?.readOnly ?? !edit}
            variant={!edit ? "standard" : "outlined"}
            required={field?.required}
          />
        );

      case "radios":
        return (
          <RadioField
            {...formProps}
            radios={field?.radios}
            control={control}
            name={field?.name}
            onChange={field?.onChange}
            readOnly={field?.readOnly ?? !edit}
            disabled={field?.readOnly ?? !edit}
            required={field?.required}
          />
        );
    }
  };
  useEffect(() => {
    setEdit(editAll);
  }, [editAll]);
  return (
    <Box className="d-flex flex-column gap-4">
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="bold" size={"high"} component={"div"}>
          {label}
        </Typography>
        {isEdit && (
          <>
            {edit ? (
              <LoadingButton
                loading={buttonLoading}
                variant="contained"
                disabled={!dirty || buttonLoading}
                label="Save"
                onClick={handleSubmit(onSubmit)}
              />
            ) : (
              <LoadingButton
                loading={buttonLoading}
                variant="contained"
                disabled={buttonLoading}
                label="Edit"
                onClick={() => setEdit(true)}
              />
            )}
          </>
        )}
      </Box>
      <Card className="p-5" sx={{}}>
        <Grid container spacing={3}>
          <Each
            of={list}
            render={(item, index) => {
              return (
                <Grid item xs={12} md={item?.field == "radios" ? 12 : 6}>
                  <Grid container className="align-items-center">
                    <Grid item xs={12} md={6}>
                      <Typography variant="bold" size="medium">
                        {item?.label}{" "}
                        <span className="text-danger">
                          {" "}
                          {item?.required && "*"}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={["radios"].includes(item?.field) ? 12 : 6}
                    >
                      {
                        loading ? (
                          <Skeleton />
                        ) : (
                          // edit ? (
                          getField(item)
                        )

                        // ) : (
                        //   <Typography variant="light" size="medium">
                        //     {loading ? <Skeleton /> : watch(item?.name)}
                        //   </Typography>
                        // )
                      }
                    </Grid>
                  </Grid>
                </Grid>
              );
            }}
          />
        </Grid>
      </Card>
    </Box>
  );
}
