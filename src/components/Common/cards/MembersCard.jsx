import React, { useEffect, useMemo, useState } from "react";
import MaterialTable from "../MaterialReactTable";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Card, Paper, Tab, Tabs, Typography } from "@mui/material";
import SendEmailPopUp from "../Popups/SendEmailPopUp";
import { useForm } from "react-hook-form";
import Link from "../Link/Link";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../../store/crm/clients/clientActions";
import { useParams } from "react-router-dom";
import { SMP } from "../../../helpers/utils";

export default function MembersCard({ members }) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    defaultValues: {},
    // resolver: yupResolver(schema),
  });
  let formProps = {
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    isDirty,
    dirtyFields,
  };
  const dispatch = useDispatch();
  const params = useParams();
  const { clients, company } = useSelector((state) => ({
    clients: state.crm.clientSlice.viewClient?.data?.data,
    company: state.crm.clientSlice.viewCompany?.data?.data,
  }));
  const [emailOpen, setEmailOpen] = useState(true);
  const [emailTab, setEmailtab] = useState("all");
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //accessorFn used to join multiple data into a single cell
        id: "name", //id is still required when using accessorFn instead of accessorKey
        header: "Name",
      },
      {
        id: "designation",
        accessorKey: "job_role", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Designation",
        // size: 300,
      },
      {
        id: "Email",
        accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Email",
        // size: 300,
      },
      {
        id: "phone",
        accessorKey: "phone", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Phone Number",
        // size: 300,
      },
      {
        id: "is_pending",
        accessorKey: "is_pending", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Status",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            {renderedCellValue == 1 ? (
              <Typography color={"#9A2DEF"}> Invite Pending</Typography>
            ) : (
              <Typography color={"green"}>Active</Typography>
            )}
          </>
        ),
        // size: 300,
      },
    ],
    []
  );
  let muiTableBodyCellProps = {
    sx: {
      fontWeight: "500",
      fontSize: "13px",
      fontFamily: "Montserrat",
      textAlign: "left !important",
      paddingLeft: "20px",
    },
  };
  let module = window.location.pathname.split("/").includes("company")
    ? "company"
    : "client";
  useEffect(() => {
    dispatch(getClients());
  }, []);
  return (
    <Box className="d-flex flex-column gap-4">
      <Box>
        <Typography variant="bold" size={"high"}>
          Members
        </Typography>
      </Box>
      <Card className="px-">
        {/* <Box className="py-2 d-flex justify-content-end align-items-center">
          <Link to={`invite-member`}>
            <Button variant="contained" className="mx-3">
              Invite Member
            </Button>
          </Link>
        </Box> */}
        <MaterialTable
          columnData={columns}
          rowData={members}
          HeaderMiddleComponent={
            <Box className="py-2 d-flex justify-content-end align-items-center">
              <Link to={`invite-member`}>
                <Button
                  variant="contained"
                  className={`${SMP(
                    module == "client" ? "Clients" : "Company",
                    3
                  )} mx-3`}
                >
                  Invite Member
                </Button>
              </Link>
            </Box>
          }
          // muiTableBodyCellProps={muiTableBodyCellProps}
          enablePagination={false}
          enableTopToolbar={false}
          enableEditing={false}
        />
      </Card>
    </Box>
  );
}
