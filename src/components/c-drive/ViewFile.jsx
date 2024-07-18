import React, { useEffect, useMemo } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import {
  TOKEN,
  decode,
  file_icon,
  imageTypes,
  imageurl,
} from "../../helpers/utils";
import MainHeader from "../../layout/Headers/MainHeaders";
import {
  AppBar,
  Box,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { viewFile } from "../../store/drive/driveActions";
import { useParams } from "react-router-dom";
import { driveSelector } from "../../store/drive/driveSlice";
import LoadingButton from "../../components/Common/Buttons/LoadingButton";
import DownloadIcon from "@mui/icons-material/Download";
import HeaderDynamic from "../../components/Common/headers/HeaderDynamic";
import GoBackButton from "../../components/Common/Buttons/GoBackButton";
import { RotatingLines } from "react-loader-spinner";
import Login from "../auth/signin/Login";
import StringField from "../../components/Common/InputFields/StringField";
import { useForm } from "react-hook-form";
export default function ViewFile() {
  const dispatch = useDispatch();
  const p = useParams();
  const { viewFileData, viewFileLoading } = useSelector(driveSelector);
  const { data, status } = viewFileData || {};
  const {
    control,
    setValue,
    setError,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const formProps = {
    control,
    setValue,
    setError,
    watch,
    handleSubmit,
    errors,
  };
  useEffect(() => {
    if (TOKEN) {
      const params = decode(p?.f_id)?.split("_");
      console.log("params", params);
      let f_id = params[0];
      let drive = params[1];
      let type = params[2];
      dispatch(viewFile({ f_id, drive, type }));
    }
  }, [p?.f_id]);

  const renderFile = useMemo(() => {
    if (status == 400) {
      return (
        <center>
          <Typography variant="bold" size={"high"}>
            You have no permission to access this file
          </Typography>
        </center>
      );
    }
    if (status == 404) {
      return (
        <center>
          <Typography variant="bold" size={"high"}>
            File Not Found
          </Typography>
        </center>
      );
    }
    if (data?.file_size >= 500000) {
      return (
        <Stack
          direction={"column"}
          gap={2}
          sx={{ p: 10 }}
          alignItems={"center"}
        >
          {file_icon(data?.file_ext)}
          <Typography variant="bold" size={"high"}>
            File Size is Large, Cannot View File
          </Typography>

          <LoadingButton
            label="Download"
            endIcon={<DownloadIcon />}
            onClick={() => {
              window.open(data?.fileUrl, "_blank");
              var link = document.createElement("a");
              link.href = data?.fileUrl;
              link.download = data?.file_name;
            }}
          />
        </Stack>
      );
    }
    if (data?.file_ext == "pdf") {
      return (
        <DocViewer
          key={data}
          documents={[
            {
              uri: data?.fileUrl,
              fileName: data?.file_name,
              fileType: data?.file_ext,
              // fileData: "sqwdw",
            },
          ]}
          config={{
            pdfZoom: {
              defaultZoom: 0.6, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
          }}
          // prefetchMethod="GET"
          pluginRenderers={DocViewerRenderers}
        />
      );
    } else if (
      imageTypes.includes(data?.file_ext ?? data?.file_name?.split(".")[1])
    )
      return <img src={data?.fileUrl} alt="" />;
    else
      return (
        <Stack direction={"column"} gap={2} sx={{ p: 10 }}>
          {file_icon(data?.file_ext ?? data?.file_name?.split(".")[1])}
          <Typography variant="bold" size={"high"}>
            Unsupported file type
          </Typography>

          <LoadingButton
            label="Download"
            endIcon={<DownloadIcon />}
            onClick={() => {
              window.open(data?.fileUrl, "_blank");
              var link = document.createElement("a");
              link.href = data?.fileUrl;
              link.download = data?.file_name;
            }}
          />
        </Stack>
      );
  }, [data, status, p?.f_id]);
  const handleExternalView = (data) => {
    try {
      const params = decode(p?.f_id)?.split("_");
      console.log("params", params);
      let f_id = params[0];
      let drive = params[1];
      let type = params[2];
      dispatch(
        viewFile({
          f_id,
          drive,
          type,
          email: data?.email,
          password: data?.password,
        })
      );
      console.log("drive", data);
    } catch (error) {
      console.log("errro", error);
    }
  };
  return (
    <>
      {TOKEN && <MainHeader />}

      <HeaderDynamic
        sticky={true}
        top={TOKEN && "57px"}
        left={
          <>
            <Stack
              width={"100%"}
              direction={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <GoBackButton reversed={false} />
              {status == 200 && (
                <LoadingButton
                  label="Download"
                  endIcon={<DownloadIcon />}
                  onClick={() => {
                    window.open(data?.fileUrl, "_blank");
                    var link = document.createElement("a");
                    link.href = data?.fileUrl;
                    link.download = data?.file_name;
                  }}
                />
              )}
            </Stack>
          </>
        }
      />

      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        gap={2}
      >
        {!viewFileLoading ? (
          renderFile
        ) : (
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeColor="#0038ff"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </Stack>
      {
        <Dialog
          fullWidth
          // fullScreen
          open={!status && !TOKEN}
          // onClose={status == 200}
          aria-labelledby={"sdfhufier"}
        >
          <DialogTitle id={"dddee"}></DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Stack direction={"column"} gap={3} mt={3}>
                <StringField
                  type="email"
                  required={"Required"}
                  {...formProps}
                  name={"email"}
                  label={"Email"}
                />
                <StringField
                  {...formProps}
                  name={"password"}
                  label={"Password"}
                />
                <LoadingButton
                  label="Submit"
                  loading={viewFileLoading}
                  onClick={handleSubmit(handleExternalView)}
                />
              </Stack>

              {/* <Login /> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button
            // onClick={}
            color="primary"
          >
            Cancel
          </Button> */}
          </DialogActions>
        </Dialog>
      }
    </>
  );
}
