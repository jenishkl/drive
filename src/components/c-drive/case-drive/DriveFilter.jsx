import React, { useCallback, useContext, useEffect, useState } from "react";
import HeaderDynamic from "../../../components/Common/headers/HeaderDynamic";
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
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
import { getClients } from "../../../store/crm/clients/clientActions";
import { crmClientSelector } from "../../../store/crm/clients/clientSlice";
import { crmEmployeeSelector } from "../../../store/crm/employees/employeeSlice";
import { getAllEmployees } from "../../../store/crm/employees/employeeActions";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const filetypes = [
  { label: "PDF", value: "pdf" },
  { label: "DOC", value: "doc" },
  { label: "Folder", value: "folder" },
  { label: "Document", value: "document" },
  { label: "Image", value: "image" },
  { label: "Spreadsheet", value: "spreadsheet" },
  { label: "Other", value: "other" },
];
export default function DriveFilter({ formProps, listView, setListView }) {
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
  const { getClientsData, getClientsLoading } = useSelector(crmClientSelector);
  const { getAllEmployeesData, getAllEmployeesLoading } =
    useSelector(crmEmployeeSelector);
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
      setValue(`search`, newValue, {
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
  const filterright = (
    <Stack direction={"row"}>
      {/* <Button variant="contained" size="medium">
        + New
      </Button> */}
      <Actions
        icon={<FilterAltIcon />}
        menuItems={filetypes?.map((it) => (
          <MenuItem
            onClick={() => {
              setValue("file_type", it);
            }}
          >
            {it.label}
          </MenuItem>
        ))}
      />
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
    </Stack>
  );
  const filterleft = (
    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
      <Grid container spacing={2}>
        <Grid item md={4} lg={2}>
          <PeopleSelect
            required={"Required"}
            {...formProps}
            multiple
            listcomponent={false}
            name={"people_id"}
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
        <Grid item md={4} lg={2}>
          <StringField
            {...formProps}
            name="searchdebounce"
            onChange={(e) => handleChange(e)}
            //   label={"Search"}
            placeholder="Search"
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
      </Grid>
      {filterright}
    </Stack>
  );

  return (
    <>
      <HeaderDynamic left={filterleft} padding={2} />

      <PopUpForm
        fieldDatas={fieldDatas}
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        loading={newFolderLoading}
      />
    </>
  );
}
