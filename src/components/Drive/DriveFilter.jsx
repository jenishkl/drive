"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

//ICONS
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import UploadIcon from "@mui/icons-material/Upload";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StringField from "../Common/InputFields/StringField";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/layout/GlobalContextProvider";
import { driveSelector } from "@/store/drive/driveSlice";
import { createFolderMyDrive, peoples } from "@/store/drive/driveActions";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { crmClientSelector } from "@/store/crm/clients/clientSlice";
import Actions from "../Common/dropdowns/Actions";
import { USER, decriptData } from "@/helpers/utils";
import HeaderDynamic from"../Common/headers/HeaderDynamic";
import PopUpForm from"../Common/Popups/PopUpForm";
import PeopleSelect from"../Common/InputFields/PeopleSelect";

import { getClients } from "@/store/crm/clients/clientActions";
import { getAllEmployees } from "@/store/crm/employees/employeeActions";
import _ from "lodash";
import FileRequestView from "./fileRequest/FileRequestView";
const filetypes = [
  { label: "PDF", value: "pdf" },
  { label: "DOC", value: "doc" },
  { label: "Folder", value: "folder" },
  { label: "Document", value: "document" },
  { label: "Image", value: "image" },
  { label: "Spreadsheet", value: "spreadsheet" },
  { label: "Other", value: "other" },
];
export default function DriveFilter({
  listView,
  setListView,
  top = "99px",
  people = true,
  file_request = false,
  search = true,
  folder_details,
  storageData,
  grand_folder_details,
  create_new = true,
}) {
  const { control, setValue, watch, getValues, reset } = useForm();
  const formProps = { control, setValue, watch, getValues, reset };
  const pathName = usePathname();
  const sp = useSearchParams();
  const [openRequest, setOpenRequest] = useState();
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
  const router = useRouter();
  var drive = 2;
  var folder_id = 0;
  if (pathName?.split("/")[1] == "my-drive") {
    drive = 2;
    folder_id = 0;
  }
  if (pathName?.split("/")[1] == "work-drive") {
    drive = 1;
    folder_id = 0;
  }
  // if (pathName?.split("/")[1] == "drive") {
  //   folder_id = decriptData(params?.folder)?.split("_")?.[0];
  //   drive = decriptData(params?.folder)?.split("_")?.[1];
  // }

  const [openFolder, setOpenFolder] = useState();
  const {
    createFolderMyDriveLoading,
    createFolderMyDriveData,
    storageDetailsData,
    storageDetailsLoading,
    peoplesData,
    peoplesLoading,
  } = useSelector(driveSelector);
  console.log('peoplesData', peoplesData)
  const handleCreateFolder = async () => {
    try {
      await dispatch(
        createFolderMyDrive({
          name: watch("name"),
          parent_id: folder_id,
          drive: drive,
        })
      ).unwrap();
      toast.success("Folder created successfully");

      setOpenFolder(false);
      router.refresh();
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
        <ListItemIcon>
          <DriveFolderUploadIcon />
        </ListItemIcon>
        Create Folder
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <label htmlFor="fileupload-mydrive" className="row-align-center">
          <ListItemIcon>
            <UploadIcon />
          </ListItemIcon>
          Upload File
        </label>
      </MenuItem>
      <input
        type="file"
        id="fileupload-mydrive"
        style={{ display: "none" }}
        multiple
        onChange={(e) => {
          if (e.target.files?.[0] && !storageDetailsLoading) {
            const size = _.sum([...e.target.files]?.map((it) => it?.size));
            if (size >= storageDetailsData?.freeSpace) {
              return toast.info("InSufficient Storage");
            }
            setUrlBody({
              url: `MyDrive/${grand_folder_details?.created_by ?? USER?.id}/`,
              body: { folder_id: folder_id, myDrive: true },
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
      <Actions
        icon={<FilterAltIcon />}
        menuItems={filetypes?.map((it, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              router.push(`?file_type=${it.value}`);
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
          onClick={() => {
            let view =sp.get(`view`) == "grid" || !sp.get(`view`) ? "table" : "grid";
            router.push(`?view=${view}`);
            // setListView(!listView);
          }}
        >
          <FormatListBulletedIcon />
        </IconButton>
      )}
      {listView && (
        <IconButton
          size="medium"
          variant="outlined"
          onClick={() => {
            let view = sp.get(`view`) == "grid" ? "table" : "grid";
            router.push(`?view=${view}`);
            // setListView(!listView);
          }}
        >
          <GridViewIcon />
        </IconButton>
      )}
    </Stack>
  );
  const filterleft = (
    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
      <Grid container spacing={2}>
        {/* {search && (
          <Grid item xs={12} md={6} lg={2}>
            <StringField
              {...formProps}
              name="searchdebounce"
              endAdornment={<SearchIcon />}
              onChange={(e) => handleChange(e)}
              //   label={"Search"}
              placeholder="Search"
            />
          </Grid>
        )} */}
        {people && (
          <Grid item xs={12} md={6} lg={4}>
            <PeopleSelect
              required={"Required"}
              {...formProps}
              listcomponent={false}
              name={"people_id"}
              label={"People"}
              loading={peoplesLoading}
              keyLabel="name"
              keyValue="id"
              options={[...(peoplesData ?? [])]}
              onChange={(e, v) => {
                router.push(`?people_id=${v?.id ?? ""}`);
              }}
              asyncfunction={(search) => {
                dispatch(peoples({ search }));
              }}
              // options={commonSelectData?.employee}
            />
          </Grid>
        )}
        {/* <Grid item width={"auto"}>
          <DateFilter
            onChange={(date) => {
              setValue("from_date", date?.startDate);
              setValue("to_date", date?.endDate);
            }}
          />
        </Grid> */}
        {sp.get("file_type") && (
          <Grid item width={"auto"}>
            <Button
              variant="outlined"
              onClick={() => router.push(`?file_type=&from_date=&to_date`)}
            >
              Clear
            </Button>
          </Grid>
        )}
        {/* <Grid item width={"auto"}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => setOpenRequest(true)}
          >
            New Request
          </Button>
        </Grid> */}
        <>
          {/* {create_new && (
            <Grid item width={"auto"}>
              <Actions
                menuItems={menuItems}
                label={"New"}
                variant="contained"
                endIcon={<AddIcon />}
              />
            </Grid>
          )} */}
        </>
        {file_request && (
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
      </Grid>
      {filterright}
    </Stack>
  );

  return (
    <>
      <HeaderDynamic left={filterleft} padding={1} sticky={true} top={top} />

      <PopUpForm
        fieldDatas={fieldDatas}
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        loading={createFolderMyDriveLoading}
      />
      {openRequest && (
        <FileRequestView
          open={openRequest}
          handleClose={() => setOpenRequest(null)}
        />
      )}
    </>
  );
}
