import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { FaSearch } from "react-icons/fa";
import SearchIcon from '@mui/icons-material/Search';
export default function Search({onChange,options=[],multiple,value=undefined}) {
  return (
    <>
      {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        // options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      /> */}
      <Autocomplete
        freeSolo
        size="small"
        fullWidth
        value={value}
        id="free-solo-2-demo"
        disableClearable
        options={options}
        multiple={multiple}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Search input"
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: (
                <>
                  <SearchIcon/>
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
}
