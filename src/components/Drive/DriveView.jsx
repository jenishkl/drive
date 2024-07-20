"use client";
import React from "react";

import dynamic from "next/dynamic";
const DriveFilter = dynamic(() => import("@/components/Drive/DriveFilter"));
const FileCard = dynamic(() => import("@/components/Drive/FIleCard"));
const FolderCard = dynamic(() => import("@/components/Drive/FolderCard"));
const FolderRootView = dynamic(() =>
  import("@/components/Drive/FolderRootView")
);
const ListView = dynamic(() => import("@/components/c-drive/ListView"));
const ImageCommon = dynamic(() =>
  import("@/components/imagecomponent/ImageCommon")
);
import { emptyFolders } from "@/helpers/images";
import { Each, imageurl } from "@/helpers/utils";
const DriveLayout = dynamic(() => import("@/layout/DriveLayout"));
import { Grid, Stack, Typography } from "@mui/material";
export default function DriveView({
  driveData,
  searchParams,
  drive,
  folder_id,
}) {
  const { folders, files } = driveData || {};
  return (
    <>
      <DriveLayout
        folder_details={driveData?.folder_details}
        grand_folder_details={driveData?.grand_folder_details}
      >
        <FolderRootView
          folder_root={driveData["folder_path"]}
          drive={drive}
          folder_id={folder_id}
          grand_folder_details={driveData?.grand_folder_details}
        />

        <DriveFilter
          folder_details={driveData?.folder_details}
          grand_folder_details={driveData?.grand_folder_details}
        />
        {searchParams?.view != "table" && (
          <>
            <Grid container spacing={4} padding={2}>
              <Each
                of={driveData?.folders ?? []}
                render={(it) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
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
                      drive={it?.drive}
                      file_link={it?.file_link}
                      archive={it?.archive}
                      detail={it}
                      file_type={it?.file_ext}
                      file={it?.file_link ?? imageurl(it?.file_path)}
                    />
                  </Grid>
                )}
              />

              {!driveData?.folders?.[0] && !driveData?.files?.[0] && (
                <Grid item xs={4} margin={"auto"}>
                  <Stack direction={"column"} alignItems={"center"}>
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
                      <Typography variant="bold" size="high">
                        Drop files here
                      </Typography>
                      <Typography variant="light" size="small">
                        Or use the ‘New’ button to upload files or folders
                      </Typography>{" "}
                    </Stack>
                  </Stack>
                </Grid>
              )}
            </Grid>
          </>
        )}
        {searchParams?.view == "table" && (
          <ListView data={[...(folders ?? []), ...(files ?? [])]} />
        )}
      </DriveLayout>
    </>
  );
}
