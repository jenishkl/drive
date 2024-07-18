import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import StringField from "../InputFields/StringField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import DateField from "../InputFields/DateField";
import LoadingButton from "../Buttons/LoadingButton";
import { useSelector } from "react-redux";
import TextEditor from "../Editor/TextEditor";
export default function SendEmailPopUp({
  open,
  setOpen,
  formProps,
  name,
  label,
  onSubmit,
  onClose,
}) {
  const { control, setValue, watch, reset, isDirty } = formProps || {};
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(null);
    onClose();
  };
  const { mailsendLoading } = useSelector((state) => ({
    mailsendLoading: state.crm.otherSlice?.sendMail?.loading,
  }));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        fullWidth
        onClose={() => {
          setValue("is_active", 0);
          onSubmit();
          // handleClose();
        }}
        maxWidth={"md"}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          component={"div"}
          className="d-flex justify-content-between align-items-center"
          id="responsive-dialog-title"
        >
          Mail
          <IconButton onClick={handleClose}>
            <HighlightOffIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form action="">
            <Box mt={2}>
              <Grid container rowSpacing={6}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography variant="light" size="medium">
                        Subject
                      </Typography>
                    </Grid>
                    <Grid xs={10} key={watch("is_active") == "1"}>
                      <StringField
                        {...formProps}
                        name={"subject"}
                        required={"Required"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography variant="light" size="medium">
                        To
                      </Typography>
                    </Grid>
                    <Grid xs={10} key={watch("is_active")}>
                      <StringField
                        {...formProps}
                        name={"recipient_email"}
                        required={"Required"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography variant="light" size="medium">
                        Body
                      </Typography>
                    </Grid>
                    <Grid xs={10} key={watch("is_active")}>
                      <TextEditor onChange={(e) => setValue("body", e)} />
                      {/* <StringField
                          {...formProps}
                          multiline
                          minRows={5}
                          name={"body"}
                        /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container className="" alignItems={"center"}>
                    <Grid item xs={2}>
                      <Typography variant="light" size="medium">
                        Scheduled time
                      </Typography>
                    </Grid>
                    <Grid xs={10}>
                      <DateField
                        minDate={true}
                        control={control}
                        name={"scheduled_datetime"}
                        label={"Scheduled"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start", ml: 2 }}>
          {watch("scheduled_datetime") ? (
            <LoadingButton
              variant="save"
              size="small"
              label="Schedule"
              loading={mailsendLoading}
              onClick={() => {
                setValue(`is_active`, 2);
                onSubmit();
              }}
            ></LoadingButton>
          ) : (
            <LoadingButton
              variant="save"
              size="small"
              label="Send"
              loading={mailsendLoading}
              onClick={() => {
                setValue(`is_active`, 1);
                onSubmit();
              }}
            />
          )}
          <Button
            endIcon={<DeleteIcon />}
            variant="cancel"
            onClick={() => {
              reset({ scheduled_datetime: "" }, {});
              setValue("is_active", "1");
              // onSubmit();
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
