import FileRequest from "@/components/Drive/fileRequest/FileRequest";
import DriveLayout from "@/layout/DriveLayout";
import API from "@/store/api";
import React from "react";

export default async function page() {
  let fileRequestData = {};
  let params = {};
  await API.get(`/cdrive/fileRequestTableView`, { params })
    .then((d) => (fileRequestData = d))
    .catch((e) => console.log("e", e));

  return (
    <>
      <DriveLayout>
        <FileRequest fileRequestData={fileRequestData} />
      </DriveLayout>
    </>
  );
}
