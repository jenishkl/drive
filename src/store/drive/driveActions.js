import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { getSessionStorage } from "../../helpers/utils";
import { SESSION } from "../../helpers/localSessions";
import { downloadF, downloadFZip } from "./downloadFile";

//GET FOLDERS
export const getFolders = createAsyncThunk(
  "getFolders",
  async ({ id, stage, data }, thunkAPI) => {
    try {
      let res = await API.put(`/cdrive/caseDriveView/${id}/${stage}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET FOLDERS
export const getFolderFilter = createAsyncThunk(
  "getFolderFilter",
  async (data, thunkAPI) => {
    try {
      let res = await API.put(`/cdrive/combinedFilter`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET BIN FOLDERS AND FILES
export const binView = createAsyncThunk(
  "binView",
  async ({ params } = {}, thunkAPI) => {
    try {
      let res = await API.put(`/cdrive/binView`, params);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//GET ARCHIEVE FOLDERS AND FILES
export const archieveView = createAsyncThunk(
  "archieveView",
  async ({ params } = {}, thunkAPI) => {
    try {
      let res = await API.put(`/cdrive/archiveView`, params);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//GET ARCHIEVE FOLDERS AND FILES
export const archieveFolderView = createAsyncThunk(
  "archieveFolderView",
  async ({ id } = {}, thunkAPI) => {
    try {
      let res = await API.get(`cdrive/archiveListView/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//BIN ARCHIEVE FOLDERS
export const folderBinAndArchieve = createAsyncThunk(
  "folderBinAndArchieve",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/folderBinArchive`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//BIN AND ARCHIEVE FILES
export const fileBinAndArchieve = createAsyncThunk(
  "fileBinAndArchieve",
  async ({ id, type, updateType, drive, data }, thunkAPI) => {
    try {
      let res = await API.post(
        `/cdrive/fileBinArchive`,
        {},
        {
          params: { id, type, updateType, drive },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// //BIN VIEW

// export const binView = createAsyncThunk("binView", async ({ id }, thunkAPI) => {
//   try {
//     let res = await API.get(`/cdrive/binView`);
//     return res;
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.rejectWithValue(error);
//   }
// });

//FOLDERS

export const getAllFolders = createAsyncThunk(
  "getAllFolders",
  async (id, thunkAPI) => {
    try {
      let res = await API.get(`/cdrive/chooseFolder`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//CHOOSE FOLDERS

export const chooseFolder = createAsyncThunk(
  "chooseFolder",
  async (table, thunkAPI) => {
    try {
      let res = await API.get(`/cdrive/moveChooseFolder/${table}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET FILE REQUEST
export const getFileRequest = createAsyncThunk(
  "getFileRequest",
  async (data, thunkAPI) => {
    try {
      let res = await API.get(`/cdrive/fileRequestTableView`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET FILE REQUEST SINGLE
export const getSingleFileRequest = createAsyncThunk(
  "getSingleFileRequest",
  async ({ id }, thunkAPI) => {
    try {
      let res = await API.get(`/cdrive/fileRequestSingleView/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//FILE REQUEST
export const fileRequest = createAsyncThunk(
  "fileRequest",
  async (data, thunkAPI) => {
    try {
      let res = await API.put(`/cdrive/fileRequest`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//SHARE FILE INTERNAL
export const shareFileInternal = createAsyncThunk(
  "shareFileInternal",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/shareInternal`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//SHARE FILE EXTERNAL
export const shareFileExternal = createAsyncThunk(
  "shareFileExternal",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/shareExternal`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//SHAREFOLDERS AND FILES
export const shareViewInternal = createAsyncThunk(
  "shareViewInternal",
  async (params, thunkAPI) => {
    try {
      let res = await API.get(`/cdrive/shareViewInternal`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//UPDATE FILE REQUEST
export const updateFileRequest = createAsyncThunk(
  "updateFileRequest",
  async (data, thunkAPI) => {
    try {
      let res = await API.put(`cdrive/fileRequestUpdate`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//CHECK PASSWORD

export const checkPassword = createAsyncThunk(
  "checkPassword",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/link/rfile/passwordCheck`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//GET SUBMITTER FILES

export const getSubmiterFiles = createAsyncThunk(
  "getSubmiterFiles",
  async (id, thunkAPI) => {
    try {
      let res = await API.get(`/link/rfile/getSubmiterFiles/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//UPLOAD FILE

export const uploadFile = createAsyncThunk(
  "uploadFile",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`link/rfile/fileRequestUpload`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET SUBMITTERS
export const getSubmitters = createAsyncThunk(
  "getSubmitters",
  async ({ id }, thunkAPI) => {
    try {
      let res = await API.get(`cdrive/getSubmitters/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//REMOVE SUBMITTER

export const removeSubmitterAndChangeStatus = createAsyncThunk(
  "removeSubmitterAndChangeStatus",
  async ({ id, type, status = null }, thunkAPI) => {
    try {
      if (status) {
        let res = await API.post(`cdrive/deleteClose/${id}/${type}/${status}`);
        return res;
      }
      let res = await API.post(`cdrive/deleteClose/${id}/${type}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//PUBLIC FILE VIEW
export const publicFileView = createAsyncThunk(
  "publicFileView",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`link/rfile/shareViewExternal`, data);
      return res;

      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//PUBLIC FILE SHARE PASSWOD CHECK
export const publicFilePasswordCheck = createAsyncThunk(
  "publicFilePasswordCheck",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`link/rfile/passwordCheckShare`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//DELETE FILE
export const submitterDeleteFile = createAsyncThunk(
  "submitterDeleteFile",
  async (id, thunkAPI) => {
    try {
      let res = await API.get(`link/rfile/submitter/fileDelete/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//DOWNLOAD FILE AS ZIP
export const downloadFileZip = createAsyncThunk(
  "downloadFileZip",
  async ({ id, type }, thunkAPI) => {
    try {
      // let response = await API.get(`cdrive/downloadFilesAsZip/${id}/${type}`, {
      //   responseType: "blob",
      // });
      // const blob = new Blob([response], { type: "application/zip" });

      // // Create a URL for the blob
      // const url = window.URL.createObjectURL(blob);

      // // Create a temporary link element
      // const link = document.createElement("a");
      // link.href = url;

      // // Set the filename for the downloaded file
      // link.setAttribute("download", "filename.zip");

      // // Append the link to the body
      // document.body.appendChild(link);

      // // Trigger the download
      // link.click();

      // // Clean up resources
      // window.URL.revokeObjectURL(url);
      return downloadFZip(id, type);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//DOWNLOAD FILE
export const downloadFile = createAsyncThunk(
  "downloadFile",
  async ({ id, type }, thunkAPI) => {
    try {
      // let response = await API.get(`cdrive/downloadFile/${id}`, {
      //   responseType: "blob",
      // });
      // const blob = new Blob([response], { type: "application/zip" });

      // // Create a URL for the blob
      // const url = window.URL.createObjectURL(blob);

      // // Create a temporary link element
      // const link = document.createElement("a");
      // link.href = url;

      // // Set the filename for the downloaded file
      // link.setAttribute("download", "filename.zip");

      // // Append the link to the body
      // document.body.appendChild(link);

      // // Trigger the download
      // link.click();

      // // Clean up resources
      // window.URL.revokeObjectURL(url);
      return downloadF(id);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//SHARED SUBFOLDER VIEW FILE AS ZIP
export const sharedSubFlderView = createAsyncThunk(
  "sharedSubFlderView",
  async (id, thunkAPI) => {
    try {
      let res = await API.get(`cdrive/shareSubFolderViewInternal/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//NEW FOLDER
export const newFolder = createAsyncThunk(
  "newFolder",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`cdrive/newFolder`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// FOLDER DELETE
export const deleteFolder = createAsyncThunk(
  "deleteFolder",
  async ({ id, params }, thunkAPI) => {
    try {
      let res = await API.delete(`cdrive/folderDelete/${id}`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// FILE DELETE
export const deleteFile = createAsyncThunk(
  "deleteFile",
  async ({ id, drive }, thunkAPI) => {
    try {
      let res = await API.delete(`cdrive/fileDelete/${id}/${drive}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//TEMP FILE UPLOAD
export const fileUploadTemp = createAsyncThunk(
  "fileUploadTemp",
  async (id, thunkAPI) => {
    try {
      let res = await API.post(`cdrive/uploadFileAstemp`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET TEMP FILE
export const getTempFile = createAsyncThunk(
  "getTempFile",
  async (id, thunkAPI) => {
    try {
      let res = await API.get(`cdrive/getTempFile`, {
        params: {
          session_id: getSessionStorage(SESSION?.SESSION_ID),
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//DELETE TEMP FILE
export const deleteTempFile = createAsyncThunk(
  "deleteTempFile",
  async (id, thunkAPI) => {
    try {
      let res = await API.delete(`cdrive/deleteTempFile/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Request File Filter
export const fileRequestFilter = createAsyncThunk(
  "fileRequestFilter",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`cdrive/fileRequestFilter`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//FOLDER DETAILS
export const folderDetails = createAsyncThunk(
  "folderDetails",
  async (params, thunkAPI) => {
    try {
      let res = await API.get(`cdrive/folderDetails`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//FOLDER DETAILS
export const fileDetails = createAsyncThunk(
  "fileDetails",
  async (params, thunkAPI) => {
    try {
      let res = await API.get(`cdrive/fileDetails`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//MOVE FOLDER
export const moveFolder = createAsyncThunk(
  "moveFolder",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`cdrive/moveFolder`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//MOVE FILE
export const moveFile = createAsyncThunk("moveFile", async (data, thunkAPI) => {
  try {
    let res = await API.post(`cdrive/copyMoveFiles`, data);
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});
//COPY FOLDER
export const copyFolder = createAsyncThunk(
  "copyFolder",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`cdrive/copyFolder`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//COPY FILE
export const copyFile = createAsyncThunk("copyFile", async (data, thunkAPI) => {
  try {
    let res = await API.post(`cdrive/copyFile`, data);
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

//MY DRIVE
export const myDriveView = createAsyncThunk(
  "myDriveView",
  async ({ folderId, data }, thunkAPI) => {
    try {
      let res = await API.put(`/cdrive/myDriveView/${folderId}`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//MY DRIVE NEW FOLDER
export const createFolderMyDrive = createAsyncThunk(
  "createFolderMyDrive",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/myDriveNewFolder`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//SharedPeopeles//  now-notworking
export const sharedPeoples = createAsyncThunk(
  "sharedPeoples",
  async (params, thunkAPI) => {
    try {
      let res = await API.get(`/cdrive/sharedPeoples`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeSharedUser = createAsyncThunk(
  "removeSharedUser",
  async (id, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/removeSharedUser/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const changeAccessLevel = createAsyncThunk(
  "changeAccessLevel",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/changeAccessLevel`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const viewFile = createAsyncThunk(
  "viewFile",
  async (params, thunkAPI) => {
    try {
      let res = await API.get(`/cdrive/viewFile`, { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//ASIGN PROJECT
export const asignProject = createAsyncThunk(
  "asignProject",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/asignProject`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//chooseColor
export const chooseColor = createAsyncThunk(
  "chooseColor",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/chooseColor`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//rename Folder
export const renameFolder = createAsyncThunk(
  "renameFolder",
  async (data, thunkAPI) => {
    try {
      let res = await API.post(`/cdrive/renameFolder`, data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//rename Folder
export const uploadFileViaDropBox = createAsyncThunk(
  "uploadFileViaDropBox",
  async (data, thunkAPI) => {
    try {
      let res = await API.post("case/downloadFile/dropBox", data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadFileViaDrive = createAsyncThunk(
  "uploadFileViaDrive",
  async (data, thunkAPI) => {
    try {
      let res = await API.post("case/downloadFile/drive", data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getFileAccess = createAsyncThunk(
  "getFileAccess",
  async (data, thunkAPI) => {
    try {
      let res = await API.post("cdrive/getFileAccess", data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const storageDetails = createAsyncThunk(
  "storageDetails",
  async (params, thunkAPI) => {
    try {
      let res = await API.get("cdrive/storageDetails", { params });
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const folderRoot = createAsyncThunk(
  "folderRoot",
  async (data, thunkAPI) => {
    try {
      let res = await API.post("cdrive/getFolderPaths", data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const searchFolderFile = createAsyncThunk(
  "searchFolderFile",
  async (data, thunkAPI) => {
    try {
      let res = await API.post("cdrive/searchFolderFile", data);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const peoples = createAsyncThunk(
  "peoples",
  async (params, thunkAPI) => {
    try {
      let res = await API.get("crm/peoples", {params});
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
