import React, { useEffect, useMemo, useState } from "react";
import FolderCard from "../../../components/Drive/FolderCard";
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
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
  shareViewInternal,
  sharedSubFlderView,
} from "../../../store/drive/driveActions";
import FileCard from "../../../components/Drive/FIleCard";
import { decode, imageurl } from "../../../helpers/utils";
import ListView from "../ListView";
import FolderRootView from "../../../components/Drive/FolderRootView";
import ShareFilter from "./SharedFilter";
import { emptyFolders } from "../../../helpers/images";
export default function SharedFiles() {
  const params = useParams();
  const N = useNavigate();
  const dispatch = useDispatch();
  const {
    shareViewInternalData,
    shareViewInternalLoading,
    sharedSubFlderViewData,
  } = useSelector(driveSelector);
  console.log("shareViewInternalData", shareViewInternalData);
  const { control, setValue, handleSubmit, watch, getValues } = useForm();
  const formProps = { control, setValue, watch, handleSubmit };
  const { listView, setListView } = useOutletContext();

  useEffect(() => {
    let data = getValues();
    data.folder_id = params.folderId;
    dispatch(
      shareViewInternal({
        folder_id: decode(params?.folderId),
        drive: decode(params?.driveId),
        file_type: data?.file_type?.value,
        people_id: data?.people_id?.map((it) => ({
          id: it.id,
          is_client: it?.is_client,
        })),
      })
    );
  }, [
    params?.folderId,
    params?.driveId,
    watch("people_id"),
    watch("file_type"),
  ]);

  const folder = useMemo(() => {
    return (
      <>
        {/* FOLDERS */}
        {!shareViewInternalLoading && (
          <Grid container spacing={4} padding={2}>
            {shareViewInternalData?.CaseDriveFolders?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FolderCard
                  detail={it}
                  name={it?.name}
                  id={it?.id}
                  stage={it?.stage}
                  bin={it?.bin}
                  archieve={it?.archieve}
                  drive={1}
                  viewOnly={true}
                />
                {/* </Link> */}
              </Grid>
            ))}
            {shareViewInternalData?.myDriveFolders?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FolderCard
                  url={`/admin/drive/shared-files/${window.btoa(
                    it?.id
                  )}/${window.btoa(2)}`}
                  detail={it}
                  name={it?.name}
                  id={it?.id}
                  stage={it?.stage}
                  bin={it?.bin}
                  archieve={it?.archieve}
                  drive={1}
                  viewOnly={true}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}

        {/* FILES */}
        {!shareViewInternalLoading && (
          <Grid container spacing={4} padding={2}>
            {shareViewInternalData?.CaseDriveFiles?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FileCard
                  name1={it?.file_name}
                  id={it?.id}
                  size={it?.file_size}
                  stage={it?.stage}
                  detail={it}
                  file_type={it?.file_ext}
                  bin={it?.bin}
                  drive={1}
                  archieve={it?.archieve}
                  file={imageurl(it?.file_path)}
                  viewOnly={true}
                />
                {/* </Link> */}
              </Grid>
            ))}
            {shareViewInternalData?.myDriveFiles?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FileCard
                  name1={it?.file_name}
                  id={it?.id}
                  size={it?.file_size}
                  stage={it?.stage}
                  detail={it}
                  file_type={it?.file_ext}
                  bin={it?.bin}
                  drive={2}
                  archieve={it?.archieve}
                  file={imageurl(it?.file_path)}
                  viewOnly={true}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
      </>
    );
  }, [shareViewInternalData, sharedSubFlderViewData]);
  const secondLeft = (
    <>
      <FolderRootView folder_root={[]} drive={"my-drive"} />
    </>
  );
  return (
    <>
      <HeaderDynamic left={secondLeft} />
      <ShareFilter
        formProps={formProps}
        listView={listView}
        setListView={setListView}
      />
      {!listView && shareViewInternalLoading && (
        <>
          <LinearProgress />
        </>
      )}
      {!listView && folder}
      {listView && (
        <ListView
          data={[
            ...(shareViewInternalData?.CaseDriveFolders ?? []),
            ...(shareViewInternalData?.myDriveFolders ?? []),
            ...(shareViewInternalData?.CaseDriveFiles ?? []),
            ...(shareViewInternalData?.myDriveFiles ?? []),
          ]}
          loading={shareViewInternalLoading}
        />
      )}
      {!shareViewInternalLoading &&
        ![
          ...(shareViewInternalData?.CaseDriveFolders ?? []),
          ...(shareViewInternalData?.myDriveFolders ?? []),
          ...(shareViewInternalData?.CaseDriveFiles ?? []),
          ...(shareViewInternalData?.myDriveFiles ?? []),
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
    </>
  );
}
