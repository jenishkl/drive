import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { driveSelector } from "../../../store/drive/driveSlice";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FolderCard from "../../../components/Drive/FolderCard";
import FileCard from "../../../components/Drive/FIleCard";
import ListView from "../case-drive/ListView";
import PasswordModal from "../PasswordModal";
import { publicFileView } from "../../../store/drive/driveActions";
import { imageurl } from "../../../helpers/utils";

export default function FolderView() {
  const params = useParams();
  const N = useNavigate();
  const dispatch = useDispatch();
  const {
    publicFileViewData,
    publicFileViewLoading,
    publicFilePasswordCheckData,
  } = useSelector(driveSelector);
  console.log("publicFileViewData", publicFileViewData);
  const { control, setValue, handleSubmit, watch } = useForm();
  const formProps = { control, setValue };
  useEffect(() => {
    dispatch(publicFileView({ id: params?.id, shared_id: params?.shared_id }));
  }, [params?.folderId, params?.stageId, publicFilePasswordCheckData]);
  console.log("publicFileViewData", publicFileViewData);
  const folder = useMemo(() => {
    switch (publicFilePasswordCheckData?.status) {
      case 200:
        return (
          <>
            {!publicFileViewLoading && (
              <Grid container spacing={4} padding={2}>
                {publicFileViewData?.data?.map((it) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                    <FolderCard
                      name={it?.name}
                      id={it?.id}
                      drive={it?.drive}
                      detail={it}
                      viewOnly={true}
                      stage={it?.stage}
                      bin={0}
                      // url={}
                    />
                    {/* </Link> */}
                  </Grid>
                ))}
              </Grid>
            )}
            {!publicFileViewLoading && (
              <Grid container spacing={4} padding={2}>
                {publicFileViewData?.data?.map((it) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    {/* <Link to={`/admin/drive/my-drive/${it?.id}`}> */}
                    <FileCard
                      name1={it?.file_name}
                      id={it?.id}
                      detail={it}
                      drive={it?.drive}
                      viewOnly={true}
                      size={it?.file_size}
                      stage={it?.stage}
                      bin={0}
                      archieve={0}
                      file={imageurl(it?.file_path)}
                    />
                    {/* </Link> */}
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        );
      default:
        return (
          <PasswordModal
            type={"view"}
            watch={watch}
            handleSubmit={handleSubmit}
            control={control}
          />
        );
    }
  }, [publicFileViewData, publicFilePasswordCheckData]);
  if (publicFilePasswordCheckData?.status == 200) {
  }

  return (
    <>
      <Box sx={{ background: "var(--primary-color) !important", p: 3 }}>
        <Typography color={"white"} variant="bold" size="high">
          {" "}
          View File
        </Typography>
      </Box>
      {publicFileViewLoading && (
        <>
          <Grid container spacing={4} padding={2}>
            {Array(5)
              .fill("")
              .map((it) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={2.4}>
                    <FolderCard loading={true} />
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}

      {folder}
    </>
  );
}
