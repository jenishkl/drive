import React, { useEffect, useMemo, useState } from "react";
import FolderCard from "../../../components/Drive/FolderCard";
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Pagination,
  Stack,
} from "@mui/material";
import HeaderDynamic from "../../../components/Common/headers/HeaderDynamic";
import { useForm } from "react-hook-form";
import SelectField from "../../../components/Common/InputFields/SelectField";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Link from "../../../components/Common/Link/Link";
import { useDispatch, useSelector } from "react-redux";
import { driveSelector } from "../../../store/drive/driveSlice";
import { getFolders, newFolder } from "../../../store/drive/driveActions";
import FileCard from "../../../components/Drive/FIleCard";
import { Each, imageurl } from "../../../helpers/utils";
import DriveFilter from "./DriveFilter";
import { toast } from "sonner";
import FolderRootView from "../../../components/Drive/FolderRootView";
import ListView from "../ListView";
import { emptyFolders } from "../../../helpers/images";
export default function FolderView() {
  const params = useParams();
  const N = useNavigate();
  const dispatch = useDispatch();
  const {
    getFoldersData,
    getFoldersLoading,
    newFolderData,
    fileBinAndArchieveData,
    getTempFileData,
    moveFileData,
    copyFileData,
    moveFolderData,
    copyFolderData,
  } = useSelector(driveSelector);
  const { control, setValue, watch, getValues, reset } = useForm({
    defaultValues: {
      date_type: "other",
      type: 1,
      pageNumber: 1,
    },
  });
  const formProps = { control, setValue, watch, getValues, reset };
  const [listView, setListView] = useState();
  const [slug, setSlug] = useState(0);

  useEffect(() => {
    if ([undefined, null]?.includes(params?.folderId)) {
      N(`/admin/drive/case-drive/0/0`);
    }
    return () => {};
  }, []);

  useEffect(() => {
    let data = getValues();
    data.file_type = data?.file_type?.value;
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
    if (params.folderId != undefined && params.folderId != null) {
      dispatch(
        getFolders({
          id: params?.folderId,
          stage: params?.stageId,
          data: data,
        })
      );
    }
  }, [
    watch("to_date"),
    watch("file_type"),
    watch("people_id"),
    watch("email"),
    watch("search"),
    watch("pageNumber"),
    params?.folderId,
    newFolderData,
    fileBinAndArchieveData,
    getTempFileData,
    moveFileData,
    copyFileData,
    moveFolderData,
    copyFolderData,
  ]);

  const folder = useMemo(() => {
    return (
      <>
        {!getFoldersLoading && (
          <Grid container spacing={4} padding={2}>
            <Each
              of={getFoldersData?.CaseDriveList ?? []}
              render={(it) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                  {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                  <FolderCard
                    detail={it}
                    name={it?.name}
                    id={it?.id}
                    stage={it?.stage}
                    bin={0}
                    drive={1}
                  />
                  {/* </Link> */}
                </Grid>
              )}
            />
          </Grid>
        )}
        {!getFoldersLoading && (
          <Grid container spacing={4} padding={2}>
            <Each
              of={getFoldersData?.CaseFileList ?? []}
              render={(it) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                  {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                  <FileCard
                    name1={it?.file_name}
                    id={it?.id}
                    size={it?.file_size}
                    stage={it?.stage}
                    bin={it?.bin}
                    drive={1}
                    archive={it?.archive}
                    detail={it}
                    file_type={it?.file_ext}
                    file={imageurl(it?.file_path)}
                  />
                  {/* </Link> */}
                </Grid>
              )}
            />
          </Grid>
        )}
      </>
    );
  }, [getFoldersData]);

  // const handleCreateFolder = async () => {
  //   try {
  //     await dispatch(
  //       newFolder({
  //         name: watch("name"),
  //         parent_id: params?.folderId,
  //         stage: params?.stageId,
  //       })
  //     ).unwrap();
  //     toast.success("Folder created successfully");
  //     setOpenFolder(false);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  const secondLeft = (
    <>
      <FolderRootView
        folder_root={getFoldersData?.folder_path}
        drive={"case-drive"}
      />
    </>
  );
  return (
    <>
      <HeaderDynamic left={secondLeft} />
      <DriveFilter
        formProps={formProps}
        listView={listView}
        setListView={setListView}
      />

      {!listView && getFoldersLoading && (
        <>
          <LinearProgress />
        </>
      )}
      {!listView && folder}
      {listView && (
        <ListView
          data={[
            ...getFoldersData?.CaseDriveList,
            ...getFoldersData?.CaseFileList,
          ]}
          loading={getFoldersLoading}
        />
      )}
      {!getFoldersLoading &&
        ![
          ...(getFoldersData?.CaseDriveList ?? []),
          ...(getFoldersData?.CaseFileList ?? []),
        ]?.[0] && (
          <Stack
            mt={2}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img src={emptyFolders} alt="" />
          </Stack>
        )}
      <Box
        position={"absolute"}
        bottom={0}
        sx={{ transform: "translate(-50%,-50%)" }}
        left={"50%"}
        key={getFoldersData?.CaseFileList?.current_page}
      >
        {/* <Pagination
          count={getFoldersData?.CaseFileList?.last_page}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          page={getFoldersData?.CaseFileList?.current_page}
          // onClick={(e, v) => alert('')}
          onChange={(e, v) => {
            setValue("pageNumber", v);
            console.log("v", v);
          }}
          color="primary"
          sx={{}}
        /> */}
      </Box>
    </>
  );
}
