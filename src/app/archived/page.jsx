import HeaderDynamic from "@/components/Common/headers/HeaderDynamic";
import DriveFilter from "@/components/Drive/DriveFilter";
import FileCard from "@/components/Drive/FIleCard";
import FolderCard from "@/components/Drive/FolderCard";
import FolderRootView from "@/components/Drive/FolderRootView";
import ListView from "@/components/c-drive/ListView";
import ImageCommon from "@/components/imagecomponent/ImageCommon";
import { emptyFolders } from "@/helpers/images";
import { Each, imageurl } from "@/helpers/utils";
import DriveLayout from "@/layout/DriveLayout";
import API from "@/store/api";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default async function page({ searchParams }) {
  console.log("searchParams", searchParams);

  let params = {
    filter_types: [],
  };

  let driveData = {};
  await API.get(`/cdrive/archiveView`, params)
    .then((d) => (driveData = d))
    .catch((e) => console.log("e", e));
  console.log("driveData", driveData);
  const { folders, files } = driveData || {};
  return (
    <>
      <DriveLayout>
        <FolderRootView />
        <DriveFilter />
        {searchParams?.view != "table" && (
          <>
            <Grid container spacing={4} padding={2}>
              <Each
                of={driveData.folders ?? []}
                render={(it) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                    {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                    <FolderCard
                      detail={it}
                      name={it?.name}
                      id={it?.id}
                      archive={it?.archive}
                      stage={it?.stage}
                      bin={it?.bin}
                      color={it?.folder_color}
                      drive={it?.drive}
                    />
                    {/* </Link> */}
                  </Grid>
                )}
              />
            </Grid>
            <Grid container spacing={4} padding={2}>
              <Each
                of={driveData?.files ?? []}
                render={(it) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
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
                  </Grid>
                )}
              />
            </Grid>{" "}
          </>
        )}
        {!driveData.folders?.[0] && !driveData.files?.[0] && (
          <Grid container>
            <Grid item xs={4} margin={"auto"}>
              <Stack direction={"column"} gap={2} alignItems={"center"}>
                <ImageCommon
                  src={emptyFolders}
                  aspectRatio={1}
                  objectFit="contain"
                />
                <Stack
                  direction={"column"}
                  // gap={1}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <Typography variant="bold" size="large">
                    Drop files here
                  </Typography>
                  <Typography variant="bold" size="large">
                    Or use the ‘New’ button to upload files or folders
                  </Typography>{" "}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        )}
        {searchParams?.view == "table" && (
          <ListView data={[...(folders ?? []), ...(files ?? [])]} />
        )}
      </DriveLayout>
    </>
  );
}
