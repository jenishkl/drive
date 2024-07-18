"use client";

import API from "../api";

export const downloadFZip = async (id, type) => {
  let response = await API.get(`cdrive/downloadFilesAsZip/${id}/${type}`, {
    responseType: "blob",
  });
  const blob = new Blob([response], { type: "application/zip" });

  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = url;

  // Set the filename for the downloaded file
  link.setAttribute("download", "filename.zip");

  // Append the link to the body
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up resources
  window.URL.revokeObjectURL(url);
  return response;
};
export const downloadF = async (id, type) => {
    let response = await API.get(`cdrive/downloadFile/${id}`, {
        responseType: "blob",
      });
      const blob = new Blob([response], { type: "application/zip" });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;

      // Set the filename for the downloaded file
      link.setAttribute("download", "filename.zip");

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up resources
      window.URL.revokeObjectURL(url);
      return response;
};
