import StorageChart from "@/components/Drive/StorageChart";
import DriveLayout from "@/layout/DriveLayout";
import API from "@/store/api";
import React from "react";

export default async function page() {
  let storageData = {};
  await API.get("/cdrive/storageDetails")
    .then((data) => (storageData = data))
    .catch((error) => console.log("error", error));
  return (
    <>
      <DriveLayout>
        {" "}
        <StorageChart data={storageData} />
      </DriveLayout>
    </>
  );
}
