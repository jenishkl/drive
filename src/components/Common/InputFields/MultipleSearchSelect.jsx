import { Chip, Grid } from "@mui/material";
import React from "react";
import Search from "../search/Search";
import { Each } from "../../../helpers/utils";

export default function MultipleSearchSelect({ formProps, name,options }) {
  const { setValue ,watch} = formProps||{};

  const handleSearch = (e, v,i) => {
    setValue(name, e, { shouldValidate: true });
  };
  const handleRemove =(e,v)=>{
setValue()
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} className="row-align-center gap-3">
          <Search
            multiple={true}
            onChange={handleSearch}
            options={options}
          />
          <Chip
            variant="primary"
            color="primary"
            label={"Clear All"}
            onDelete={()=>setValue(name,[])}
          />
          <Chip label={`${watch(name).length} selected`} />
        </Grid>
        {
          <Each
            of={watch(name)}
            render={(item,i) => (
              <Grid item xs={2}>
                {/* <Chip label={item?.label} onDelete={() => handleRemove(item),i} /> */}
              </Grid>
            )}
          />
        }
      </Grid>
    </>
  );
}
