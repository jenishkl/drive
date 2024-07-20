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
import { get, size } from "lodash";
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
        componentsProps={{
          paper: {
            sx: {
              border: "none !important",
              borderRadius: "5px",
              margin: "auto",
              boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
              mt: 1,
            },
          },
        }}
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
        loadingText={
          <Typography variant="light" size={"vsmall"}>
            Loading...
          </Typography>
        }
        noOptionsText={
          <Typography variant="light" size={"vsmall"}>
            No Results
          </Typography>
        }
        renderOption={(props, option, value) => {
          return (
            <Box {...props} sx={{ borderTop: "unset" }}>
              <Box width={"100%"} py={0.5}>
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
                        <Box width={"20px"} height={"20px"}>
                          <ImageCommon
                            original={true}
                            aspectRatio={1}
                            quality={50}
                            src={imageurl(option?.file_path)}
                          />
                        </Box>
                      ) : (
                        file_icon(option?.file_ext, 20)
                      )}
                    </>
                  )}
                  <Typography
                    // variant="light"
                    // size="small"
                    sx={{
                      fontSize: "13px !important",
                      fontWeight: "100 !important",
                    
                    }}
                  >
                    {option?.type == 1 ? option?.name : option?.file_name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Folders & Files"
            fullWidth
            variant="standard"
            sx={(theme) => ({
              caretColor: "black",
              border: "none",
              p: 0.5,
              background: theme?.palette?.input?.search,
            })}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              type: "search",
              // inputComponent: StyledInputBase,
              //   disableUnderline: disableUnderline,
              startAdornment: (
                <Box mx={1}>
                  <SearchIcon
                    fontSize="medium"
                    sx={(theme) => ({
                      color: "#adafb0",
                    })}
                  />
                </Box>
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
