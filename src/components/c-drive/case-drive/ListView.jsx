import React, { useMemo } from "react";
import MaterialTable from "../../../components/Common/MaterialReactTable";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Box, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { DeleteIcon, EditIcon, OpenFolder } from "../../../helpers/icons";
import { useNavigate } from "react-router-dom";
export default function ListView({ data, loading }) {
  const N = useNavigate();
  const columns = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Division Name",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            <Box
              className="row-align-center"
              onClick={() => N(`/admin/drive/my-drive/${original?.id}`)}
            >
              {OpenFolder}
              <Typography variant="bold" size="medium">
                {renderedCellValue}
              </Typography>
            </Box>
          </>
        ),
        // size: 300,
      },
      {
        id: "owner",
        accessorKey: "owner",
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Owner",
        // size: 300,
      },
      {
        accessorKey: "last",
        id: "last",
        header: "Last Modified",
        // size: 250,
      },
      {
        accessorKey: "download",
        id: "download",
        header: "Download",
        // size: 250,
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            <CloudDownloadIcon />
          </>
        ),
      },
    ],
    []
  );
  const renderRowActionMenuItems = ({
    closeMenu,
    row: { original },
    table,
  }) => [
    <MenuItem key={0} sx={{ m: 0 }}>
      <ListItemIcon>{EditIcon}</ListItemIcon>
      Edit
    </MenuItem>,
    <MenuItem key={1} sx={{ m: 0 }}>
      <ListItemIcon>{DeleteIcon}</ListItemIcon>
      Delete
    </MenuItem>,
  ];
  return (
    <>
      <MaterialTable
        columnData={columns}
        rowData={data ?? []}
        enableStickyHeader={true}
        enableStickyFooter={true}
        enablePagination={true}
        enableRowActions={true}
        isLoading={loading}
        // enableRowSelection={true}
        columnDrag={true}
        // isLoading={divisionsLoading}
        // rowSelection={rowSelection}
        id={"division_name"}
        positionActionsColumn={"last"}
        renderRowActionMenuItems={renderRowActionMenuItems}
        muiTableContainerProps={{ sx: { maxHeight: "400px" } }}
      />
    </>
  );
}
