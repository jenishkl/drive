import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TagIcon, TagsIcon } from "../../../helpers/icons";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../../store/crm/tags/tagActions";
import { crmtagSelector } from "../../../store/crm/tags/tagSlice";

export default function TagSelect({
  options,
  onChange,
  loading,
  defaultValue,
  module_id,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const { getTagsLoading: tagsLoading, getTagsData: tags } =
    useSelector(crmtagSelector);
  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <>
      {/* {defaultValue && (
        <>
          <TagsIcon color={defaultValue?.color} name={defaultValue?.name} />
        </>
      )} */}
      {loading ? (
        <Skeleton width={"100px"} height={"20px"} />
      ) : (
        <>
          {!open && (
            <Button
              sx={{ textTransform: "unset" }}
              onClick={() => setOpen(true)}
            >
              {defaultValue ? (
                <TagsIcon
                  color={defaultValue?.color_code ?? "black"}
                  name={defaultValue?.name ?? "Add tag"}
                />
              ) : (
                <>
                  {TagIcon}
                  <Typography variant="light" size="small">
                    Add Tag
                  </Typography>
                </>
              )}
            </Button>
          )}
        </>
      )}
      <Box sx={{ display: (!open || loading) && "none" }}>
        <Autocomplete
          // freeSolo={false}
          multiple
          size="small"
          fullWidth
          sx={{ width: "150px" }}
          id="free-solo-2-demo"
          disableClearable
          options={
            tags?.tag?.filter((it, i) => it?.submodule_id == module_id) ?? []
          }
          value={value}
          onBlur={() => {
            setOpen(false);
            onChange(value);
          }}
          loading={tagsLoading}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map(
              (option, index) =>
                index == tagValue?.length - 1 && (
                  <TagsIcon color={option?.color_code} name={option?.name} />
                )
            )
          }
          // onSelect={(e,v)=>console.log(e,v)}
          onChange={(e, v) => setValue(v[v?.length - 1])}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              // label="Search input"
              placeholder="Change"
              InputProps={{
                ...params.InputProps,
                type: "search",
                disableUnderline: true,
                // endAdornment: (
                //   <>{tagsLoading ? <CircularProgress size={"10px"} /> : ""}</>
                // ),
              }}
              SelectProps={{ IconComponent: () => null }}
            />
          )}
          renderOption={(props, option, state, ownerState) => (
            <li {...props}>
              <TagsIcon color={option?.color_code} name={option?.name} />
            </li>
          )}
        />
      </Box>
    </>
  );
}
