import HeaderDynamic from "../../../../components/Common/headers/HeaderDynamic";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useParams } from "react-router-dom";
import SelectField from "../../../../components/Common/InputFields/SelectField";
import FileCard from "../../../../components/Drive/FIleCard";
export default function Slug() {
  const params = useParams();
  const { control, setValue } = useForm();
  const formProps = { control, setValue };
  const [listView, setListView] = useState(false);
  const [slug, setSlug] = useState([]);
  const left = (
    <Grid container spacing={4}>
      <Grid item md={4} lg={3}>
        <SelectField
          {...formProps}
          name={"file_type"}
          options={[]}
          label={"File type"}
        />
      </Grid>
      <Grid item md={4} lg={3}>
        <SelectField
          {...formProps}
          name={"file_type"}
          options={[]}
          label={"People"}
        />
      </Grid>
      <Grid item md={4} lg={3}>
        <SelectField
          {...formProps}
          name={"file_type"}
          options={[]}
          label={"Filter"}
        />
      </Grid>
    </Grid>
  );
  const right = (
    <>
      {/* <Button variant="contained" size="medium">
        + New
      </Button> */}
      {!listView && (
        <IconButton
          size="medium"
          variant="outlined"
          onClick={() => setListView(!listView)}
        >
          <FormatListBulletedIcon />
        </IconButton>
      )}
      {listView && (
        <IconButton
          size="medium"
          variant="outlined"
          onClick={() => setListView(!listView)}
        >
          <GridViewIcon />
        </IconButton>
      )}
    </>
  );
  useEffect(() => {
    setSlug(() => params["*"]?.split("/"));
  }, [params]);
  return (
    <>
      <HeaderDynamic left={left} padding={2} right={right} />
      <>
        <Grid container spacing={4} padding={2}>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <FileCard file_type="pdf" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <FileCard file_type="jpg"/>
          </Grid>
        </Grid>
      </>
    </>
  );
}
