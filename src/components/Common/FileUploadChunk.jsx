"use client";
import {
  Box,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import _, { get } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReplayIcon from "@mui/icons-material/Replay";
import { convertFileSize } from "./helper";
//ICONS

import S3FileUpload from "./FileUpload/S3FileUploadMulti";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import { PiSealCheckDuotone } from "react-icons/pi";

const Upload = ({ chuckSize, body, file, formProps, url, onClose, index }) => {
  const { watch, setValue, setError, errors, getValues, clearErrors } =
    formProps || {};
  const [loaded, setLoaded] = useState();
  const [open, setOpen] = useState();
  const [cancel, setCancel] = useState();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [controller, setConcontroler] = useState(new AbortController());

  console.log("file", file);
  useEffect(() => {
    if (open != "start") {
      if (
        watch(`${file.uniqueIdentifier?.replace(" ", "")}.status`) != "open"
      ) {
        // resumable.addFile(file);
      }
      setOpen("start");
    }
  }, [open, file, watch(`${file.uniqueIdentifier?.replace(" ", "")}.status`)]);
  return (
    <Box
      width={"100%"}
      key={watch(`${file?.uniqueIdentifier}.progress`)}
      gap={0}
    >
      <S3FileUpload
        file={file}
        formProps={formProps}
        index={index}
        folder_path={url}
        body={body}
      />
      <Typography variant="bold" size="vsmall" className="singleLine">
        {file?.name}
      </Typography>
      <Stack direction={"row"} width={"100%"} alignItems={"center"} gap={3}>
        <LinearProgress
          variant="determinate"
          color={
            get(errors, `${file?.uniqueIdentifier?.replace(" ", "")}`) &&
            "error"
          }
          value={watch(`${file?.uniqueIdentifier}.progress`) ?? 0}
          sx={{ width: "100%", borderRadius: 5 }}
        />
        {!watch(`${file?.uniqueIdentifier?.replaceAll(" ", "")}`)?.success ? (
          <Typography variant="bold" size="xlsmall">
            {watch(`${file?.uniqueIdentifier}.progress`)}%
          </Typography>
        ) : (
          <PiSealCheckDuotone color="green" size={20} />
        )}
      </Stack>

      <>
        {get(errors, `${file?.uniqueIdentifier}`) &&
        !watch(`${file?.uniqueIdentifier}.success`) ? (
          <Typography variant="bold" size="vsmall">
            File Upload Failed Please try again{" "}
            {/* {get(errors, `${f?.uniqueIdentifier}`)?.message} */}
            <IconButton
              onClick={() => {
                // resumable.addFile(file);
                setValue(`${file?.uniqueIdentifier}.status`, "retry");
                clearErrors();
              }}
            >
              <ReplayIcon />
            </IconButton>{" "}
          </Typography>
        ) : (
          <>
            <Typography variant="bold" size="xlsmall">
              {watch(`${file?.uniqueIdentifier}.status`) != "Canceled" ? (
                <>
                  {convertFileSize(watch(`${file?.uniqueIdentifier}.loaded`))}/
                  {convertFileSize(file.size)}
                </>
              ) : (
                <>
                  Canceled
                  <IconButton
                    onClick={() => {
                      setValue(`${file?.uniqueIdentifier}.status`, "retry");
                      // resumable.addFile(file);
                      clearErrors();
                    }}
                    size="small"
                  >
                    <ReplayIcon fontSize="5px" />
                  </IconButton>
                </>
              )}
            </Typography>
          </>
        )}
      </>
    </Box>
  );
};
export default function FileUploadChunk({
  url,
  body,
  chuckSize = 100,
  open,
  onClose,
  files,
  setProgress,
  tempFiles,
  setTempFiles,
  progressBar,
  setFiles,
}) {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    clearErrors,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
  });
  const formProps = {
    control,
    setValue,
    handleSubmit,
    watch,
    clearErrors,
    getValues,
    setError,
    errors,
  };
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (files) {
      if (open == "start") {
        if (tempFiles?.[0]) setTempFiles([...tempFiles, ...files]);
        else setTempFiles(files);
      }
    }
  }, [files]);

  useEffect(() => {
    const prog = Object.entries(getValues()).map((it, i) => {
      return parseInt(it[1]?.progress);
    });
    let pg = _.sum(prog) / Object.entries(getValues()).length;
    console.log("pg", pg);
    setProgress(pg);
    if (pg == 100) {
      onClose();
    }
    // console.log("progress", progress);
  }, [JSON.stringify(getValues())]);

  const filesuplaod = useMemo(() => {
    return (
      <>
        {tempFiles?.map((f, i) => {
          f.uniqueIdentifier = (f?.name + f?.lastModified)
            ?.replaceAll(" ", "")
            ?.replaceAll(".", "")
            .replaceAll(/[&\/\\#, +()$~%.'":*?<>{}]/g, "_");
          return (
            <Upload
              key={i}
              body={{ ...body }}
              file={f}
              index={i}
              chuckSize={chuckSize}
              formProps={formProps}
              url={url}
              onClose={onClose}
            />
          );
        })}
      </>
    );
  }, [tempFiles, getValues()]);
  console.log("getValues()", getValues());

  const [expand, setexpand] = useState(true);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "7px",
          right: "7px",
          zIndex: 1000,
        }}
      >
        <Accordion
          expanded={expand}
          onChange={() => setexpand(!expand)}
          className=" p-0 border-0"
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            p: 0,
            border: "none",
          }}
        >
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            style={{}}
            sx={{
              width: "100%",
              ".MuiAccordionSummary-content": {
                margin: "0px !important",
              },
              p: 0,
              m: 0,
              minWidth: "350px",
              minHeight: "0px",
            }}
          >
            <Card
              className=""
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                justifyContent: "space-between",
                border: "0",
                pl: 2,
                py: 2,
              }}
            >
              <Typography variant="bold" size="small">
                {
                  Object.entries(getValues()).filter((it, i) => it[1]?.success)
                    ?.length
                }
                /{tempFiles?.length ?? 0}
                &#160; Completed
                {progressBar}
              </Typography>

              <Stack direction={"row"} alignItems={"center"}>
                <IconButton
                  onClick={() => {
                    onClose();
                    setOpenModal(false);
                  }}
                >
                  {!expand ? (
                    <MdKeyboardArrowUp size={20} />
                  ) : (
                    <MdOutlineKeyboardArrowDown size={20} />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFiles(null);
                    setTempFiles(null);
                    // setOpenModal(false);
                  }}
                >
                  <RiCloseCircleLine size={17} />
                </IconButton>
              </Stack>
            </Card>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              maxWidth: "400px",
              minWidth: "350px",
              maxHeight: "200px",
              overflow: "auto",
            }}
          >
            {filesuplaod}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
