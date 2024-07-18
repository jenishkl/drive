import React, { useEffect, useMemo, useState } from "react";
import FolderCard from "../../../components/Drive/FolderCard";
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import HeaderDynamic from "../../../components/Common/headers/HeaderDynamic";
import { useForm } from "react-hook-form";
import SelectField from "../../../components/Common/InputFields/SelectField";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate, useParams } from "react-router-dom";
import Link from "../../../components/Common/Link/Link";
import { useDispatch, useSelector } from "react-redux";
import { driveSelector } from "../../../store/drive/driveSlice";
import { archieveView, getFolders } from "../../../store/drive/driveActions";
import FileCard from "../../../components/Drive/FIleCard";
import { imageurl } from "../../../helpers/utils";
import ArchiveFilter from "./ArchiveFilter";
import { emptyFolders } from "../../../helpers/images";
import ListView from "../ListView";
export default function ArchiveDrive() {
  const params = useParams();
  const N = useNavigate();
  const dispatch = useDispatch();
  const {
    archieveViewData,
    archieveViewLoading,
    fileBinAndArchieveData,
    folderBinAndArchieveData,
  } = useSelector(driveSelector);
  const { control, setValue, watch, getValues } = useForm({
    defaultValues: {
      filter_types: [],
      type: 2,
    },
  });
  const formProps = { control, setValue, watch, getValues };
  const [listView, setListView] = useState(false);
  const [slug, setSlug] = useState(0);

  useEffect(() => {
    let data = getValues();
    data.file_types = data?.file_types?.map((v) => v?.value);
    // data.folder_id = params.folderId;
    var filter_types = [];
    // if (data.people_id) {
    //   filter_types.push("people");
    // }
    if (data.file_types) {
      filter_types.push("file");
    }
    if (data.to_date) {
      filter_types.push("date");
      data.date_type = "other";
    }
    // data.people_id = data?.people_id?.map((it) => it?.id)?.[0];
    data.filter_types = filter_types;

    dispatch(archieveView({ params: data }));
  }, [
    watch("to_date"),
    watch("file_types"),
    watch("people_id"),
    watch("email"),
    watch("search"),
    watch("pageNumber"),
    params?.folderId,
    fileBinAndArchieveData,
    folderBinAndArchieveData,
  ]);
  const folder = useMemo(() => {
    return (
      <>
        {!archieveViewLoading && (
          <Grid container spacing={4} padding={2}>
            {archieveViewData?.ArchiveFolders?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FolderCard
                  name={it?.name}
                  id={it?.id}
                  stage={it?.stage}
                  bin={0}
                  detail={it}
                  drive={1}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
        {!archieveViewLoading && (
          <Grid container spacing={4} padding={2}>
            {archieveViewData?.ArchiveFiles?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FileCard
                  name1={it?.file_name}
                  id={it?.id}
                  size={it?.file_size}
                  stage={it?.stage}
                  bin={0}
                  file_type={it?.file_ext}
                  archieve={0}
                  detail={it}
                  file={imageurl(it?.file_path)}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
        {!archieveViewLoading && (
          <Grid container spacing={4} padding={2}>
            {archieveViewData?.archiveMyFolder?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FolderCard
                  name={it?.name}
                  id={it?.id}
                  stage={it?.stage}
                  bin={0}
                  detail={it}
                  drive={2}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
        {!archieveViewLoading && (
          <Grid container spacing={4} padding={2}>
            {archieveViewData?.archiveMyFile?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FileCard
                  name1={it?.file_name}
                  id={it?.id}
                  size={it?.file_size}
                  stage={it?.stage}
                  bin={0}
                  file_type={it?.file_ext}
                  archieve={0}
                  detail={it}
                  file={imageurl(it?.file_path)}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
      </>
    );
  }, [archieveViewData, folderBinAndArchieveData]);
  return (
    <>
      <ArchiveFilter
        formProps={formProps}
        listView={listView}
        setListView={setListView}
      />
      {archieveViewLoading && <LinearProgress />}
      {!listView && folder}

      {!archieveViewData && !archieveViewLoading && (
        <Stack
          style={{ height: "50vh" }}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="light" size="high">
            No Data
          </Typography>
        </Stack>
      )}
      {listView && (
        <ListView
          data={[
            ...(archieveViewData?.archiveMyFile ?? []),
            ...(archieveViewData?.archiveMyFolder ?? []),
            ...(archieveViewData?.ArchiveFiles ?? []),
            ...(archieveViewData?.ArchiveFolders ?? []),
          ]}
          loading={archieveViewLoading}
        />
      )}
      {!archieveViewLoading &&
        ![
          ...(archieveViewData?.archiveMyFile ?? []),
          ...(archieveViewData?.archiveMyFolder ?? []),
          ...(archieveViewData?.ArchiveFiles ?? []),
          ...(archieveViewData?.ArchiveFolders ?? []),
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
