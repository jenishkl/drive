import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { get } from "lodash";
import {
  archieveFolderView,
  archieveView,
  asignProject,
  binView,
  changeAccessLevel,
  checkPassword,
  chooseColor,
  chooseFolder,
  copyFile,
  copyFolder,
  createFolderMyDrive,
  deleteFile,
  deleteFolder,
  deleteTempFile,
  downloadFile,
  downloadFileZip,
  fileBinAndArchieve,
  fileDetails,
  fileRequest,
  fileRequestFilter,
  fileUploadTemp,
  folderBinAndArchieve,
  folderDetails,
  folderRoot,
  getAllFolders,
  getFileAccess,
  getFileRequest,
  getFolderFilter,
  getFolders,
  getSingleFileRequest,
  getSubmiterFiles,
  getSubmitters,
  getTempFile,
  moveFile,
  moveFolder,
  myDriveView,
  newFolder,
  peoples,
  publicFilePasswordCheck,
  publicFileView,
  removeSharedUser,
  removeSubmitterAndChangeStatus,
  renameFolder,
  searchFolderFile,
  shareFileExternal,
  shareFileInternal,
  shareViewInternal,
  sharedPeoples,
  sharedSubFlderView,
  storageDetails,
  submitterDeleteFile,
  updateFileRequest,
  uploadFile,
  uploadFileViaDrive,
  uploadFileViaDropBox,
  viewFile,
} from "./driveActions";

let initialState = {};

const actions = [
  {
    api: getFolders,
    name: "getFolders",
  },
  {
    api: folderBinAndArchieve,
    name: "folderBinAndArchieve",
  },
  {
    api: getAllFolders,
    name: "getAllFolders",
  },
  {
    api: fileRequest,
    name: "fileRequest",
  },
  {
    api: checkPassword,
    name: "checkPassword",
  },
  {
    api: getFileRequest,
    name: "getFileRequest",
  },
  {
    api: uploadFile,
    name: "uploadFile",
  },
  {
    api: fileBinAndArchieve,
    name: "fileBinAndArchieve",
  },
  {
    api: binView,
    name: "binView",
  },
  {
    api: archieveFolderView,
    name: "archieveFolderView",
  },
  {
    api: archieveView,
    name: "archieveView",
  },
  {
    api: updateFileRequest,
    name: "updateFileRequest",
  },
  {
    api: removeSubmitterAndChangeStatus,
    name: "removeSubmitterAndChangeStatus",
  },
  {
    api: getSubmitters,
    name: "getSubmitters",
  },
  {
    api: getSingleFileRequest,
    name: "getSingleFileRequest",
  },
  {
    api: shareFileInternal,
    name: "shareFileInternal",
  },
  {
    api: shareFileExternal,
    name: "shareFileExternal",
  },
  {
    api: shareViewInternal,
    name: "shareViewInternal",
  },
  {
    api: getFolderFilter,
    name: "getFolderFilter",
  },
  {
    api: publicFileView,
    name: "publicFileView",
  },
  {
    api: publicFilePasswordCheck,
    name: "publicFilePasswordCheck",
  },
  {
    api: submitterDeleteFile,
    name: "submitterDeleteFile",
  },
  {
    api: downloadFileZip,
    name: "downloadFileZip",
  },
  {
    api: sharedSubFlderView,
    name: "sharedSubFlderView",
  },
  {
    api: newFolder,
    name: "newFolder",
  },
  {
    api: deleteFolder,
    name: "deleteFolder",
  },
  {
    api: deleteFile,
    name: "deleteFile",
  },
  {
    api: fileUploadTemp,
    name: "fileUploadTemp",
  },
  {
    api: getTempFile,
    name: "getTempFile",
  },
  {
    api: deleteTempFile,
    name: "deleteTempFile",
  },
  {
    api: fileRequestFilter,
    name: "fileRequestFilter",
  },
  {
    api: folderDetails,
    name: "folderDetails",
  },
  {
    api: moveFile,
    name: "moveFile",
  },
  {
    api: moveFolder,
    name: "moveFolder",
  },
  {
    api: copyFolder,
    name: "copyFolder",
  },
  {
    api: copyFile,
    name: "copyFile",
  },
  {
    api: myDriveView,
    name: "myDriveView",
  },
  {
    api: createFolderMyDrive,
    name: "createFolderMyDrive",
  },
  {
    api: chooseFolder,
    name: "chooseFolder",
  },
  {
    api: getSubmiterFiles,
    name: "getSubmiterFiles",
  },
  {
    api: sharedPeoples,
    name: "sharedPeoples",
  },
  {
    api: removeSharedUser,
    name: "removeSharedUser",
  },
  {
    api: fileDetails,
    name: "fileDetails",
  },
  {
    api: viewFile,
    name: "viewFile",
  },
  {
    api: asignProject,
    name: "asignProject",
  },
  {
    api: chooseColor,
    name: "chooseColor",
  },
  {
    api: renameFolder,
    name: "renameFolder",
  },
  {
    api: downloadFile,
    name: "downloadFile",
  },
  {
    api: changeAccessLevel,
    name: "changeAccessLevel",
  },
  {
    api: uploadFileViaDrive,
    name: "uploadFileViaDrive",
  },
  {
    api: uploadFileViaDropBox,
    name: "uploadFileViaDropBox",
  },
  {
    api: getFileAccess,
    name: "getFileAccess",
  },
  {
    api: storageDetails,
    name: "storageDetails",
  },
  {
    api: folderRoot,
    name: "folderRoot",
  },
  {
    api: searchFolderFile,
    name: "searchFolderFile",
  },
  {
    api: peoples,
    name: "peoples",
  },
];

actions.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

const driveSlice = createSlice({
  name: "driveSlice",
  initialState,
  extraReducers: (builder) => {
    actions.forEach((cases) => {
      builder
        .addCase(cases.api.fulfilled, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].data = payload ?? null;
          state[cases.name].error = null;
        })
        .addCase(cases.api.pending, (state) => {
          // if (state[cases.name]?.data?.data?.[0]) {
          // state[cases.name].loading = false;
          // } else
          state[cases.name].loading = true;
          state[cases.name].error = null;
          //   state[cases.name].data = null;
        })
        .addCase(cases.api.rejected, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].error = payload;
          state[cases.name].data = null;
        });
    });
  },
});

const getLoadingState = (actionName) => (state) =>
  state.drive[actionName]?.loading;
const getDataState = (actionName) => (state) => {
  if (
    [
      "checkPassword",
      "getAllFolders",
      "publicFilePasswordCheck",
      "folderDetails",
      "newFolder",
      "fileBinAndArchieve",
      "createFolderMyDrive",
      "folderBinAndArchieve",
      "moveFile",
      "publicFileView",
      "viewFile",
      "getFileAccess",
      "storageDetails",
      "folderRoot",
      "searchFolderFile",
      "peoples",
    ].includes(actionName)
  ) {
    return state.drive[actionName]?.data;
  }
  return state.drive[actionName]?.data?.data;
};
export const driveSelector = createSelector(
  (state) => state,
  (state) => {
    let result = actions.reduce((acc, action) => {
      const loadingSelector = getLoadingState(action.name)(state);
      const dataSelector = getDataState(action.name)(state);

      acc[`${action.name}Loading`] = loadingSelector;
      acc[`${action.name}Data`] = dataSelector;

      return acc;
    }, {});

    return result;
  }
);

export default driveSlice.reducer;
