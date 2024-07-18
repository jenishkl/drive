import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import HeaderDynamic from "../../components/Common/headers/HeaderDynamic";
import TabDynamic from "../../components/Common/Tabs/TabDynamic";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import FolderRootView from "../../components/Drive/FolderRootView";
import { useForm } from "react-hook-form";
import SelectField from "../../components/Common/InputFields/SelectField";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRange } from "react-date-range";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateFilter from "../../components/Common/InputFields/DateFilter";
import { getClients } from "../../store/crm/clients/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { crmSelectors } from "../../store/crm/crmreducer";
import PeopleSelect from "../../components/Common/InputFields/PeopleSelect";
import { Cascader, Stack } from "rsuite";
import FolderIcon from "@mui/icons-material/Folder";
import { permissionSubModules } from "../../helpers/utils";
import { _drive } from "../../helpers/moduleLinks";
import {
  fileRequestFilter,
  getAllFolders,
  getFolderFilter,
  getFolders,
  newFolder,
} from "../../store/drive/driveActions";
import Actions from "../../components/Common/dropdowns/Actions";
import PopUpForm from "../../components/Common/Popups/PopUpForm";
import { toast } from "sonner";
import { driveSelector } from "../../store/drive/driveSlice";
import FileUploadChunk from "../../components/Common/FileUploadChunk";
import BackupIcon from "@mui/icons-material/Backup";
import SearchSelect from "../../components/Common/InputFields/SearchSelect";
import { GlobalContext } from "../../App";
import Pagination from "@mui/material/Pagination";
const filetypes = [
  { label: "PDF", value: "pdf" },
  { label: "DOC", value: "doc" },
  { label: "Folder", value: "folder" },
  { label: "Document", value: "document" },
  { label: "Image", value: "image" },
  { label: "Spreadsheet", value: "spreadsheet" },
  { label: "Other", value: "other" },
];

