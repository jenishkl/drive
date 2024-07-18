"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { fileRequestBackground } from "../../../helpers/images";
import { useState } from "react";
import { useMemo } from "react";
import dayjs from "dayjs";
import MaterialTable from "../../../components/Common/MaterialReactTable";
import { useDispatch, useSelector } from "react-redux";
import LinkIcon from "@mui/icons-material/Link";
import { driveSelector } from "../../../store/drive/driveSlice";
import ImageCommon from "@/components/imagecomponent/ImageCommon";
import dynamic from "next/dynamic";
import FileRequestView from "./FileRequestView";
import DriveFilter  from"../DriveFilter";

const statusColor = (v) => {
  switch (v) {
    case 0:
      return "#ffa500 !important";

    case 1:
      return "green";

    case 2:
      return "green";
    default:
      return "#ffa500 !important";
  }
};

const filetypes = [
  { label: "PDF", value: "pdf" },
  { label: "DOC", value: "doc" },
  { label: "Folder", value: "folder" },
  { label: "Document", value: "document" },
  { label: "Image", value: "image" },
  { label: "Spreadsheet", value: "spreadsheet" },
  { label: "Other", value: "other" },
];
export default function FileRequest({ fileRequestData }) {
  const [openRequest, setOpenRequest] = useState();
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const { fileRequestLoading } = useSelector(driveSelector);
  const { control, setValue, watch, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      date_type: "",
      type: 1,
      pageNumber: 1,
    },
  });
  const formProps = { control, setValue, handleSubmit, watch };
  // const handleCreateRequest = async (data) => {
  //   try {
  //     await dispatch(fileRequest(data)).unwrap();
  //     toast.success("Request has been sended");
  //     setOpenRequest(null);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const columns = useMemo(
    () => [
      {
        id: "title",
        accessorKey: "title",
        filterVariant: "autocomplete",
        header: "Name",
        Cell: ({ renderedCellValue, row: { original } }) => {
          return (
            <Typography
              className="w-auto"
              onClick={() => {
                setOpenRequest(original);
              }}
            >
              {" "}
              {renderedCellValue}
            </Typography>
          );
        },
      },
      {
        accessorKey: "created_name",
        id: "created_at",
        header: "Created By",
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("MM/DD/YYYY")}</>
        ),
      },
      {
        accessorKey: "created_at",
        id: "created_at",
        header: "Created on",
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("MM/DD/YYYY")}</>
        ),
      },
      {
        accessorKey: "exp_date",
        id: "expiry",
        header: "Expiration",
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("MM/DD/YYYY")}</>
        ),
      },

      {
        id: "submitters",
        accessorKey: "submitters",
        // filterVariant: 'autocomplete',
        header: "Submitters",
        // size: 300,
      },

      {
        id: "uploads",
        accessorKey: "files_count",
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Uploads",
        // size: 300,
      },
      {
        id: "status",
        accessorKey: "status",
        // filterVariant: 'autocomplete',
        header: "status",
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Typography
              variant="bold"
              size="small"
              p={1}
              borderRadius={"10px"}
              sx={{ background: statusColor(renderedCellValue) }}
              color={"#fff"}
            >
              {renderedCellValue == 1
                ? "Opend"
                : [2].includes(renderedCellValue)
                ? "Re Opened"
                : "Closed"}
            </Typography>
          </>
        ),
        // size: 300,
      },
    ],
    []
  );
  function copy() {
    // Get the text field
    var copyText = document.getElementById("requestfilelistCopyLink");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied the text: " + copyText.value);
  }
  const renderRowActionMenuItems = ({
    closeMenu,
    row: { original },
    table,
  }) => [
    <MenuItem
      key={1}
      sx={{ m: 0 }}
      // onClick={async () => {
      //   let activity = await dispatch(
      //     getActivityByDivision(original?.division?.id)
      //   ).unwrap();
      //   setActivity(activity?.data);
      //   reset({
      //     comment: original.comment,
      //     end_time: original.end_time,
      //     start_time: original.start_time,
      //     activity_id: original.activity_id,
      //     division_id: original.division_id,
      //     id: original.id,
      //   });
      //   setOpen("Edit");
      // }}
    >
      {/* <ListItemIcon>{EditIcon}</ListItemIcon> */}
      Share
    </MenuItem>,
    <MenuItem key={1} sx={{ m: 0 }} onClick={() => copy()}>
      <input
        type="text"
        disabled
        style={{ display: "none" }}
        value={original?.link}
        id="requestfilelistCopyLink"
      />
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      Copy Link
    </MenuItem>,
  ];

  // useEffect(() => {
  //   if (watch("to_date") || watch("file_type") || watch("email")) {
  //     let data = getValues();
  //     data.file_type = data?.file_type?.map((v) => v?.value);
  //     var filter_types = [];
  //     if (data?.email) {
  //       filter_types.push("submiter");
  //     }
  //     if (data?.file_type) {
  //       filter_types.push("file");
  //     }
  //     if (data?.to_date) {
  //       filter_types.push("date");
  //       data.date_type = "other";
  //     }
  //     data.filter_types = filter_types;
  //     dispatch(fileRequestFilter(data));
  //   }
  // }, [watch("to_date"), watch("file_type"), watch("email"), watch("search")]);

  // useEffect(() => {
  //   dispatch(getAllFolders());
  // dispatch(getFileRequest());
  // }, []);
  return (
    <>
      <Box>
        <DriveFilter
          top="57px"
          people={false}
          file_request={true}
          search={false}
          create_new={false}
        />
        {fileRequestData?.[0] && (
          <MaterialTable
            columnData={columns}
            rowData={fileRequestData ?? []}
            // searchMarginLeft=""
            enableStickyHeader={true}
            // isRefetching={getFileRequestLoading}
            // isLoading={getFileRequestLoading}
            enableStickyFooter={true}
            enablePagination={true}
            enableRowActions={true}
            positionActionsColumn={"last"}
            renderRowActionMenuItems={renderRowActionMenuItems}
            muiTableContainerProps={{ sx: { maxHeight: "100%" } }}
          />
        )}

        {!fileRequestData?.[0] && (
          <Container maxWidth="md">
            <Grid
              container
              rowSpacing={1}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <Grid item xs={12} md={8}>
                <ImageCommon aspectRatio={1} src={fileRequestBackground} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="bold" size="large">
                  Need something from someone?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="light" size="small">
                  Request files from anyone, whether they have a C-Drive account
                  or not, and collect them in your C-Drive. Files will be
                  automatically organized into a C-Drive folder you choose. Your
                  privacy is important, so those who upload to your file request
                  cannot access your C-Drive account
                </Typography>{" "}
              </Grid>
            </Grid>
          </Container>
        )}

        {openRequest && (
          <FileRequestView
            open={openRequest}
            handleClose={() => setOpenRequest(null)}
          />
        )}
      </Box>
    </>
  );
}
