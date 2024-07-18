"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MRT_GlobalFilterTextField,
  MRT_LinearProgressBar,
  MRT_Table,
  MRT_TableContainer,
  MRT_TableLoadingOverlay,
  MRT_TablePagination,
  MRT_ToolbarInternalButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { MdOutlineFileDownload } from "react-icons/md";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaRegFile } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { GlobalContext } from "../../layout/GlobalContextProvider";
import DateFilter from "./InputFields/DateFilter";
import AddlFilter from "./Filter/AddlFilter";
import LoadingButton from "./Buttons/LoadingButton";
import { fileUplodimg } from "../../helpers/images";
// import style from "../../pages/Settings/Services/service-type/ServiceType.module.css";
import { useDispatch } from "react-redux";
const MaterialTable = ({
  id,
  rowData,
  columnData,
  columnDrag,
  paginationPosition = "top",
  positionGlobalFilter = "left",
  searchPlaceholder = "Search here...",
  enableEditing,
  editDisplayMode,
  renderRowActions,
  positionActionsColumn,
  enableColumnPinning,
  enableStickyHeader = true,
  enablePagination = true,
  enableRowActions,
  enableRowSelection,
  onRowSelectionChange,
  renderRowActionMenuItems,
  muiTableContainerProps,
  enableBottomToolbar = false,
  enableTopToolbar = true,
  enableFilterMatchHighlighting = true,
  enableColumnResizing = true,
  enableColumnFilters = true,
  enableColumnActions = true,
  enableClickToCopy,
  enableRowPinning,
  enableExportToCSV,
  enableExportToPDF,
  rowSelection = {},
  enableRowDrag,
  enableHiding,
  columnVisibility = false,
  isLoading,
  setColumnVisbility,
  HeaderMiddleComponent,
  headerSearchExtendComponent,
  enableMultiRowSelection = true,
  enableSelectAll = true,
  enableGlobalFilter = true,
  autoAdjustWidth = true,
  searchMarginLeft = "15px",
  rowOnClick = () => {},
  onDoubleClick = () => {},
  actionMenuWidth = null,
  fileName = "Sample File",
  actionHeader = "Actions",
  selectHeader = "Select",
  isRefetching,
  manualPagination = false,
  manualFiltering = false,
  enableSorting = true,
  onPaginationChange = () => {},
  enableServerPagination = false,
  pagination = { pageSize: 10, pageIndex: 0 },
  params,
  setParams,
  showAdditionalFilter = false,
  pageCount = rowData?.length ?? 0,
  removeColors = false,
  maxHeight = "70vh",
  fitContentWidth,
  setRowOrder,
  getRowId,
  ...others
}) => {
  const dispatch = useDispatch();
  const rowVirtualizerInstanceRef = useRef(null);
  const [importModal, setImportModal] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [data, setData] = useState(rowData ?? []);
  const handleImport = (e) => {
    // dispatch(
    //   importBill({
    //     file: e.target.files[0],
    //   })
    // );
  };
  useEffect(() => {
    setData(rowData);
  }, [rowData]);
  // const [param,]
  const { themeMode, setThemeMode } = useContext(GlobalContext) || {};
  const evenBg = themeMode == "light" ? "#F6F6F6" : "#1E1E1E";
  // F6F6F6;
  const oddBg = themeMode == "light" ? "#fff" : "#18191A";
  const hoverBg = themeMode == "light" ? "#E3E9FF" : "#2b2c2e";
  const dashboardBg = themeMode == "light" ? "#e6ebff" : "#2b2c2e";
  const headBg = themeMode == "light" ? "#F6F6F6" : "#1E1E1E";

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: fileName,
  });

  // export to CSV

  const handleExportRows = (rows) => {
    const exportData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(exportData);

    download(csvConfig)(csv);
  };
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const getHeaders = () => {
    var arr = columnData?.map((item) => item.header);
    if (renderRowActionMenuItems) arr.push("action");
    return arr;
  };
  const getAutoColumnWidth = () => {
    if (autoAdjustWidth) {
      var k = 100 / getHeaders()?.length;
      if (enableRowSelection) {
        k = k - 0.78;
      }
      return k + "%";
    } else if (fitContentWidth) {
      return "250px";
    } else return null;
  };
  // export to PDF

  const handleExportPDF = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columnData.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    const filename = `${fileName}.pdf`;
    doc.save(filename);
  };

  //scroll to the top of the table when the sorting changes
  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  let _columnVisiblity = columnVisibility ? "columnVisibility" : "nothing";
  let _onColumnVisibilityChange = setColumnVisbility
    ? "onColumnVisibilityChange"
    : "nothing";
  console.log("datatable", data);
  const table = useMaterialReactTable({
    manualPagination: manualPagination,
    columns: columnData,
    // pageCount: pageCount,
    ...(enableServerPagination && {
      rowCount: pageCount,
    }),
    selectAllMode: true,
    data: useMemo(() => data, [data]),
    enableColumnOrdering: columnDrag,
    positionPagination: paginationPosition,
    enablePagination,
    enableEditing,
    editDisplayMode,
    renderRowActions,
    positionActionsColumn,
    muiTableContainerProps,
    enableBottomToolbar,
    enableTopToolbar,
    positionGlobalFilter,
    enableFilterMatchHighlighting,
    enableFullScreenToggle: false,
    enableColumnResizing,
    enableRowPinning,
    columnResizeMode: "onChange",
    rowPinningDisplayMode: "select-sticky",
    enableStickyHeader,
    enableColumnPinning,
    // enableRowVirtualization: enableStickyHeader,
    // rowVirtualizerInstanceRef,
    // rowVirtualizerOptions: { overscan: 2 },
    layoutMode: "semantic",
    keepPinnedRows: true,
    enableColumnFilters,
    enableColumnActions,
    enableClickToCopy,
    autoResetPageIndex: false,
    enableSorting: enableSorting,
    enableHiding,
    enableSelectAll,
    enableMultiRowSelection,

    selectHeader,
    manualFiltering: manualFiltering,
    ...(enableServerPagination && {
      onGlobalFilterChange: (data) =>
        onPaginationChange({ ...pagination, search: data }),
    }),
    // onGlobalFilterChange: (data) =>
    //   onPaginationChange({ ...pagination, search: data }),
    ...(enableServerPagination && { onPaginationChange }),
    // onColumnFiltersChange:onPaginationChange(),
    getRowId: typeof getRowId == "function" ? getRowId : (row) => row?.id,
    // [_onColumnVisibilityChange]: setColumnVisbility,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
      columnPinning: { left: ["mrt-row-select"], right: ["mrt-row-actions"] },
      [_columnVisiblity]: useMemo(
        () => columnVisibility,
        [columnVisibility, data, columnData]
      ),
    },

    //customize the MRT components
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15, 25, 50],
      variant: "outlined",
    },
    //search bar
    muiSearchTextFieldProps: {
      placeholder: searchPlaceholder,
      sx: { minWidth: "300px" },
      variant: "outlined",
    },
    // paginationDisplayMode: 'pages',
    //ROW ACTION COLUMN
    enableRowActions,
    renderRowActionMenuItems,
    //ROW SELECTION
    enableRowSelection,
    onRowSelectionChange,

    onSortingChange: setSorting,
    state: {
      rowSelection,
      sorting,
      // isLoading,
      showProgressBars: isRefetching,
      ...(enableServerPagination && { globalFilter: pagination?.search }),
      showSkeletons: isLoading,
      ...(enableServerPagination && { pagination }),

      // [_columnVisiblity]: useMemo(() => columnVisibility, [columnVisibility]),
    },

    // Row Dragging
    enableRowOrdering: enableRowDrag,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow !== undefined && draggingRow !== undefined) {
          const newData = [...data]; // Clone the original data array
          const [reorderedItem] = newData.splice(draggingRow.index, 1); // Remove the item being dragged
          newData.splice(hoveredRow.index, 0, reorderedItem); // Insert the item at the new position

          var ids = [];
          var k = newData.filter((item) => ids.push(item.id));
          console.log("newData", ids);
          setRowOrder(ids);
          setData(newData);
        }
      },
    }),
    // column customizations
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: actionHeader, //change header text
        size: actionMenuWidth ?? 100, //make actions column wider
      },
      "mrt-row-select": {
        header: selectHeader,
        size: actionMenuWidth ?? 100,
      },
    },
    muiTableHeadProps: {
      sx: {
        textAlign: "left",
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "0",
      },
    },
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: oddBg,
          },

        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: evenBg,
          },

        '& tr:not([data-selected="true"]):not([data-pinned="true"]):hover > td':
          {
            backgroundColor: hoverBg,
          },
        '& tr:not([data-selected="true"]):not([data-pinned="true"]):hover > td:after':
          {
            backgroundColor: hoverBg,
          },
      }),
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: oddBg,
      draggingBorderColor: evenBg,
    }),
    muiTableHeadRowProps: {
      sx: {
        boxShadow: "none",
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => rowOnClick(row),
      onDoubleClick: () => onDoubleClick(row),
      sx: {
        boxShadow: "none",
        cursor: "pointer",
      },
    }),
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "600",
        fontSize: "14px",
        fontFamily: "Montserrat",
        // border: "none",
        borderLeft: !removeColors && "1px solid ",
        borderColor: themeMode == "light" ? "rgb(228, 226, 226)" : "#4F4F4F",
        background: !removeColors && headBg + "!important",
        padding: "0px !important",
        verticalAlign: "middle !important",
        ...(getAutoColumnWidth() ? { width: getAutoColumnWidth } : {}), // Conditional width
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontWeight: "500",
        fontSize: "13px",
        fontFamily: "Montserrat",
        textAlign: "left !important",
        textWrap: "nowrap",
        paddingLeft: "20px",
        borderLeft: !removeColors && "1px solid ",
        borderColor:
          !removeColors &&
          (themeMode == "light" ? "rgb(228, 226, 226)" : "#4F4F4F"),
        ...(getAutoColumnWidth() ? { width: getAutoColumnWidth } : {}), // Conditional width
        ...(removeColors
          ? {
              borderBottom: "none !important",
            }
          : {}),
      },
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 30,
    },
    muiLinearProgressProps: {
      color: "primary",
    },
  });

  const RenderExportToCSV = ({ table }) => (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <DropdownButton
        title={
          <Typography className="m-0 p-0">
            <MdOutlineFileDownload /> Export
          </Typography>
        }
        className="export-to-csv-button  p-0"
      >
        {enableExportToCSV && (
          <>
            <Dropdown.Item
              className="d-flex align-items-center"
              onClick={() => setImportModal(true)}
            >
              <FaRegFile size={12} className="mr-1" />{" "}
              <h5 className="my-1 font-size-m">Import from excel</h5>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleExportData}
              className="d-flex align-items-center"
            >
              {/* export all data to CSV */}
              <FaRegFile size={12} className="mr-1" />
              <h5 className="my-1 font-size-m">Export All to CSV</h5>
            </Dropdown.Item>

            <Dropdown.Item
              disabled={table.getRowModel().rows.length === 0}
              //export all rows as seen on the screen to CSV
              onClick={() => handleExportRows(table.getRowModel().rows, "ddsd")}
              className="d-flex align-items-center"
            >
              <FaRegFile size={12} className="mr-1" />{" "}
              <h5 className="my-1 font-size-m">Export Current Page to CSV</h5>
            </Dropdown.Item>
            {enableRowSelection && (
              <Dropdown.Item
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                onClick={() =>
                  handleExportRows(table.getSelectedRowModel().rows)
                } //  export selected rows  to CSV
                className={`d-flex align-items-center ${
                  enableExportToCSV && enableExportToPDF
                    ? "bottom-dashed-border"
                    : ""
                } `}
              >
                <FaRegFile size={12} className="mr-1" />{" "}
                <h5 className="my-1 font-size-m">
                  Export Selected Rows to CSV
                </h5>
              </Dropdown.Item>
            )}
          </>
        )}
        {enableExportToPDF && (
          <>
            <Dropdown.Item
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              onClick={
                () => handleExportPDF(table.getPrePaginationRowModel().rows) //* export all data to PDF
              }
              className="d-flex align-items-center"
            >
              <FaRegFilePdf size={12} className="mr-1" />
              <h5 className="my-1 font-size-m">Export All to PDF</h5>
            </Dropdown.Item>
            <Dropdown.Item
              disabled={table.getRowModel().rows.length === 0}
              onClick={() => handleExportPDF(table.getRowModel().rows)} //export all rows as seen on the screen to PDF
              className="d-flex align-items-center"
            >
              <FaRegFilePdf size={12} className="mr-1" />
              <h5 className="my-1 font-size-m">Export Current Page to PDF</h5>
            </Dropdown.Item>
            {enableRowSelection && (
              <Dropdown.Item
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //  export selected rows  to PDF
                onClick={() =>
                  handleExportPDF(table.getSelectedRowModel().rows)
                }
                className="d-flex align-items-center"
              >
                <FaRegFilePdf size={12} className="mr-1" />{" "}
                <h5 className="my-1 font-size-m">
                  Export Selected Rows to PDF
                </h5>
              </Dropdown.Item>
            )}
          </>
        )}
      </DropdownButton>
    </Box>
  );
  const handlePaginationChange = useCallback(
    (selection) => {
      onPaginationChange({
        ...pagination,
        from_date: selection.startDate,
        to_date: selection.endDate,
      });
    },
    [pagination, onPaginationChange]
  );
  return (
    <>
      <Stack sx={{ m: "0.5rem 0" }} className="material-table-container px-0">
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // marginLeft: "2px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Grid
            item
            xs={12}
            md={"auto"}
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "flex-start",
              marginLeft: searchMarginLeft,
              alignItems: "center",
            }}
          >
            {enableGlobalFilter && <MRT_GlobalFilterTextField table={table} />}
            {(enableExportToCSV || enableExportToPDF) && (
              <RenderExportToCSV table={table} />
            )}
            {enableRowSelection &&
              (table?.getIsAllRowsSelected() ||
                table?.getIsSomeRowsSelected()) && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: "15px",
                  }}
                >
                  <Typography variant="light" size="small">
                    {table?.getSelectedRowModel()?.rows?.length} of{" "}
                    {table?.getRowModel()?.rows?.length} row(s) selected
                  </Typography>
                </Box>
              )}
            <Grid item display={"flex"} alignItems={"center"}>
              {showAdditionalFilter && (
                <AddlFilter onChange={handlePaginationChange} />
              )}
              {headerSearchExtendComponent}
            </Grid>
          </Grid>
          <Grid item>{HeaderMiddleComponent}</Grid>
          {(enableTopToolbar || enablePagination) && (
            <Grid item xs={12} md={"auto"}>
              <Grid container className="d-flex align-items-center">
                {enablePagination && (
                  <Grid item xs={12} md={"auto"}>
                    <MRT_TablePagination table={table} />
                  </Grid>
                )}

                {enableTopToolbar && (
                  <Grid item xs={12} md={"auto"}>
                    <MRT_ToolbarInternalButtons table={table} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
        <Box
          className="position-relative table-progress-bar-container"
          sx={{ height: "5px" }}
        >
          <MRT_LinearProgressBar table={table} />
        </Box>
        <Box
          className={`material-table ${rowData?.length == 0 && "no-data-msg"}`}
          sx={{
            borderTop: "1px solid",
            borderColor:
              themeMode == "light" ? "rgb(228, 226, 226)" : "#4F4F4F",
          }}
        >
          <MRT_TableContainer table={table} style={{ maxHeight: maxHeight }} />
        </Box>

        {/* <MaterialReactTable table={table} /> */}
      </Stack>
      {/* //import modal */}
      {/* <Modal
        show={importModal}
        onHide={() => setImportModal(false)}
        centered
        className="medium-modal"
      >
        <Modal.Body className="px-3">
          <Box className="py-2 px-4">
            <Box mb={2}>
              <Typography variant="bold" size="medium">
                Import From Excel
              </Typography>
            </Box>
            <Box
              // className={`drag_and_drop_input w-100  h-100 file-input-upload ${style.drag_and_drop_input_service_sample}`}
            >
              <h4>Drag & Add files here</h4>
              <img src={fileUplodimg} height={35} width={35} />
              <h5 className={style.dandd_input_choose}>Choose from PC</h5>
              <label htmlFor={"file"}></label>
              <input
                type="file"
                id={"file"}
                multiple
                onChange={(e) => {
                  handleImport(e);
                }}
                className={style["file-input-service-sample"]}
              />
            </Box>
            <Box className=" d-flex  py-4 justify-content-start">
              <LoadingButton variant="save">Import</LoadingButton>
              <Button
                variant="cancel"
                className={`mx-2`}
                onClick={() => setImportModal(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default MaterialTable;
