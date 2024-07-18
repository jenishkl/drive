import React, { useCallback, useContext, useState } from "react";
import HeaderDynamic from "../../../components/Common/headers/HeaderDynamic";
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchSelect from "../../../components/Common/InputFields/SearchSelect";
import PeopleSelect from "../../../components/Common/InputFields/PeopleSelect";
import DateFilter from "../../../components/Common/InputFields/DateFilter";
import Actions from "../../../components/Common/dropdowns/Actions";
import { GlobalContext } from "../../../App";

//ICONS
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PopUpForm from "../../../components/Common/Popups/PopUpForm";
import { useDispatch, useSelector } from "react-redux";
import { driveSelector } from "../../../store/drive/driveSlice";
import { toast } from "sonner";
import { newFolder } from "../../../store/drive/driveActions";
import { useParams } from "react-router-dom";
import StringField from "../../../components/Common/InputFields/StringField";

const filetypes = [
  { label: "PDF", value: "pdf" },
  { label: "DOC", value: "doc" },
  { label: "Folder", value: "folder" },
  { label: "Document", value: "document" },
  { label: "Image", value: "image" },
  { label: "Spreadsheet", value: "spreadsheet" },
  { label: "Other", value: "other" },
];
export default function FileRequestFilter({
  formProps,
  listView,
  setListView,
  openRequest,
  setOpenRequest,
}) {
  const { control, setValue, watch, getValues, reset } = formProps;
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
  const dispatch = useDispatch();
  const params = useParams();
  const [openFolder, setOpenFolder] = useState();
  const { newFolderLoading, newFolderData } = useSelector(driveSelector);
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
      setOpenFolder(false);
    } catch (error) {
      console.log("error", error);
    }
  };
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

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedOnChange = useCallback(
    debounce((newValue, index, i, type) => {
      //   const amount =
      //     parseInt(newValue) *
      //     watch(`facility_list.[${index}].bill_service.[${i}].${[type]}`);
      setValue(`email`, newValue, {
        shouldValidate: true,
      });
      console.log("newValue", newValue);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    debouncedOnChange(newValue);
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
          //   loading={getClientsLoading}
        />
      </Grid>
      <Grid item md={4} lg={2} key={watch("people_id")}>
        <StringField
          {...formProps}
          name="searchdebounce"
          onChange={(e) => handleChange(e)}
          //   label={"Search"}
          placeholder="Search Email"
        />
      </Grid>

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

      <Grid item width={"auto"}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => setOpenRequest(true)}
        >
          New Request
        </Button>
      </Grid>
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
          //   onClick={() => setListView(!listView)}
        >
          <FormatListBulletedIcon />
        </IconButton>
      )}
      {listView && (
        <IconButton
          size="medium"
          variant="outlined"
          //   onClick={() => setListView(!listView)}
        >
          <GridViewIcon />
        </IconButton>
      )}
    </>
  );
  return (
    <>
      <HeaderDynamic left={filterleft} padding={2} right={filterright} />

      <PopUpForm
        fieldDatas={fieldDatas}
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        loading={newFolderLoading}
      />
    </>
  );
}