export default function CdriveLayout() {
  const N = useNavigate();
  const dispatch = useDispatch();
  const { control, setValue, getValues, reset, watch } = useForm({
    defaultValues: {
      date_type: "other",
    },
  });
  const formProps = { control, setValue, getValues, reset };
  const params = useParams();
  const [listView, setListView] = useState(false);
  const [openRequest, setOpenRequest] = useState(null);
  const [openFolder, setOpenFolder] = useState();
  const [openFileupload, setOpenFileUpload] = useState();
  const { getClientsData, getClientsLoading } = useSelector(crmSelectors);
  const { newFolderLoading } = useSelector(driveSelector);
  const {
    //UPLOAD POPUP
    uploadOpen,
    setUploadOpen,
    //FILES
    files,
    setFiles,
    //URL
    urlBody,
    setUrlBody,
  } = useContext(GlobalContext) || {};
  let tabList = [
    { name: "My Drive" },
    { name: "Case Drive" },
    { name: "Shared Files" },
    { name: "File requests" },
    { name: "Archieved" },
    { name: "Bin" },
  ];

  const handleTabChange = (e, v) => {
    try {
      N(`${v}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  let v = tabList.filter((tab) =>
    window.location.pathname
      .split("/")
      .includes(tab.name.toLowerCase().replaceAll(" ", "-"))
  )[0]?.name;

  const left = (
    <>
      <TabDynamic
        tablist={[...permissionSubModules(_drive)]}
        handleChange={handleTabChange}
        value={v}
      />
    </>
  );

  const handleCreateFolder = async () => {
    try {
      await dispatch(
        newFolder({
          name: watch("name"),
          parent_id: params?.folderId,
          stage: params?.stageId,
        })
      ).unwrap();
      toast.success("Folder created successfully");
      let data = getValues();
      data.folder_id = params.folderId;
      var filter_types = [];
      if (data.people_id) {
        filter_types.push("people");
      }
      if (data.file_type) {
        filter_types.push("file");
      }
      if (data.to_date) {
        filter_types.push("date");
        data.date_type = "other";
      }
      data.people_id = data?.people_id?.map((it) => it?.id)?.[0];
      data.filter_types = filter_types;
      dispatch(
        getFolders({
          id: params?.folderId,
          stage: params?.stageId,
          data: data,
        })
      );
      setOpenFolder(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const menuItems = (
    <>
      <MenuItem
        onClick={() => {
          setOpenFolder(true);
        }}
      >
        <ListItemIcon></ListItemIcon>Create Folder
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <label htmlFor="fileupload-mydrive">
          <ListItemIcon></ListItemIcon>Upload File
        </label>
      </MenuItem>
      <input
        type="file"
        id="fileupload-mydrive"
        style={{ display: "none" }}
        multiple
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setUrlBody({
              url: `cdrive/myDriveFileUpload`,
              body: { folder_id: params.folderId },
            });
            setFiles([...e.target.files]);
            setUploadOpen("start");
          }
          e.target.value = null;
        }}
      />
    </>
  );
  const filterleft = (
    <Grid container spacing={2}>
      <Grid item md={4} lg={2}>
        <SearchSelect
          {...formProps}
          name={"file_type"}
          options={filetypes}
          multiple={true}
          // onChange={(e, v) => {
          //   // setValue("file_type");
          // }}
          label={"File type"}
          loading={getClientsLoading}
        />
      </Grid>
      {window.location.pathname.split("/").includes("file-requests") && (
        <Grid item xs={6} lg={2}>
          <Autocomplete
            freeSolo
            size="small"
            control={control}
            name={"email"}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  icon={<></>}
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            value={watch("email") ?? []}
            // multiple
            // inputValue={watch("emailtext")}
            // onInputChange={(e) => setValue("emailtext", e.target.value)}
            onChange={(e, v, reason, detail) => {
              if (!watch("email")?.includes(v)) {
                setValue("email", v);
              }
            }}
            options={[]}
            label={"Email address"}
            renderInput={(params) => (
              <TextField
                label="Select Email"
                // error={errors?.email?.message}
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
      )}
      {!window.location.pathname.split("/").includes("file-requests") && (
        <Grid item md={4} lg={2} key={watch("people_id")}>
          <PeopleSelect
            {...formProps}
            multiple={true}
            name={"people_id"}
            options={getClientsData ?? []}
            keyLabel="name"
            keyValue="id"
            loading={getClientsLoading}
            label={"People"}
          />
        </Grid>
      )}
      <Grid item width={"auto"}>
        <DateFilter
          onChange={(date) => {
            setValue("from_date", date?.startDate);
            setValue("to_date", date?.endDate);
          }}
        />
      </Grid>
      <Grid item width={"auto"}>
        <Button variant="contained" onClick={() => reset({})}>
          Clear
        </Button>
      </Grid>
      {window.location.pathname.split("/").includes("file-requests") && (
        <Grid item width={"auto"}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => setOpenRequest(true)}
          >
            New Request
          </Button>
        </Grid>
      )}
      {window.location.pathname.split("/").includes("my-drive") && (
        <>
          <Grid item width={"auto"}>
            <Actions menuItems={menuItems} label={"NEw"} />
          </Grid>
          <Grid item width={"auto"}>
            <IconButton onClick={() => setOpenFileUpload(true)}>
              <BackupIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
  const filterright = (
    <>
      {/* <Button variant="contained" size="medium">
        + New
      </Button> */}
      {!listView && (
        <IconButton
          size="medium"
          variant="outlined"
          onClick={() => setListView(!listView)}
        >
          <FormatListBulletedIcon />
        </IconButton>
      )}
      {listView && (
        <IconButton
          size="medium"
          variant="outlined"
          onClick={() => setListView(!listView)}
        >
          <GridViewIcon />
        </IconButton>
      )}
    </>
  );
  useEffect(() => {
    dispatch(getClients());
  }, []);
  const fieldDatas = {
    formProps,
    fields: [
      {
        name: "name",
        type: "text",
        label: "Folder Name",
      },
    ],
    onSubmit: handleCreateFolder,
  };
  useEffect(() => {
    let submodule = window.location.pathname.split("/");
    if (submodule.includes("my-drive")) {
      setValue("type", 1);
    }
    if (submodule.includes("archieved")) {
      setValue("type", 2);
    }
    if (submodule.includes("bin")) {
      setValue("type", 3);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    let data = getValues();
    data.file_type = data?.file_type?.map((v) => v?.value);
    // if (window.location.pathname.split("/").includes("my-drive")) {
    //   // data.
    //   data.folder_id = params.folderId;
    //   var filter_types = [];
    //   if (data.people_id) {
    //     filter_types.push("people");
    //   }
    //   if (data.file_type) {
    //     filter_types.push("file");
    //   }
    //   if (data.to_date) {
    //     filter_types.push("date");
    //     data.date_type = "other";
    //   }
    //   data.people_id = data?.people_id?.map((it) => it?.id)?.[0];
    //   data.filter_types = filter_types;
    //   dispatch(
    //     getFolders({
    //       id: params?.folderId,
    //       stage: params?.stageId,
    //       data: data,
    //     })
    //   );

    //   console.log("data", data);
    // }

    // if (window.location.pathname.split("/").includes("file-requests")) {
    //   dispatch(fileRequestFilter(data));
    // }
  }, [
    watch("to_date"),
    watch("file_type"),
    watch("people_id"),
    watch("email"),
    params?.folderId,
  ]);
  useEffect(() => {
    dispatch(getAllFolders());
  }, []);
  return (
    <>
      <HeaderDynamic left={left} />

      {/* <HeaderDynamic left={filterleft} padding={2} right={filterright} /> */}
      <Outlet
        context={{ listView, setListView, openRequest, setOpenRequest }}
      />
      <PopUpForm
        fieldDatas={fieldDatas}
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        loading={newFolderLoading}
      />
      <Box
        position={"absolute"}
        bottom={0}
        sx={{ transform: "translate(-50%,-50%)" }}
        left={"50%"}
      >
        {/* <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{}}
        /> */}
      </Box>
      {/* <FileUploadChunk
        files={watch("files")}
        url={"cdrive/myDriveFileUpload"}
        open={openFileupload}
        onClose={() => setOpenFileUpload(false)}
        onFileSuccess={() => {}}
        onFileError={() => {}}
        onFileProgress={() => {}}
        // body={}
      /> */}
    </>
  );
}
