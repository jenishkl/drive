import GoBackButton from "@/components/Common/Buttons/GoBackButton";
import LoadingButton from "@/components/Common/Buttons/LoadingButton";
import HeaderDynamic from "@/components/Common/headers/HeaderDynamic";
import {
  TOKEN,
  decriptData,
  file_icon,
  imageTypes,
  imageurl,
} from "@/helpers/utils";
import DriveLayout from "@/layout/DriveLayout";
import API from "@/store/api";
import { Box, Grid, Stack, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React from "react";
import ImageCommon from "@/components/imagecomponent/ImageCommon";
import FileViewer from "@/components/Drive/FileViewer";
import { logo } from "@/helpers/images";
import { LogoIcon } from "@/helpers/icons";
import FileDownLoadButton from "@/components/Drive/FileDownLoad";

export default async function page({ params }) {
  let file_id = decriptData(params?.file);
  var fileData = {};
  await API.get(`/cdrive/viewFile`, { params: { f_id: file_id } })
    .then((d) => (fileData = d))
    .catch(() => {});
  const { status: statuss, data } = fileData || {};
  const File = () => {
    if (statuss == 400) {
      return (
        <center>
          <Typography variant="bold" size={"high"}>
            You have no permission to access this file
          </Typography>
        </center>
      );
    }
    if (statuss == 404) {
      return (
        <center>
          <Typography variant="bold" size={"high"}>
            File Not Found
          </Typography>
        </center>
      );
    }
    if (data?.file_size >= 500000) {
      return (
        <Stack
          direction={"column"}
          gap={2}
          sx={{ p: 10 }}
          alignItems={"center"}
        >
          {file_icon(data?.file_ext ?? data?.file_name?.split(".")[1])}
          <Typography variant="bold" size={"high"}>
            File Size is Large, Cannot View File
          </Typography>

          <FileDownLoadButton
            fileUrl={data?.fileUrl}
            file_name={data?.file_name}
          />
        </Stack>
      );
    }
    if (data?.file_ext == "pdf" || data?.file_name?.split(".")[1] == "pdf") {
      return (
        <>
          <FileViewer
            file={imageurl(data?.file_path)}
            file_name={data?.file_name}
            file_ext={data?.file_ext}
          />
        </>
      );
    } else if (
      imageTypes.includes(data?.file_ext ?? data?.file_name?.split(".")[1])
    )
      return (
        <Stack direction={"row"} width={"100%"} justifyContent={"center"}>
          <Grid container>
            <Grid item xs={12} sm={5} margin={"auto"}>
              <ImageCommon src={imageurl(data?.file_path)} aspectRatio={1} />
            </Grid>
          </Grid>
        </Stack>
      );
    else
      return (
        <Stack
          direction={"column"}
          gap={2}
          sx={{ p: 10 }}
          alignItems={"center"}
        >
          {file_icon(data?.file_ext ?? data?.file_name?.split(".")[1], 60)}
          <Typography variant="bold" size={"high"}>
            Unsupported file type
          </Typography>

          <FileDownLoadButton
            fileUrl={data?.fileUrl}
            file_name={data?.file_name}
          />
        </Stack>
      );
  };
  return (
    <>
      <HeaderDynamic
        sticky={true}
        top={"1px"}
        height={"57px"}
        // top={TOKEN && "57px"}
        left={
          <>
            <Stack
              width={"100%"}
              direction={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack
                direction={"row"}
                ml={2}
                alignItems={"center"}
                width={"200px"}
              >
                {LogoIcon("light")}
                {/* <GoBackButton reversed={false} /> */}
              </Stack>
              <FileDownLoadButton
                fileUrl={data?.fileUrl}
                file_name={data?.file_name}
              />
            </Stack>
          </>
        }
      />
      {<File />}
    </>
  );
}
