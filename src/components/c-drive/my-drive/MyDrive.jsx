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
import {
  getFolders,
  myDriveView,
  createFolderMyDrive,
} from "../../../store/drive/driveActions";
import FileCard from "../../../components/Drive/FIleCard";
import { Each, imageurl } from "../../../helpers/utils";
import DriveFilter from "./DriveFilter";
import { toast } from "sonner";
import FolderRootView from "../../../components/Drive/FolderRootView";
import ListView from "../ListView";
import DragSelect from "./DragSelect";
import { emptyFolders } from "../../../helpers/images";
export default function MyDrive() {
  const params = useParams();
  const N = useNavigate();
  const dispatch = useDispatch();
  const [listView, setListView] = useState(false);
  const {
    myDriveViewData,
    myDriveViewLoading,
    createFolderMyDriveData,
    fileBinAndArchieveData,
    folderBinAndArchieveData,
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

  useEffect(() => {
    if ([undefined, null]?.includes(params?.folderId)) {
      N(`/admin/drive/my-drive/0/0`);
    }
    return () => {};
  }, []);

  useEffect(() => {
    let data = getValues();
    data.file_type = data?.file_type?.value;
    data.folder_id = params.folderId;
    var filter_types = [];

    if (data.file_types) {
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
        myDriveView({
          folderId: params?.folderId,
          data: data,
        })
      );
    }
  }, [
    watch("to_date"),
    watch("file_type"),
    // watch("people_id"),
    watch("search"),
    watch("pageNumber"),
    params?.folderId,
    createFolderMyDriveData,
    fileBinAndArchieveData,
    folderBinAndArchieveData,
    getTempFileData,
    moveFileData,
    copyFileData,
    moveFolderData,
    copyFolderData,
  ]);

  const folder = useMemo(() => {
    return (
      <>
        {!myDriveViewLoading && (
          <Grid container spacing={4} padding={2}>
            <Each
              of={myDriveViewData?.myDriveFolder ?? []}
              render={(it) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                  {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                  <FolderCard
                    detail={it}
                    name={it?.name}
                    id={it?.id}
                    stage={it?.stage}
                    bin={0}
                    drive={2}
                  />
                  {/* </Link> */}
                </Grid>
              )}
            />
          </Grid>
        )}
        {!myDriveViewLoading && (
          <Grid container spacing={4} padding={2}>
            <Each
              of={myDriveViewData?.myDriveFiles?.data ?? []}
              render={(it) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                  {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                  <FileCard
                    name1={it?.file_name}
                    id={it?.id}
                    size={it?.file_size}
                    stage={it?.stage}
                    bin={it?.bin}
                    drive={2}
                    file_link={it?.file_link}
                    archive={it?.archive}
                    detail={it}
                    file_type={it?.file_ext}
                    file={it?.file_link ?? imageurl(it?.file_path)}
                  />
                  {/* </Link> */}
                </Grid>
              )}
            />
          </Grid>
        )}
      </>
    );
  }, [myDriveViewData]);

  // const handleCreateFolder = async () => {
  //   try {
  //     await dispatch(
  //       createFolderMyDrive({
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
        folder_root={myDriveViewData?.folder_path}
        drive={"my-drive"}
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

      {/* <DragSelect/> */}
      {!listView && myDriveViewLoading && (
        <>
          <LinearProgress />
        </>
      )}
      {!listView && folder}
      {listView && (
        <ListView
          data={[
            ...myDriveViewData?.myDriveFolder,
            ...myDriveViewData?.myDriveFiles?.data,
          ]}
          loading={myDriveViewLoading}
        />
      )}
      {!myDriveViewLoading &&
        ![
          ...(myDriveViewData?.myDriveFolder ?? []),
          ...(myDriveViewData?.myDriveFiles?.data ?? []),
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
        key={myDriveViewData?.myDriveFiles?.current_page}
      >
        {/* <Pagination
          count={myDriveViewData?.myDriveFiles?.last_page}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          page={myDriveViewData?.myDriveFiles?.current_page}
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
