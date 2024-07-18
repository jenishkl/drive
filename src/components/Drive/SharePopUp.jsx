"use client";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoadingButton from "../Common/Buttons/LoadingButton";
import SearchSelect from "../Common/InputFields/SearchSelect";
import { useForm } from "react-hook-form";
import SelectField from "../Common/InputFields/SelectField";
import CheckBoxField from "../Common/InputFields/CheckBoxField";
import SwitchField from "../Common/InputFields/SwitchField";
import StringField from "../Common/InputFields/StringField";
import DateField from "../Common/InputFields/DateField";
import { useDispatch, useSelector } from "react-redux";
import {
  shareFileExternal,
  shareFileInternal,
} from "../../store/drive/driveActions";
import { toast } from "sonner";
import { driveSelector } from "../../store/drive/driveSlice";
import { useEffect } from "react";
import { commonSelect } from "../../store/crm/others/otherActions";
import { crmOtherSelector } from "../../store/crm/others/otherSlice";
import PeopleSelect from "../Common/InputFields/PeopleSelect";
import AsyncSearchSelect from "../Common/InputFields/AsyncSearch";
import { crmClientSelector } from "../../store/crm/clients/clientSlice";
import { getClients } from "../../store/crm/clients/clientActions";
import { getAllEmployees } from "../../store/crm/employees/employeeActions";
import { crmEmployeeSelector } from "../../store/crm/employees/employeeSlice";

export default function SharePopUp({
  fieldDatas,
  open,
  onClose,
  type,
  id,
  drive,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    typeof onClose == "function" && onClose();
  };
  const {
    control,
    setValue,
    formState: { errors, isDirty },
    getValues,
    reset,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      is_external: 0,
    },
  });
  const formProps = { control };
  const { shareFileExternalLoading, shareFileInternalLoading } =
    useSelector(driveSelector);
  const { commonSelectData } = useSelector(crmOtherSelector);
  const { getAllEmployeesData, getAllEmployeesLoading } =
    useSelector(crmEmployeeSelector);
  const onSubmit = async (data) => {
    try {
      data.f_id = id;
      data.type = type;
      data.drive = drive;
      console.log("data", data);

      await dispatch(shareFileInternal(data)).unwrap();
      // data.type = type;
      // if (data?.is_external == 0) {
      //   delete data.email;
      //   delete data.password;
      //   delete data.exp_date;
      //   data.user_id = data?.user_id?.map((it) => it.value);
      //   // await dispatch(shareFileInternal(data)).unwrap();
      // }

      // else {
      //   await dispatch(shareFileExternal(data)).unwrap();
      // }

      handleClose();
      toast.success("File shared successfully");
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    dispatch(commonSelect());
  }, []);
  const { getClientsData, getClientsLoading } = useSelector(crmClientSelector);
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth
      onClose={handleClose}
      maxWidth={"sm"}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Share Files</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Stack direction={"column"} gap={2} container rowSpacing={3}>
            <Grid container>
              {watch("is_external") == 0 ? (
                <Grid item xs={9}>
                  <PeopleSelect
                    required={"Required"}
                    {...formProps}
                    multiple
                    listcomponent={false}
                    name={"user_id"}
                    label={"People"}
                    loading={getClientsLoading}
                    keyLabel="name"
                    keyValue="id"
                    options={[
                      ...(getClientsData?.data ?? []),
                      ...(getAllEmployeesData?.data ?? []),
                    ]}
                    asyncfunction={(search) => {
                      dispatch(
                        getClients({
                          params: {
                            ...{
                              pageSize: 10,
                              pageIndex: 0,
                              search: search,
                              client_type: 0,
                            },
                            page: 1,
                          },
                        })
                      );
                      dispatch(
                        getAllEmployees({
                          ...{
                            pageSize: 10,
                            pageIndex: 0,
                            search: search,
                            client_type: 0,
                          },
                          page: 1,
                        })
                      );
                    }}
                    // options={commonSelectData?.employee}
                  />
                </Grid>
              ) : (
                <Grid item xs={9}>
                  <Grid item xs={12}>
                    <Autocomplete
                      freeSolo
                      key={open}
                      fullWidth
                      size="small"
                      control={control}
                      name={"email"}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            // color={`${getcolor(option)}`}
                            variant="outlined"
                            icon={<></>}
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      value={watch("email") ?? []}
                      multiple
                      // inputValue={watch("emailtext")}
                      // onInputChange={(e) => setValue("emailtext", e.target.value)}
                      onChange={(e, v, reason, detail) => {
                        if (
                          reason == "removeOption" &&
                          typeof open == "object"
                        ) {
                          return null;
                        }
                        if (!watch("email")?.includes(v)) {
                          setValue("email", v);
                        }
                      }}
                      options={[]}
                      label={"Email address"}
                      renderInput={(params) => (
                        <TextField
                          label="Select Email"
                          error={errors?.email?.message}
                          {...params}
                          // InputProps={{
                          //   endAdornment: (
                          //     <IconButton>
                          //       <AddIcon />
                          //     </IconButton>
                          //   ),
                          // }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              )}
              <Grid item xs={3}>
                <SelectField
                  {...formProps}
                  options={[
                    {
                      label: "View",
                      value: 1,
                    },
                    {
                      label: "Edit",
                      value: 2,
                    },
                  ]}
                  name={"access_level"}
                  label={"Access Level"}
                />
              </Grid>
              <Grid xs={12}>
                <CheckBoxField
                  {...formProps}
                  label={"Notify People"}
                  name={"is_notify"}
                />
              </Grid>
            </Grid>

            <Grid container>
              {/* <Grid item xs={11}>
                <StringField
                  readOnly={watch("is_external") == 0}
                  name={"share_link"}
                  {...formProps}
                  label={"external_shareLink"}
                />
              </Grid> */}
              <Grid item xs={12}>
                <SwitchField
                  {...formProps}
                  label1={"External share link"}
                  name={"is_external"}
                />
              </Grid>
            </Grid>
            {watch("is_external") == 1 && (
              <>
                <Grid container>
                  <Grid item xs={11}>
                    <StringField
                      readOnly={watch("is_password") == 0}
                      type="password"
                      name={"password"}
                      {...formProps}
                      label={"Set password"}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <SwitchField
                      {...formProps}
                      // label1={"External share link"}
                      name={"is_password"}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems={"center"}>
                  <Grid item xs={11}>
                    <DateField
                      readOnly={watch("is_expiry") == 0}
                      dateOnly={true}
                      name={"exp_date"}
                      {...formProps}
                      label={"Set Expiry"}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <SwitchField
                      {...formProps}
                      // label1={"External share link"}
                      name={"is_expiry"}
                    />
                  </Grid>
                </Grid>
                {/* <Grid container>
                  <Grid item xs={11}>
                    <StringField
                      name={"limit"}
                      {...formProps}
                      label={"Download limit"}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <SwitchField
                      {...formProps}
                      // label1={"External share link"}
                      name={"is_limit"}
                    />
                  </Grid>
                </Grid> */}
              </>
            )}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start", ml: 2 }}>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          loading={shareFileExternalLoading || shareFileInternalLoading}
        >
          Share
        </LoadingButton>
        <Button type="submit" variant="cancel" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
