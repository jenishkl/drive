"use client";
import React, { useMemo, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { DeleteIcon, EditIcon, OpenFolder } from "../../helpers/icons";
import MaterialTable from "../../components/Common/MaterialReactTable";
import ArchiveIcon from "@mui/icons-material/Archive";
import {
  dateFormate,
  encode,
  encriptData,
  file_icon,
  folder,
  imageurl,
  lastseen,
} from "../../helpers/utils";
import FileCard from "../../components/Drive/FIleCard";
import FolderCard from "../../components/Drive/FolderCard";
import { downloadFileZip } from "../../store/drive/driveActions";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import ImageCommon from "../imagecomponent/ImageCommon";
import Link from "next/link";
import FolderIcon from "@mui/icons-material/Folder";
import { toast } from "sonner";

export default function ListView({ data, loading }) {
  const N = useRouter();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  let filemodel = (file_type) =>
    [
      "jpg",
      "jpeg",
      "png",
      "PNG",
      "gif",
      "bmp",
      "tiff",
      "webp",
      "svg",
      "jfif",
    ].includes(file_type);

  const url = (original) => {
    if (original?.file_path) {
      return `/drive/${encriptData(
        folder(original?.folder_id, original?.drive)
      )}/${original?.id}`;
    } else {
      return `/drive/${encriptData(folder(original?.id, original?.drive))}`;
    }
  };
  const columns = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Folder/File Name",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <Link href={url(original)}>
            <Box className="row-align-center gap-1">
              {original?.file_path ? (
                !filemodel(original?.file_ext) ? (
                  file_icon(original?.file_ext)
                ) : (
                  <Box width={"100px"} height={"100px"}>
                    <ImageCommon
                      src={imageurl(original?.file_path)}
                      objectFit="cover"
                      original={true}
                    />
                  </Box>
                )
              ) : (
                <FolderIcon sx={{ color: original?.folder_color }} />
              )}
              <Typography
                variant="bold"
                size="medium"
                className="singleLine"
                sx={{ textWrap: "wrap" }}
              >
                {original?.file_name ?? renderedCellValue}
              </Typography>
            </Box>
          </Link>
        ),
        // size: 300,
      },
      {
        id: "owner",
        accessorKey: "owner_details.display_name",
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Owner",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            <Box className="row-align-center">
              <Typography variant="bold" size="medium">
                {renderedCellValue}
              </Typography>
            </Box>
          </>
        ),
        // size: 300,
      },
      {
        accessorKey: "updated_at",
        id: "last",
        header: "Last Modified",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            <Stack direction={"column"} gap={1}>
              <Typography>
                {dayjs(renderedCellValue).format(dateFormate({ time: true }))}
              </Typography>
              <Typography>{lastseen(renderedCellValue)}</Typography>
            </Stack>
          </>
        ),
        // size: 250,
      },
      {
        accessorKey: "download",
        id: "download",
        header: "Download",
        // size: 250,
        Cell: ({ renderedCellValue, row: { original } }) => (
          <IconButton
            onClick={() => {
              if (!original?.file_path) {
                toast.promise(
                  dispatch(
                    downloadFileZip({ id: original?.id, type: original?.drive })
                  ).unwrap(),
                  {
                    loading: "Loading...",
                    success: (data) => {
                      return `File download has been started`;
                    },
                    error: "Error",
                  }
                );
              } else {
                window.open(imageurl(original?.file_path), "_blank");
                var link = document.createElement("a");
                link.href = imageurl(original?.file_path);
                link.download = "file.pdf";
              }
            }}
          >
            <CloudDownloadIcon />
          </IconButton>
        ),
      },
    ],
    []
  );
  const renderRowActionMenuItems = ({
    closeMenu,
    row: { original },
    table,
  }) => {
    return (
      <>
        {original?.file_path ? (
          <FileCard
            detail={original}
            onlyMenu={true}
            drive={original?.drive}
            file={imageurl(original?.file_path)}
            id={original?.id}
            name1={original?.file_name}
            size={original?.file_size}
            file_type={original?.file_ext}
            archieve={original?.archieve}
            bin={original?.bin}
          />
        ) : (
          <FolderCard
            onlyMenu={true}
            detail={original}
            id={original?.id}
            archieve={original?.archieve}
            bin={original?.bin}
            drive={original?.drive}
          />
        )}
      </>
    );
  };
  return (
    <Box px={1}>
      <MaterialTable
        columnData={columns}
        rowData={data ?? []}
        autoAdjustWidth={true}
        enableStickyHeader={true}
        enableStickyFooter={true}
        enablePagination={false}
        enableRowActions={true}
        isLoading={loading}
        enableGlobalFilter={false}
        enableTopToolbar={false}
        // enableRowSelection={true}
        onRowSelectionChange={setSelected}
        enableSelectAll
        HeaderMiddleComponent={
          selected && (
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Button
                variant="outlined"
                size="medium"
                endIcon={DeleteIcon}
                color="error"
              >
                Bin
              </Button>
              <Button
                variant="outlined"
                size="medium"
                endIcon={<ArchiveIcon />}
                color="inherit"
              >
                Archive
              </Button>
            </Stack>
          )
        }
        rowSelection={selected}
        // enableRowSelection={true}
        columnDrag={true}
        // isLoading={divisionsLoading}
        // rowSelection={rowSelection}
        id={"division_name"}
        positionActionsColumn={"last"}
        renderRowActionMenuItems={renderRowActionMenuItems}
        muiTableContainerProps={{ sx: { maxHeight: "400px" } }}
      />
    </Box>
  );
}
