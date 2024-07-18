import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { BellIcon, DeleteIcon, EditIcon } from "../../../helpers/icons";
import { GlobalContext } from "../../../layout/GlobalContextProvider";
import { useForm } from "react-hook-form";
import StringField from "../InputFields/StringField";
import PopUpForm from "../Popups/PopUpForm";
import { useState } from "react";
import ConfirmPopUp from "../Popups/ConfirmPopUp";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../../../store/crm/others/otherActions";
import { useEffect } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import { SMP } from "../../../helpers/utils";
import { findModuleId } from "../helper";
import { _notes } from "../../../helpers/moduleLinks";

export default function Notes({ submodule_id, customer_id, module }) {
  const { popUpForm, setPopupForm, confirmPopUp, setConfirmPopUp } =
    useContext(GlobalContext) || {};
  const [open, setOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const {
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {},
  });
  const { notes, createNoteLoading } = useSelector((state) => ({
    notes: state.crm.otherSlice?.getNotes?.data?.data,
    createNoteLoading: state.crm.otherSlice?.createNote?.loading,
  }));
  const formProps = {
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    isDirty,
    isValid,
  };

  const handleAddNotes = async (data) => {
    try {
      data = {
        ...data,
        submodule_id,
        case_or_company_or_client_id: customer_id,
        created_by: 1,
      };
      data.module_id = findModuleId(_notes);
      data.app_id = 1;
      if (data.date) {
        data.is_reminder = 1;
      }
      if (data.is_private == true) {
        data.is_private = 1;
      } else data.is_private = 0;
      if (open == "Create") {
        await dispatch(createNote(data)).unwrap();
        toast.success("Note created successfully");
      } else {
        await dispatch(updateNote(data)).unwrap();
        toast.success("Note updated successfully");
      }
      dispatch(getNotes({ module_id: submodule_id, id: params?.id }));
      setOpen(null);
    } catch (error) {}
  };
  const note_field = useMemo(
    () => ({
      title: open + "Note",
      formProps,
      fields: [
        // { name: "category", type: "select", label: "Category", options: [] },
        { name: "content", type: "textArea", min: 5, label: "Note" },

        {
          name: "is_reminder",
          type: "checkbox",
          label: "Set Reminder",
        },
        watch("is_reminder") == true && {
          name: "date",
          type: "date",
          min: 5,
          label: "Reminder",
        },
        {
          name: "is_private",
          type: "switch",
          label1: "Public",
          label2: "Private",
        },
      ],
      onSubmit: handleSubmit(handleAddNotes),
    }),
    [open, watch("is_reminder")]
  );
  const handleDeleteNote = async (id) => {
    try {
      await dispatch(deleteNote(id)).unwrap();
      dispatch(getNotes({ module_id: submodule_id, id: params?.id }));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getNotes({ module_id: submodule_id, id: params?.id }));
  }, []);
  return (
    <>
      <Box
        className="d-flex flex-column gap-4"
        maxHeight={"500px"}
        overflow={"auto"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="bold" size={"high"} component={"div"}>
            Notes
          </Typography>
          <Button
            variant="contained"
            className={`${SMP(module, 3)}`}
            onClick={() => {
              setOpen("Create");
            }}
          >
            + Add Note
            {/* {edit ? "Save" : "Edit"} */}
          </Button>
        </Box>
        <Box maxHeight={"400px"} overflow={"scroll"}>
          {notes?.map((it, i) => (
            <Card sx={{ p: 4 }}>
              <Box className="d-flex flex-row  justify-content-between">
                <Box className="d-flex flex-row  align-items-center gap-4">
                  <Avatar variant="solid" />
                  <Box>
                    <Typography variant="light" size="medium" component={"div"}>
                      {it?.content}
                    </Typography>
                    <Typography variant="light" size="medium">
                      Created by {it?.user?.name}{" "}
                      {dayjs(it?.created_at).format("hh:mm A MMM DD, YYYY")}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  className={`d-flex flex-row  align-items-center ${SMP(
                    module,
                    3,
                    true
                  )}`}
                >
                  <IconButton
                    onClick={() => {
                      reset(it);
                      setOpen("Update");
                    }}
                  >
                    {EditIcon}
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      setConfirmPopUp({
                        onSubmit: () => handleDeleteNote(it?.id),
                        content: "Are you sure to delete note",
                      })
                    }
                  >
                    {DeleteIcon}
                  </IconButton>
                  <IconButton>{BellIcon}</IconButton>
                </Box>
              </Box>
            </Card>
          ))}
          {!notes?.[0] && (
            <Card sx={{ p: 4 }}>
              <center>No Notes</center>
            </Card>
          )}
        </Box>
      </Box>
      {open && (
        <PopUpForm
          fieldDatas={note_field}
          loading={createNoteLoading}
          onClose={() => setOpen(false)}
          open={open}
        />
      )}
      {/* <ConfirmPopUp props={}/> */}
    </>
  );
}
