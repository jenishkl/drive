import HeaderDynamic from "@/components/Common/headers/HeaderDynamic";
import DriveFilter from "@/components/Drive/DriveFilter";
import FileCard from "@/components/Drive/FIleCard";
import FolderCard from "@/components/Drive/FolderCard";
import FolderRootView from "@/components/Drive/FolderRootView";
import { Each, imageurl } from "@/helpers/utils";
import DriveLayout from "@/layout/DriveLayout";
import API from "@/store/api";
import { Grid } from "@mui/material";
import React from "react";

export default async function page({}) {
  let params = {
    folder_id: 0,
  };

  let driveData = {};
  await API.get(`/cdrive/caseDriveView2/`, {
    params,
  })
    .then((d) => (driveData = d))
    .catch((e) => console.log("e", e));
  console.log("driveData", driveData);
  return (
    <>
      <DriveLayout>
        <HeaderDynamic left={<FolderRootView folder_root={driveData.folder_root}/>} />
        <DriveFilter />
        <Grid container spacing={4} padding={2}>
          <Each
            of={driveData?.folders ?? []}
            render={(it) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
                {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                <FolderCard
                  detail={it}
                  name={it?.name}
                  id={it?.id}
                  stage={it?.stage}
                  bin={0}
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
        </Grid>
      </DriveLayout>
    </>
  );
}
