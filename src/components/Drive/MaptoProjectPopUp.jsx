import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ListItemIcon, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import SelectField from "../Common/InputFields/SelectField";
import LoadingButton from "../Common/Buttons/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { IconMenuItem } from "mui-nested-menu";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { asignProject } from "@/store/drive/driveActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { driveSelector } from "@/store/drive/driveSlice";
import { AiOutlineFileAdd } from "react-icons/ai";
export default function MaptoProjectPopUp({ folder_id, drive }) {
  const [maptoOpen, setMaptoOpen] = useState(false);
  const { asignProjectLoading } = useSelector(driveSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const handleAsignProject = async (data) => {
    try {
      await dispatch(asignProject({ folder_id, app_id: data?.app_id }))
        .unwrap()
        .then((d) => {
          toast.success(d?.message);
          setMaptoOpen(false);
          router.refresh();
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <IconMenuItem
        onClick={() => setMaptoOpen(true)}
        leftIcon={<AiOutlineFileAdd size={20} />}
        // rightIcon={<SaveIcon />}
        label="Assign Project"
      />
      <Dialog sx={{ mt: 3 }} open={maptoOpen} fullWidth aria-labelledby={"ddd"}>
        <DialogTitle id={"ss"}>Select Project</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 3 }}>
            <SelectField
              control={control}
              name={"app_id"}
              label={"Select Project"}
              options={[
                {
                  label: "Casedrive",
                  value: 1,
                },
                {
                  label: "Digital Marketing",
                  value: 2,
                },
              ]}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMaptoOpen(false)} color="primary">
            Cancel
          </Button>
          <LoadingButton
            label="Save"
            loading={asignProjectLoading}
            onClick={handleSubmit(handleAsignProject)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
