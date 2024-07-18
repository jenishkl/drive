"use client";
import React, { useState } from "react";
import { Each, USER, dateFormate, imageurl } from "../../helpers/utils";
import BadgeAvatar from "../Common/Avatar/BadgeAvatar";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  AppBar,
  Tabs,
  Tab,
  IconButton,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SelectField from "../Common/InputFields/SelectField";
import { useForm } from "react-hook-form";
import PeopleSelect from "../Common/InputFields/PeopleSelect";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../store/crm/clients/clientActions";
import { crmClientSelector } from "../../store/crm/clients/clientSlice";
import RadioField from "../Common/InputFields/RadioField";
import SwitchField from "../Common/InputFields/SwitchField";
import AddIcon from "@mui/icons-material/Add";
import {
  changeAccessLevel,
  folderDetails,
  removeSharedUser,
  shareFileInternal,
} from "../../store/drive/driveActions";
import { DeleteIcon } from "../../helpers/icons";
import Actions from "../Common/dropdowns/Actions";
import LoadingButton from "../Common/Buttons/LoadingButton";
import { driveSelector } from "../../store/drive/driveSlice";
import { toast } from "sonner";
import { getAllEmployees } from "../../store/crm/employees/employeeActions";
import { crmCompanySelector } from "../../store/crm/company/companySlice";
import { crmEmployeeSelector } from "../../store/crm/employees/employeeSlice";
import StringField from "../Common/InputFields/StringField";
import DateField from "../Common/InputFields/DateField";
import dayjs from "dayjs";
export default function ManageSharedPeoples({
  accessers,
  f_id,
  type,
  drive,
  detail,
}) {
  const [accessOpen, setAccessOpen] = useState();
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { getClientsData, getClientsLoading } = useSelector(crmClientSelector);
  const { getAllEmployeesData, getAllEmployeesLoading } =
    useSelector(crmEmployeeSelector);
  const { shareFileInternalLoading, getFileAccessData, folderDetailsData } =
    useSelector(driveSelector);
  const dispatch = useDispatch();
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const formProps = { control, setValue, handleSubmit, reset, watch, errors };
  const accessOpenClose = () => {
    setAccessOpen(false);
  };
  const handlePermissionChange = () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleAddPeople = async (data) => {
    try {
      data.f_id = f_id;
      data.type = type;
      data.drive = drive;
      let user_id = data?.user_id?.filter((it) => typeof it?.id == "number");
      let email = data?.user_id
        ?.filter((it) => typeof it?.id != "number")
        ?.map((it) => it?.id);
      console.log("data", data);
      if (user_id?.[0]) {
        data.user_id = user_id;
        data.is_external = 0;
        await dispatch(shareFileInternal(data)).unwrap();
      }
      if (email?.[0]) {
        data.email = email;
        data.is_external = 1;
        await dispatch(shareFileInternal(data)).unwrap();
      }
      toast.success("Success");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleRemoveUser = async (id) => {
    try {
      await dispatch(removeSharedUser(id)).unwrap();
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleAccessChange = async (e, id) => {
    try {
      await dispatch(
        changeAccessLevel({ id: id, access_level: e.target.value })
      )
        .unwrap()
        .then((d) => toast.success(d?.message));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      {(getFileAccessData?.access_level == 2 ||
        USER?.id == detail?.created_by) && (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{ fontSize: "10px !important" }}
          onClick={() => {
            setAccessOpen(true);
          }}
        >
          Mange Access
        </Button>
      )}
      <Dialog
        open={accessOpen}
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
        onClose={accessOpenClose}
        aria-labelledby={"dfff"}
      >
        <DialogTitle id={"access-open"} sx={{ textDecoration: "underline" }}>
          Manage Access
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Grid container mt={1}>
              <Grid item xs={12}></Grid>
            </Grid>
            <Box>
              <Tabs
                value={tabValue}
                onChange={(e, v) => {
                  setTabValue(v);
                  reset({});
                }}
                aria-label=""
              >
                <Tab label={"Internal"} value={0} />
                <Tab label={"External"} value={1} />
              </Tabs>
            </Box>
            <Stack direction={"column"} gap={2} mt={3} key={tabValue}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <PeopleSelect
                    required={"Required"}
                    {...formProps}
                    key={tabValue}
                    multiple
                    freesolo={tabValue == 0 ? false : true}
                    listcomponent={false}
                    name={"user_id"}
                    label={"People"}
                    loading={getClientsLoading}
                    keyLabel="name"
                    keyValue="id"
                    options={
                      tabValue == 1
                        ? []
                        : [
                            ...(getClientsData?.data ?? []),
                            ...(getAllEmployeesData?.data ?? []),
                          ]
                    }
                    asyncfunction={(search) => {
                      if (tabValue == 0) {
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
                      }
                    }}
                    // options={commonSelectData?.employee}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Box >
                    <SelectField
                      {...formProps}
                      options={[
                        { label: "View", value: 1 },
                        { label: "Modify", value: 2 },
                      ]}
                      name={"access_level"}
                      label={"Access Level"}
                    />
                  </Box>
                </Grid>
                {tabValue == 1 && (
                  <>
                    <Grid item xs={6}>
                      <StringField
                        {...formProps}
                        name={"password"}
                        label={"Password"}
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DateField
                        {...formProps}
                        minDate={true}
                        name={"exp_date"}
                        label={"Expiry Date"}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <LoadingButton
                        label="Add"
                        loading={shareFileInternalLoading}
                        endIcon={<AddIcon />}
                        size="small"
                        onClick={handleSubmit(handleAddPeople)}
                      />
                    </Grid>
                  </>
                )}{" "}
              </Grid>
              <Each
                of={accessers?.filter((it) => it?.is_external == tabValue)}
                render={(it) => {
                  return (
                    <>
                      <Stack
                        direction={"row"}
                        gap={1}
                        justifyContent={"space-between"}
                      >
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                          <BadgeAvatar
                            isEdit={false}
                            size="small"
                            name={it?.email}
                            id={
                              it?.user_details?.profile_img +
                              it?.user_details?.name
                            }
                          />
                          <Stack direction={"column"}>
                            <Typography
                              variant="bold"
                              size="medium"
                              className="singleLine"
                            >
                              {it?.user_details?.name}
                            </Typography>
                            <Typography
                              variant="light"
                              size="small"
                              className="singleLine"
                            >
                              {it?.email}
                            </Typography>
                            {tabValue == 1 && (
                              <>
                                <Stack direction={"row"}>
                                  <Typography
                                    variant="bold"
                                    size="xlsmall"
                                    className="singleLine"
                                  >
                                    Password:
                                  </Typography>
                                  <Typography
                                    variant="light"
                                    size="xlsmall"
                                    className="singleLine"
                                  >
                                    {it?.password}
                                  </Typography>
                                </Stack>
                                <Stack direction={"row"}>
                                  <Typography
                                    variant="bold"
                                    size="xlsmall"
                                    className="singleLine"
                                  >
                                    Expiry Date:
                                  </Typography>
                                  <Typography
                                    variant="light"
                                    size="xlsmall"
                                    className="singleLine"
                                  >
                                    {dayjs(it?.exp_date).format(
                                      dateFormate({ mask: "/" })
                                    )}
                                  </Typography>
                                </Stack>
                              </>
                            )}
                          </Stack>{" "}
                        </Stack>
                        <Stack direction={"row"} alignItems={"center"}>
                          <Box width={"100px"} height={"50px"}>
                            <Select
                              size="small"
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              value={it?.access_level}
                              onChange={(e) => handleAccessChange(e, it?.id)}
                            >
                              <MenuItem value={1}>View</MenuItem>
                              <MenuItem value={2}>Modify</MenuItem>
                            </Select>

                            {/* <SelectField
                              {...formProps}
                              options={[
                                { label: "View", value: 1 },
                                { label: "Modify", value: 2 },
                              ]}
                              name={"access_level"}
                              label={"Access Level"}
                            /> */}
                          </Box>

                          {/* <FormControl sx={{}} size="small">
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              value={it?.access_level}
                              onChange={handlePermissionChange}
                            >
                              <MenuItem value={1}>View</MenuItem>
                              <MenuItem value={2}>Edit</MenuItem>
                            </Select>
                          </FormControl> */}
                          <Actions
                            menuItems={[
                              <MenuItem
                                onClick={() => handleRemoveUser(it?.id)}
                              >
                                <ListItemIcon>{DeleteIcon}</ListItemIcon>
                                Delete
                              </MenuItem>,
                            ]}
                          />
                        </Stack>
                        {/* <Grid container width={'min-content'} >
                        <Grid item xs={1}>
                        
                        </Grid>

                        <Grid item x={1} >
                          <FormControl sx={{}} size="small">
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              value={it?.access_level}
                              onChange={handlePermissionChange}
                            >
                              <MenuItem value={1}>View</MenuItem>
                              <MenuItem value={2}>Edit</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid> */}
                      </Stack>
                      <hr />
                    </>
                  );
                }}
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={accessOpenClose} variant="cancel">
            Close
          </Button>
          {watch("user_id")?.[0] && (
            <LoadingButton
              label="Save"
              loading={shareFileInternalLoading}
              // endIcon={<AddIcon />}
              size="small"
              onClick={handleSubmit(handleAddPeople)}
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
