"use client";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import LoadingButton from "../../../components/Common/Buttons/LoadingButton";
import { useForm } from "react-hook-form";
import StringField from "../../../components/Common/InputFields/StringField";
import CasCaderField from "../../../components/Common/InputFields/CasCader";
import { useDispatch, useSelector } from "react-redux";
import { driveSelector } from "../../../store/drive/driveSlice";
import {
  chooseFolder,
  fileRequest,
  getAllFolders,
  getFileRequest,
  getSingleFileRequest,
  getSubmitters,
  removeSubmitterAndChangeStatus,
  updateFileRequest,
} from "../../../store/drive/driveActions";
import DateField from "../../../components/Common/InputFields/DateField";
import FolderIcon from "@mui/icons-material/Folder";
import CheckBoxField from "../../../components/Common/InputFields/CheckBoxField";
import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LinkIcon from "@mui/icons-material/Link";
import { DeleteIcon } from "../../../helpers/icons";
import TTTypography from "../../../components/Common/ToolTipComponents/TTTypography";
import { GlobalContext } from "@/layout/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";
const schema = yup.object().shape({
  title: yup.string().required("Required"),
  des: yup.string().required("Required"),
  folder_id: yup.string().required("Required"),
  exp_date: yup.date().required("Required"),
  email: yup
    // .mixed()
    .array()
    .of(yup.string().required("Required"))
    .required("Required"),
});

