import React from "react";
// import DriveFilter from "@/components/Drive/DriveFilter";
// import FileCard from "@/components/Drive/FIleCard";
// import FolderCard from "@/components/Drive/FolderCard";
// import FolderRootView from "@/components/Drive/FolderRootView";
// import ListView from "@/components/c-drive/ListView";
// import ImageCommon from "@/components/imagecomponent/ImageCommon";
// import { emptyFolders } from "@/helpers/images";
// import { Each, imageurl } from "@/helpers/utils";
// import DriveLayout from "@/layout/DriveLayout";
// import API from "@/store/api";
import { Grid, Stack, Typography } from "@mui/material";
import DriveLayout from "@/layout/DriveLayout";

// export const dynamic = "force-dynamic";
export default function page() {
  // const folder = params?.file;
  // let folder_id = folder?.split("_")?.[0];
  // let drive = folder?.split("_")?.[1];
  let param = {
    // folder_id,
    // drive,
    // file_type: searchParams?.file_type,
  };

  let driveData = {};
  // await API.get(`/cdrive/driveView/`, {
  //   params: param,
  // })
  //   .then((d) => (driveData = d))
  //   .catch((e) => console.log("e", e));
  // const { folders, files } = driveData || {};
  return (
    <>
      <DriveLayout
        // folder_details={driveData?.folder_details}
        // grand_folder_details={driveData?.grand_folder_details}
      >
        <h1>sssssssss</h1>
      {/* <FolderRootView
          folder_root={driveData["folder_path"]}
          drive={drive}
          folder_id={folder_id}
          grand_folder_details={driveData?.grand_folder_details}
        /> */}

      {/* <DriveFilter
          folder_details={driveData?.folder_details}
          grand_folder_details={driveData?.grand_folder_details}
        /> */}

      {/* {searchParams?.view == "table" && (
          <ListView data={[...(folders ?? []), ...(files ?? [])]} />
        )} */}
      </DriveLayout>
    </>
  );
}
