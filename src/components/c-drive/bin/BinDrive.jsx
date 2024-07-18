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
import { binView, getFolders } from "../../../store/drive/driveActions";
import FileCard from "../../../components/Drive/FIleCard";
import { imageurl } from "../../../helpers/utils";
import BinFilter from "./BinFilter";
import { emptyFolders } from "../../../helpers/images";
import ListView from "../ListView";
export default function BinDrive() {
  const params = useParams();
  const N = useNavigate();
  const dispatch = useDispatch();
  const {
    binViewData,
    binViewLoading,
    deleteFolderData,
    deleteFolderLoading,
    deleteFileData,
    fileBinAndArchieveData,
    folderBinAndArchieveData,
  } = useSelector(driveSelector);
  console.log("binViewData", binViewData);
  const { control, setValue, watch, getValues } = useForm({
    defaultValues: {
      filter_types: [],
      type: 3,
    },
  });
  const formProps = { control, setValue, watch, getValues };
  const [listView, setListView] = useState(false);
  const [slug, setSlug] = useState(0);

  const folder = useMemo(() => {
    return (
      <>
        {!binViewLoading && (
          <Grid container spacing={4} padding={2}>
            {binViewData?.BinFolder?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FolderCard
                  name={it?.name}
                  id={it?.id}
                  stage={it?.stage}
                  bin={1}
                  drive={1}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
        {!binViewLoading && (
          <Grid container spacing={4} padding={2}>
            {binViewData?.BinFile?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FileCard
                  name1={it?.file_name}
                  id={it?.id}
                  size={it?.file_size}
                  stage={it?.stage}
                  bin={1}
                  detail={it}
                  archieve={1}
                  file_type={it?.file_ext}
                  file={imageurl(it?.file_path)}
                  drive={1}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
        {!binViewLoading && (
          <Grid container spacing={4} padding={2}>
            {binViewData?.BinMyFolder?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FolderCard
                  name={it?.name}
                  id={it?.id}
                  stage={it?.stage}
                  bin={1}
                  drive={2}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
        {!binViewLoading && (
          <Grid container spacing={4} padding={2}>
            {binViewData?.BinMyFile?.map((it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FileCard
                  name1={it?.file_name}
                  id={it?.id}
                  size={it?.file_size}
                  stage={it?.stage}
                  bin={1}
                  detail={it}
                  archieve={1}
                  file_type={it?.file_ext}
                  file={imageurl(it?.file_path)}
                  drive={2}
                />
                {/* </Link> */}
              </Grid>
            ))}
          </Grid>
        )}
      </>
    );
  }, [binViewData]);

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

    dispatch(binView({ params: data }));
  }, [
    watch("to_date"),
    watch("file_types"),
    watch("people_id"),
    watch("email"),
    watch("search"),
    watch("pageNumber"),
    params?.folderId,
    deleteFolderData,
    deleteFileData,
    folderBinAndArchieveData,
  ]);
  return (
    <>
      <BinFilter
        formProps={formProps}
        listView={listView}
        setListView={setListView}
      />
      {/* <HeaderDynamic left={left} padding={2} right={right} /> */}
      {(deleteFolderLoading || binViewLoading) && <LinearProgress />}

      {!binViewData && !binViewLoading && (
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
      {!listView && folder}
      {listView && (
        <ListView
          data={[
            ...(binViewData?.BinMyFile ?? []),
            ...(binViewData?.BinMyFolder ?? []),
            ...(binViewData?.BinFile ?? []),
            ...(binViewData?.BinFolder ?? []),
          ]}
          loading={binViewLoading}
        />
      )}
      {!binViewLoading &&
        ![
          ...(binViewData?.BinMyFile ?? []),
          ...(binViewData?.BinMyFolder ?? []),
          ...(binViewData?.BinFile ?? []),
          ...(binViewData?.BinFolder ?? []),
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
