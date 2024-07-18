import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MaterialTable from "../MaterialReactTable";
import { useNavigate } from "react-router-dom";
import PayNow from "../../../pages/Payment/PayNow";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerCommission } from "../../../store/billing/invoiceBillingActions";

export default function PayoutCard({ id }) {
  const state = useSelector((state) => state.invoiceBilling);
  const PartnerCommission = useMemo(
    () => state.PartnerCommission?.data?.data,
    [state]
  );
  const dispatch = useDispatch();
  const fetchPartnerCommission = async () => {
    await dispatch(getPartnerCommission(id));
  };
  const [validationErrors, setValidationErrors] = useState({});
  //keep track of rows that have been edited
  const [commission, setCommission] = useState();
  useEffect(() => {
    fetchPartnerCommission();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "grossRevenue",
        header: "Total Gross Revenue",
        // size: 250,
      },
      {
        accessorKey: "netRevenue",
        header: "Total net revenue",
        // size: 250,
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            <Typography>${renderedCellValue}</Typography>
          </>
        ),
      },
      {
        accessorKey: "commission",
        header: "Total Gross Commision",
      },
      {
        accessorKey: "set_commision",
        header: "Set Commision",
        Cell: ({ renderedCellValue }) => (
          <Box
            className="p-1 mui-date-small  "
            sx={{
              borderRadius: 1,
              textAlign: "center",
              justifySelf: "center",
            }}
          >
            <TextField
              type="number"
              onChange={(e) => setCommission(e.target.value)}
              required
              placeholder="Enter Commission"
              value={commission}
            ></TextField>
          </Box>
        ),
      },
    ],
    []
  );
  const columns2 = useMemo(
    () => [
      {
        accessorKey: "Si.No", //accessorFn used to join multiple data into a single cell
        id: "subject", //id is still required when using accessorFn instead of accessorKey
        header: "SI No",
        size: 250,
      },
      {
        accessorKey: "subject", //accessorFn used to join multiple data into a single cell
        id: "subject", //id is still required when using accessorFn instead of accessorKey
        header: "Pay Out Date",
        size: 250,
      },
      {
        accessorKey: "subject", //accessorFn used to join multiple data into a single cell
        id: "subject", //id is still required when using accessorFn instead of accessorKey
        header: "Pay Out Amount",
        size: 250,
      },
    ],
    []
  );
  const renderPartnerAction = ({ row }) => (
    <Box>
      {row?.original?.commission > 0 && (
        <PayNow
          amount={row?.original?.commission}
          data={row?.original}
          id={row?.original?.partner?.id}
          type={"commission"}
          commission={commission}
          disabled={!commission}
        />
      )}
    </Box>
  );
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="bold" size={"high"} component={"div"}>
          PayOut
        </Typography>
      </Box>
      <Card className="p-5">
        <Typography>Commission %: {"10"}</Typography>
        <MaterialTable
          columnData={columns}
          isLoading={state?.PartnerCommission?.loading}
          rowData={PartnerCommission ? [PartnerCommission] : []}
          enableRowActions={true}
          actionMenuWidth={150}
          // muiTableBodyCellProps={muiTableBodyCellProps}
          enablePagination={false}
          enableColumnActions={false}
          enableGlobalFilter={false}
          enableSorting={false}
          renderRowActions={renderPartnerAction}
          enableTopToolbar={false}
        />
      </Card>

      <MaterialTable
        columnData={columns2}
        rowData={[]}
        // muiTableBodyCellProps={muiTableBodyCellProps}
        enablePagination={false}
        enableColumnActions={false}
        enableGlobalFilter={false}
        enableTopToolbar={false}
      />
    </>
  );
}
