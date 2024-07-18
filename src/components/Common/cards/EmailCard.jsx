import React, { useEffect, useMemo, useState } from "react";
import MaterialTable from "../MaterialReactTable";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Card, Paper, Tab, Tabs, Typography } from "@mui/material";
import SendEmailPopUp from "../Popups/SendEmailPopUp";
import { useForm } from "react-hook-form";
import { getMails, sendMail } from "../../../store/crm/others/otherActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SMP, USER } from "../../../helpers/utils";
import { toast } from "sonner";
import { rest } from "lodash";
export default function EmailCard({
  submodule_id,
  module,
  client_id,
  case_id,
  facility_id,
  to,
  sxHead = {},
  size = "high",
}) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    defaultValues: {
      from: USER?.email,
      recipient_email: to,
    },
    shouldUnregister: false,
    // resolver: yupResolver(schema),
  });
  const { mails } = useSelector((state) => ({
    mails: state.crm.otherSlice?.getMails?.data?.data,
  }));
  const params = useParams();
  const dispatch = useDispatch();
  let formProps = {
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    errors,
    isDirty,
    dirtyFields,
  };
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailTab, setEmailtab] = useState(1);
  const [emailss, setEmailss] = useState();
  const [mailStatus, setMailStatus] = useState();
  useEffect(() => {}, [emailTab]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "subject", //accessorFn used to join multiple data into a single cell
        id: "subject", //id is still required when using accessorFn instead of accessorKey
        header: "",
        size: 250,
        Header: () => (
          <div
            style={{
              textAlign: "start !important",
            }}
          >
            Subject
          </div>
        ),
      },
      {
        accessorKey: "body", //accessorFn used to join multiple data into a single cell
        id: "body", //id is still required when using accessorFn instead of accessorKey
        header: "Body",
        size: 250,
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            <Typography
              component={"div"}
              dangerouslySetInnerHTML={{ __html: renderedCellValue }}
            ></Typography>
          </>
        ),
      },

      {
        id: "Email",
        accessorKey: "recipient_email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        // filterVariant: 'autocomplete',
        header: "Email",
        // size: 300,
      },
      {
        id: "is_delivered",
        accessorKey: "is_delivered", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        // filterVariant: 'autocomplete',
        header: "Status",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            {renderedCellValue == 0 ? (
              <Typography>Not Delivered</Typography>
            ) : (
              <Typography>Delivered</Typography>
            )}
          </>
        ),
        // size: 300,
      },
      {
        id: "mail_status",
        accessorKey: "mail_status", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Mail Status",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            {renderedCellValue == 0 ? (
              <Typography>Not Opened</Typography>
            ) : (
              <Typography>Opened</Typography>
            )}
          </>
        ),
        // size: 300,
      },
      {
        id: "is_active",
        accessorKey: "is_active", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        // filterVariant: 'autocomplete',
        header: "Mail info",
        Cell: ({ renderedCellValue, row: { original } }) => (
          <>
            {renderedCellValue == 0 ? (
              <Typography>drafted</Typography>
            ) : renderedCellValue == 1 ? (
              <Typography>Send</Typography>
            ) : (
              <Typography>Schedule</Typography>
            )}
          </>
        ),
        // size: 300,
      },
    ],
    []
  );

  const handleSendEmail = async (data) => {
    try {
      data.submodule_id = submodule_id;
      data.client_or_company_id = client_id;
      data.created_by = USER.id;
      data.facility_id = facility_id;
      data.case_id = case_id;
      console.log(data);
      await dispatch(sendMail(data))
        .unwrap()
        .then((data) => {
          toast.success(data?.msg);
        });
      setEmailOpen(null);
      dispatch(
        getMails({
          params: {
            sub_module_id: submodule_id,
            client_or_company_id: client_id,
            case_id,
            facility_id,
          },
        })
      );
      // setOpen(false);
    } catch (error) {
      setEmailOpen(null);
      return console.log(error);
    }
  };

  useEffect(() => {
    dispatch(
      getMails({
        params: {
          sub_module_id: submodule_id,
          client_or_company_id: client_id,
          case_id,
          facility_id,
        },
      })
    );
  }, []);
  useEffect(() => {
    reset({ recipient_email: to });
  }, [to]);
  useEffect(() => {
    if (emailTab == 0) {
      let mail = mails?.filter((it) => it?.is_active == 0);
      setEmailss(mail);
    }
    if (emailTab == 1) {
      setEmailss(mails);
    }
    if (emailTab == 2) {
      let mail = mails?.filter((it) => it?.is_active == 2);
      setEmailss(mail);
    }
  }, [mails, emailTab]);
  return (
    <Box className="d-flex flex-column gap-4" key={emailOpen}>
      <Box>
        <Typography variant="bold" size={size} sx={sxHead}>
          Email
        </Typography>
      </Box>
      <Card className="px-">
        <Box className="py-2 d-flex justify-content-between align-items-center">
          <Tabs
            value={emailTab}
            textColor="primary"
            onChange={(e, v) => {
              setEmailtab(v);
            }}
            indicatorColor="transparant"
            aria-label="secondary tabs example"
          >
            <Tab value={1} label="All" />
            <Tab value={0} label="Drafts" />
            <Tab value={2} label="Scheduled" />
          </Tabs>
          <Button
            size="small"
            variant="contained"
            className={`mx-3 ${SMP(module, 3)}`}
            onClick={() => setEmailOpen(true)}
          >
            Create Email
          </Button>
        </Box>
        <MaterialTable
          columnData={columns}
          rowData={emailss ?? []}
          // muiTableBodyCellProps={muiTableBodyCellProps}
          enablePagination={false}
          enableTopToolbar={false}
        />
      </Card>
      <SendEmailPopUp
        open={emailOpen}
        setOpen={setEmailOpen}
        formProps={formProps}
        onClose={() => {
          reset({}, {});
          setEmailOpen(null);
        }}
        onSubmit={handleSubmit(handleSendEmail)}
      />
    </Box>
  );
}