export default function FileRequestView({ open, handleClose }) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      notify: 0,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { confirmPopUp, setConfirmPopUp } = useContext(GlobalContext)||{};
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const getcolor = (option) => {
    try {
      console.log(
        "pen?.submitters_list?.find((it) => it.email == option)?.uploaded",
        open?.submitters_list?.find((it) => it.email == option)?.uploaded
      );
      switch (
        open?.submitters_list?.find((it) => it.email == option)?.uploaded
      ) {
        case 0:
          return "warning";
        case 1:
          return "success";
        default:
          return "secondary";
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onSubmit = async (data) => {
    try {
      if (typeof open !== "object") {
        await dispatch(fileRequest(data)).unwrap();
        toast.success("Request has been sended");
        handleClose(null);
      } else {
        await dispatch(updateFileRequest(data)).unwrap();
        toast.success("Request has been updated");
        handleClose(null);
        dispatch(getSingleFileRequest({ id: open?.id }));
      }
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };

  const {
    chooseFolderData,
    fileRequestLoading,
    updateFileRequestLoading,
    getSubmittersData,
    getSubmittersLoading,
    getSingleFileRequestData,
    getSingleFileRequestLoading,
  } = useSelector(driveSelector);
  
  useEffect(() => {
    dispatch(chooseFolder(1));
  }, []);
  useEffect(() => {
    if (typeof open == "object") {
      let email = getSingleFileRequestData?.submitters_list?.map(
        (it) => it.email
      );
      console.log("email", email);
      reset({ ...getSingleFileRequestData, email: email });
    }
  }, [open, getSingleFileRequestData]);

  function copy() {
    // Get the text field
    var copyText = document.getElementById("myInput");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied the text: " + copyText.value);
  }

  const columns = [
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      format: (value) => value,
    },
    {
      id: "email",
      label: "Status",
      minWidth: 170,
      align: "right",
      format: (value) => (
        <>
          <Typography
            color={`${getcolor(value) == "success" ? "green" : "orange"} `}
          >
            {getcolor(value) == "success" ? "Uploaded" : "Pending"}
          </Typography>
        </>
      ),
    },
    {
      id: "id",
      label: "Action",
      minWidth: 170,
      align: "right",
      format: (value) => (
        <IconButton
          onClick={() =>
            setConfirmPopUp({
              onSubmit: () => removeSubmitter(value),
              content: "Are you sure to remove this email ?",
            })
          }
        >
          {DeleteIcon}
        </IconButton>
      ),
    },
  ];

  const changeRequestStatus = async () => {
    try {
      // return console.log('id', id)
      await dispatch(
        removeSubmitterAndChangeStatus({
          type: 2,
          id: getSingleFileRequestData?.id,
          status: [2, 1].includes(getSingleFileRequestData?.status) ? 0 : 2,
        })
      ).unwrap();
      [2, 1].includes(getSingleFileRequestData?.status)
        ? toast.success("Request Closed")
        : toast.success("Request ReOpened"),
        dispatch(getSingleFileRequest({ id: getSingleFileRequestData?.id }));
      dispatch(getFileRequest());
      setConfirmPopUp(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  const removeSubmitter = async (id) => {
    try {
      // return console.log('id', id)
      await dispatch(
        removeSubmitterAndChangeStatus({ type: 1, id: id })
      ).unwrap();
      toast.success("This Submitter removed");
      dispatch(getSingleFileRequest({ id: open?.id }));
      setConfirmPopUp(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (typeof open == "object") {
      // dispatch(getSubmitters({ id: open?.id }));
      dispatch(getSingleFileRequest({ id: open?.id }));
    }
  }, []);
  // useEffect(() => {
  //   if (typeof open == "object") {
  //     let email = getSubmittersData?.map((it) => it.email);
  //     setValue("email", email);
  //   }
  // }, [getSubmittersData]);
  return (
    <>
      {getSingleFileRequestLoading ? (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={getSingleFileRequestLoading}
          >
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              strokeColor="#0038ff"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Backdrop>
        </>
      ) : (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          fullWidth
          onClose={handleClose}
          maxWidth={"sm"}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" className="bold">
            File Request
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={4} sx={{ mt: 1 }}>
              {typeof open == "object" && (
                <Grid item xs={12}>
                  <input
                    type="text"
                    disabled
                    style={{ display: "none" }}
                    value={watch("link")}
                    id="myInput"
                  />
                  Copy Link
                  <IconButton onClick={() => copy()}>
                    <LinkIcon />
                  </IconButton>
                </Grid>
              )}
              <Grid item xs={12}>
                <StringField control={control} name={"title"} label={"Title"} />
              </Grid>
              <Grid item xs={12}>
                <StringField
                  control={control}
                  name={"des"}
                  label={"Description"}
                />
              </Grid>
              <Grid item xs={12} key={open}>
                <CasCaderField
                  control={control}
                  name={"folder_id"}
                  label={"Select Folder"}
                  options={chooseFolderData}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  key={open}
                  size="small"
                  control={control}
                  name={"email"}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        color={`${getcolor(option)}`}
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
                    if (reason == "removeOption" && typeof open == "object") {
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
              {typeof open == "object" && (
                <Grid item xs={12}>
                  <Card className="w-100 p-2">
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {getSingleFileRequestData?.submitters_list?.map(
                            (row, i) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={i + row}
                                >
                                  {columns.map((column) => {
                                    let value = row[column?.id];
                                    if (column.id == "status") {
                                    }
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {typeof column.format
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
              )}
              <Grid item xs={12}>
                <StringField
                  control={control}
                  name={"password"}
                  label={"Passowrd"}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <DateField
                  control={control}
                  name={"exp_date"}
                  label={"Expiry date"}
                />
              </Grid>
              {typeof open !== "object" && (
                <Grid item xs={12}>
                  <CheckBoxField
                    control={control}
                    name={"notify"}
                    label={"Notify through mail"}
                  />
                </Grid>
              )}
              {typeof open == "object" && (
                <Grid
                  item
                  xs={12}
                  className="row-align-between justify-content-between"
                >
                  <Typography variant="bold" size="small">
                    Files:{watch("files_count")}
                  </Typography>
                  <Typography variant="bold" size="small">
                    Size :{(watch("size") / 1024 / 1024).toFixed(2)}MB
                  </Typography>
                  <Button
                    variant="cancel"
                    startIcon={<FolderIcon />}
                    sx={{
                      background: "var(--button-secondary-color)",
                      color: "#000",
                    }}
                    // onClick={() => {
                    //   N(
                    //     `/admin/drive/my-drive/${getSingleFileRequestData?.folder?.id}/${getSingleFileRequestData?.folder?.stage}`
                    //   );
                    // }}
                  >
                    View uploads
                  </Button>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-start", ml: 2 }}>
            <LoadingButton
              onClick={handleSubmit(onSubmit)}
              loading={fileRequestLoading || updateFileRequestLoading}
              label="Save"
            />
            <Button variant="cancel" onClick={handleClose}>
              Cancel
            </Button>
            {typeof open == "object" && (
              <Button variant="cancel" onClick={changeRequestStatus}>
                {[1, 2].includes(getSingleFileRequestData?.status)
                  ? "Close Request"
                  : "Re Open"}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
