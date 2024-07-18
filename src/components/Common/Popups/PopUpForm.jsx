"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Paper,
  TextField,
  TextareaAutosize,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useDispatch, useSelector } from "react-redux";
import SelectField from "../../Common/InputFields/SelectField";
import { GlobalContext } from "../../../layout/GlobalContextProvider";
import StringField from "../../Common/InputFields/StringField";
import CheckBoxField from "../../Common/InputFields/CheckBoxField";
import SearchSelect from "../InputFields/SearchSelect";
import LoadingButton from "../Buttons/LoadingButton";
// import ColorField from "../InputFields/ColorField";
import SwitchField from "../InputFields/SwitchField";
import DateField from "../InputFields/DateField";
import { Cascader } from "rsuite";
import CasCaderField from "../InputFields/CasCader";
import { Each } from "@/helpers/utils";

export default function PopUpForm({ loading, fieldDatas, open, onClose }) {
  const { popUpForm, setPopupForm } = React.useContext(GlobalContext) || {};
  const { fields, title, formProps, onSubmit, buttonProps } =
    popUpForm || fieldDatas;
  const dispatch = useDispatch();
  const handleClose = () => {
    typeof onClose == "function" && onClose();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const getField = (field) => {
    switch (field?.type) {
      case "text":
        return (
          <StringField {...formProps} name={field?.name} label={field?.label} />
        );
      case "email":
        return (
          <StringField
            {...formProps}
            type={"email"}
            name={field.name}
            label={field?.label}
          />
        );
      case "number":
        return (
          <StringField
            {...formProps}
            name={field?.name}
            label={field?.label}
            type="number"
          />
        );
      // case "color":
      //   return (
      //     <ColorField
      //       {...formProps}
      //       name={field?.name}
      //       label={field?.label}
      //       type="color"
      //     />
      //   );
      case "textArea":
        return (
          <StringField
            {...formProps}
            multiline
            minRows={5}
            name={field?.name}
            label={field?.label}
          />
        );
      case "select":
        return (
          <SelectField
            {...formProps}
            options={field?.options}
            name={field?.name}
            label={field?.label}
            keyValue={field?.keyValue}
            keyLabel={field?.keyLabel}
            handleChange={field?.onChange}
          />
        );
      case "autocomplete":
        return (
          <SearchSelect
            {...formProps}
            options={field?.options}
            name={field?.name}
            onChange={field?.onChange}
            label={field?.label}
            keyLabel={field?.keyLabel}
            keyValue={field?.keyValue}
          />
        );
      case "multiSelect":
        return (
          <SearchSelect
            {...formProps}
            options={field?.options}
            name={field?.name}
            label={field?.label}
          />
        );
      case "checkbox":
        return (
          <CheckBoxField
            {...formProps}
            name={field?.name}
            label={field?.label}
          />
        );
      case "switch":
        return (
          <SwitchField
            {...formProps}
            name={field?.name}
            label1={field?.label1}
            label2={field?.label2}
          />
        );
      case "date":
        return (
          <DateField {...formProps} name={field?.name} label={field?.label} />
        );
      case "cascader":
        return (
          <CasCaderField
            {...formProps}
            name={field?.name}
            label={field?.label}
            options={field?.options}
          />
        );
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={popUpForm || open}
      fullWidth
      onClose={handleClose}
      maxWidth={"xs"}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" className="bold">
        {title}
      </DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Grid container rowSpacing={3}>
            <Each
              of={fields}
              render={(field, index) => {
                return (
                  <>
                    {field && (
                      <Grid item xs={12} key={index}>
                        {getField(field)}
                      </Grid>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start", ml: 2 }}>
        <Button type="submit" variant="cancel" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton onClick={onSubmit} loading={loading}>
          {buttonProps?.label}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
