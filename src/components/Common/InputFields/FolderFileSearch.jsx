"use client";
import { driveSelector } from "@/store/drive/driveSlice";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { get } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import { searchFolderFile } from "@/store/drive/driveActions";
import {
  encriptData,
  file_icon,
  folder,
  imageTypes,
  imageurl,
} from "@/helpers/utils";
import ImageCommon from "@/components/imagecomponent/ImageCommon";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next-nprogress-bar";
import { styled, useTheme } from "@mui/material/styles";
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "40ch",
  [theme.breakpoints.down("md")]: {
    width: "20ch",
  },
  [theme.breakpoints.down("sm")]: {
    width: "15ch",
  },
  padding: theme.spacing(0, 2),
  "& .MuiInputBase-input": {
    paddingLeft: `5px`,
    transition: theme.transitions.create("width"),
  },
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    // backgroundColor: theme?.palette?.input?.search_hover,
  },
  // backgroundColor: theme?.palette?.input?.search,
}));
export default function FolderFileSearch() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState();
  const { searchFolderFileData, searchFolderFileLoading } =
    useSelector(driveSelector);
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedOnChange = React.useCallback(
    debounce((newValue, index, i, type) => {
      setSearch(newValue);
    }, 300),
    []
  );
  React.useEffect(() => {
    if (search) {
      dispatch(searchFolderFile({ search: search }));
    }
  }, [search]);
  return (
    <>
      <Autocomplete
        size="small"
        fullWidth
        forcePopupIcon={false}
        className="border-0"
        sx={(theme) => ({
          borderRadius: theme.shape.borderRadius,

          "&:hover": {
            backgroundColor: theme?.palette?.input?.search_hover,
          },
          backgroundColor: theme?.palette?.input?.search,
        })}
        clearIcon={true}
        filterSelectedOptions
        loading={searchFolderFileLoading}
        options={searchFolderFileData ?? []}
        getOptionLabel={(option) =>
          option?.type == 1 ? get(option, "name") : option?.file_name
        }
        onChange={(e, v, reason, detail) => {
          if (v?.type == 1) {
            router?.push(`/drive/${encriptData(folder(v?.id, v?.drive))}`);
          }
          if (v?.type == 2) {
            router?.push(
              `/drive/${encriptData(
                folder(v?.folder_id, v?.drive)
              )}/${encriptData(v?.id)}`
            );
          }
        }}
        id="free-folder search"
        onInputChange={(e, v) => {
          debouncedOnChange(v);
        }}
        noOptionsText={"No Results"}
        renderOption={(props, option, value) => {
          return (
            <Paper sx={{ borderTop: "unset" }} {...props}>
              <Box width={"100%"}>
                <Box
                  width={"100%"}
                  gap={1}
                  display={"flex"}
                  justifyContent={"flex-start"}
                >
                  {option?.type == 1 && (
                    <FolderIcon
                      sx={{ color: option?.folder_color ?? "grey !important" }}
                    />
                  )}
                  {option?.type == 2 && (
                    <>
                      {imageTypes?.includes(option?.file_ext) ? (
                        <Box width={"50px"} height={"50px"}>
                          <ImageCommon
                            original={true}
                            aspectRatio={1}
                            quality={50}
                            src={imageurl(option?.file_path)}
                          />
                        </Box>
                      ) : (
                        file_icon(option?.file_ext)
                      )}
                    </>
                  )}
                  <Typography>
                    {option?.type == 1 ? option?.name : option?.file_name}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Folders&Files"
            fullWidth
            variant="standard"
            sx={(theme) => ({
              caretColor: "black",
              border: "none",
              p: 1,
              background: theme?.palette?.input?.search,
            })}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              type: "search",
              // inputComponent: StyledInputBase,
              //   disableUnderline: disableUnderline,
              startAdornment: (
                <>
                  <SearchIcon />
                </>
              ),
              endAdornment: (
                <React.Fragment>
                  {searchFolderFileLoading &&
                    searchFolderFileData?.length == 0 && (
                      <ThreeDots
                        visible={true}
                        height="20"
                        width="20"
                        radius="9"
                        ariaLabel="three-dots-searchFolderFileLoading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        color={"#9E9E9E"}
                      />
                    )}{" "}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
