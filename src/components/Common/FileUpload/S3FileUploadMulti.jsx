"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import API from "../../../store/api";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "../../../helpers/utils";
import { SESSION } from "../../../helpers/localSessions";
import { IconButton, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import { getTempFile } from "../../../store/drive/driveActions";
import _ from "lodash";
import { useRouter } from "next/navigation";
const S3FileUpload = ({
  file,
  index,
  formProps,
  folder_path = "temp/",
  body,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    clearErrors,
    getValues,
    setError,
    errors,
  } = formProps;
  // const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [uploadId, setUploadId] = useState(null);
  const [parts, setParts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cancelTokenSource = useRef(null);
  const currentPart = useRef(0);
  const cancel = useRef(0);
  const CHUNK_SIZE = 100 * 1024 * 1024; // 5MB per chunk
  const [controller, setController] = useState(new AbortController());
  const router = useRouter();
  useEffect(() => {
    const savedUploadId = localStorage.getItem("uploadId");
    const savedParts = JSON.parse(localStorage.getItem("parts"));
    const savedFile = JSON.parse(localStorage.getItem("file"));

    if (savedUploadId && savedParts && savedFile) {
      setUploadId(savedUploadId);
      setParts(savedParts);
      setFile(savedFile);
      currentPart.current = savedParts.length;
      setProgress(calculateProgress(savedParts, savedFile.size));
    }
  }, []);

  // const handleFileChange = (e) => {
  //   const selectedFile = e;
  //   let filePart = getSessionStorage(SESSION.FILE_PARTS)?.filter(
  //     (it) => it.name == file?.uniqueIdentifier
  //   )[0];
  //   if (filePart) {
  //     const savedUploadId = filePart?.uploadId;
  //     const savedParts = filePart?.parts;
  //     // setFile(selectedFile);
  //     setUploadId(savedUploadId);
  //     setParts(savedParts);
  //     // currentPart.current = savedParts.length;
  //     setIsUploading(false);
  //     setIsPaused(false);
  //     setValue(
  //       `${file?.uniqueIdentifier}.progress`,
  //       calculateProgress(savedParts, selectedFile.size)
  //     );
  //     let loaded = _.sum(filePart?.parts?.map((it) => it?.Size));
  //     setLoaded(loaded);
  //     setProgress(calculateProgress(savedParts, selectedFile.size));

  //     return startMultipartUpload(filePart?.uploadId, currentPart);
  //   } else {
  //     // setFile(selectedFile);
  //     setUploadId(null);
  //     setParts([]);
  //     setValue(`${file?.uniqueIdentifier}.progress`, 0);
  //     setValue(`${file?.uniqueIdentifier}.loaded`, 0);
  //     setIsUploading(false);
  //     setIsPaused(false);
  //     // currentPart.current = 0;

  //     let fileParts = getSessionStorage(SESSION.FILE_PARTS) ?? [];
  //     let filepart = {
  //       name: file?.uniqueIdentifier,
  //       parts: [],
  //       uploadId: "",
  //     };
  //     if (fileParts?.[0]) {
  //       fileParts?.push(filepart);
  //     } else {
  //       setSessionStorage(SESSION.FILE_PARTS, [
  //         ...fileParts,
  //         {
  //           name: file?.uniqueIdentifier,
  //           parts: [],
  //           uploadId: "",
  //         },
  //       ]);
  //     }

  //     return startMultipartUpload();
  //   }

  //   // localStorage.setItem("file", JSON.stringify(selectedFile));
  // };

  const handleFileChange = (e) => {
    const selectedFile = file;
    console.log("selectedFile", selectedFile);
    let savedUploadId = getSessionStorage(`${file?.uniqueIdentifier}uploadId`);
    let savedParts = getSessionStorage(`${file?.uniqueIdentifier}parts`) ?? [];
    setValue(`${file?.uniqueIdentifier}.status`, "open");
    if (savedUploadId) {
      // setFile(selectedFile);
      setUploadId(savedUploadId);
      setParts(savedParts);
      currentPart.current = savedParts?.length ?? 0;
      setIsUploading(false);
      setIsPaused(false);
      setProgress(calculateProgress(savedParts, selectedFile.size));
      setValue(
        `${file?.uniqueIdentifier}.progress`,
        calculateProgress(savedParts, selectedFile.size)
      );
      let loaded = _.sum(savedParts?.map((it) => it?.Size));
      setLoaded(loaded);
      setValue(`${file?.uniqueIdentifier}.loaded`, loaded);
      return startMultipartUpload(savedUploadId, savedParts);
    } else {
      // setFile(selectedFile);
      setUploadId(null);
      setParts([]);
      setProgress(0);
      setValue(`${file?.uniqueIdentifier}.progress`, 0);
      setValue(`${file?.uniqueIdentifier}.loaded`, 0);
      setIsUploading(false);
      setIsPaused(false);
      currentPart.current = 0;
      return startMultipartUpload();
    }
  };

  const calculateProgress = (parts, fileSize) => {
    const uploadedBytes = parts.reduce((sum, part) => sum + part.Size, 0);
    return Math.round((uploadedBytes * 100) / fileSize);
  };

  const startMultipartUpload = async (upload_id, savedParts) => {
    if (!upload_id) {
      try {
        const response = await API.post("/start-multipart-upload", {
          filename:
            folder_path +
            file?.uniqueIdentifier +
            "." +
            file?.name?.split(".")[file?.name?.split(".")?.length - 1],
        });
        setUploadId(response.uploadId);
        setSessionStorage(
          `${file?.uniqueIdentifier}uploadId`,
          response.uploadId
        );
        uploadChunks(response.uploadId);
      } catch (error) {
        console.error("Error starting multipart upload:", error);
      }
    } else {
      uploadChunks(upload_id, savedParts);
    }
  };

  const getPresignedUrl = async (partNumber, uploadId) => {
    try {
      const response = await API.get("/get-upload-url", {
        params: {
          filename:
            folder_path +
            file?.uniqueIdentifier +
            "." +
            file?.name?.split(".")[file?.name?.split(".")?.length - 1],
          partNumber,
          uploadId,
        },
        signal: controller.signal,
      });
      return response.url;
    } catch (error) {
      console.error("Error getting presigned URL:", error);
    }
  };

  const uploadChunks = async (uploadId, savedParts = []) => {
    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    const partsArray = [...savedParts];
    let uploadedBytes = partsArray.reduce((sum, part) => sum + part.Size, 0);

    setIsUploading(true);

    for (
      let partNumber = currentPart.current + 1;
      partNumber <= totalParts;
      partNumber++
    ) {
      if (isPaused) {
        currentPart.current = partNumber - 1;
        break;
      }

      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = partNumber * CHUNK_SIZE;
      const chunk = file.slice(start, end);

      const presignedUrl = await getPresignedUrl(partNumber, uploadId);

      try {
        cancelTokenSource.current = axios.CancelToken.source();
        const response = await axios.put(presignedUrl, chunk, {
          headers: {
            "Content-Type": "binary/octet-stream",
          },
          onUploadProgress: (event) => {
            const chunkProgress = Math.round((event.loaded * 100) / chunk.size);
            const totalProgress = Math.round(
              ((uploadedBytes + event.loaded) * 100) / file.size
            );
            setProgress(totalProgress);
            setLoaded(uploadedBytes + event.loaded);
            setValue(
              `${file?.uniqueIdentifier}.loaded`,
              uploadedBytes + event.loaded
            );
            setValue(`${file?.uniqueIdentifier}.progress`, totalProgress);
          },
          signal: controller.signal,
          cancelToken: cancelTokenSource.current.token,
        });

        uploadedBytes += chunk.size;
        const part = {
          PartNumber: partNumber,
          ETag: response.headers.etag,
          Size: chunk.size,
        };
        partsArray.push(part);
        let loaded = _.sum(partsArray?.map((it) => it?.Size));
        setSessionStorage(`${file?.uniqueIdentifier}parts`, partsArray);
      } catch (error) {
        removeSessionStorage(`${file?.uniqueIdentifier}uploadId`);
        removeSessionStorage(`${file?.uniqueIdentifier}parts`);
        if (axios.isCancel(error)) {
          console.log("Upload cancelled");
          return;
        } else {
          setError(`${file?.uniqueIdentifier}`, { message: "Error" });
          console.error("Error uploading part:", error);
          return;
        }
      }
    }

    if (!isPaused) {
      setParts(partsArray);
      // removeSessionStorage(`${file?.uniqueIdentifier}uploadId`);
      // removeSessionStorage(`${file?.uniqueIdentifier}parts`);
      completeMultipartUpload(uploadId, partsArray);
    } else {
      setParts(partsArray);
    }
  };

  const completeMultipartUpload = async (uploadId, partsArray) => {
    try {
      const response = await API.post("/complete-multipart-upload", {
        ...body,
        uniqueFilename:
          folder_path +
          file?.uniqueIdentifier +
          "." +
          file?.name?.split(".")[file?.name?.split(".")?.length - 1],
        filename: file.name,
        size: file?.size,
        uploadId: uploadId,
        ext: file?.name?.split(".")[file?.name?.split(".")?.length - 1],
        parts: partsArray,
        session_id: getSessionStorage(SESSION?.SESSION_ID),
      });
      console.log("Upload completed:", response);
      dispatch(getTempFile());
      router.refresh();
      removeSessionStorage(`${file?.uniqueIdentifier}uploadId`);
      removeSessionStorage(`${file?.uniqueIdentifier}parts`);
      setIsUploading(false);
      setValue(`${file?.uniqueIdentifier}.success`, true);
    } catch (error) {
      setError(`${file?.uniqueIdentifier}`, { message: "Error" });
      console.error("Error completing multipart upload:", error);
    }
  };

  const handleUpload = () => {
    if (file) {
      startMultipartUpload(uploadId);
    } else {
      alert("Please select a file first");
    }
  };

  const handleCancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel();
      setProgress(0);
      setValue(`${file?.uniqueIdentifier}.progress`, 0);
      setIsUploading(false);
      setIsPaused(false);
      currentPart.current = 0;
      removeSessionStorage(`${file?.uniqueIdentifier}uploadId`);
      removeSessionStorage(`${file?.uniqueIdentifier}parts`);
      setValue(`${file?.uniqueIdentifier}.status`, "Canceled");
      setUploadId(null);
      setParts([]);
      setLoaded(0);
      cancelTokenSource.current = null;
    }
  };

  const handlePauseUpload = () => {
    setIsPaused(true);
    setIsUploading(false);
  };

  const handleResumeUpload = () => {
    setIsPaused(false);
    setIsUploading(true);
    uploadChunks(uploadId);
  };

  useEffect(() => {
    if (file) {
      if (watch(`${file?.uniqueIdentifier}.status`) == "Canceled")
        console.log('"first"', "first");
      else if (watch(`${file?.uniqueIdentifier}.status`) != "open") {
        handleFileChange();
      }
    }
  }, [file, getValues()]);
  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      {/* <input type="file" onChange={handleFileChange} /> */}
      {/* <button onClick={handleFileChange}>Upload</button> */}

      {/* <IconButton
        onClick={handlePauseUpload}
        disabled={!isUploading || isPaused}
      >
        <PauseIcon />
      </IconButton>
      <IconButton onClick={handleResumeUpload} disabled={!isPaused}>
        <PlayArrowIcon />
      </IconButton>
      <IconButton onClick={handleCancelUpload}>
        <CancelIcon />
      </IconButton> */}
      {/* {progress > 0 && <div>Upload Progress: {progress}%</div>} */}
    </Stack>
  );
};

export default S3FileUpload;
