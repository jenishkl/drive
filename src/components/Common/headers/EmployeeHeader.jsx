import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import BadgeAvatar from "../Avatar/BadgeAvatar";
import { TagIcon, TagsIcon } from "../../../helpers/icons";
import SearchAndSelect from "../select/SearchAndSelect";
import { useSelector } from "react-redux";
import { crmDivisionSelector } from "../../../store/crm/divisions/divisionSlice";
import TagSelect from "../dropdowns/TagSelect";
import { Each } from "../../../helpers/utils";

export default function EmployeeHeader() {
  const [tag, setTag] = useState(null);
  const [tags, setTags] = useState([]);
  const { viewEmployeeDivisionData } = useSelector(crmDivisionSelector);
  const handleTagSelect = (e, v) => {
    try {
      if (v?.[0]) setTags([v[v?.length - 1]]);
    } catch (error) {}
  };
  return (
    <>
      <Paper
        sx={{ top: "175px", position: "sticky" }}
        variant="header"
        className="d-flex gap-4 align-items-center px-2 py-1"
      >
        <BadgeAvatar image={viewEmployeeDivisionData?.profile_img} />
        <Grid container className="d-flex flex-column gap-2">
          <Grid item></Grid>
          <Typography
            size={"large"}
            variant="bold"
            component={"div"}
            className="d-flex align-items-center gap-3"
            sx={{ wordBreak: "break-all" }}
          >
            {viewEmployeeDivisionData?.name}
            {/* <Typography variant="light" size="medium" component={"span"}>
              (Abcd Law Firm)
            </Typography> */}
            <Each
              of={viewEmployeeDivisionData?.division}
              render={(it) => (
                <Button
                  //   variant=""
                  size="small"
                  //   className="py-0"
                  sx={{ borderRadius: "5px", background: "#D9E1FF" }}
                >
                  {it?.division_name?.name}
                </Button>
              )}
            />
          </Typography>
          <Grid container className="d-flex align-items-center gap-3">
            <Box sx={{pointerEvents:"none"}}>
              <TagSelect
                module_id={39}
                defaultValue={viewEmployeeDivisionData?.tag}
              />
            </Box>
            <Grid item>
              <Typography variant="light" size="medium" color={"#00A843"}>
                {viewEmployeeDivisionData?.role?.name}
              </Typography>
            </Grid>
            <Button
              size="small"
              sx={{ borderRadius: "5px", border: " 2px dashed #545252" }}
            >
              Employee ID:{viewEmployeeDivisionData?.emp_id}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
