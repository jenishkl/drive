import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import BadgeAvatar from "../Avatar/BadgeAvatar";
import { TagIcon, TagsIcon } from "../../../helpers/icons";
import SearchAndSelect from "../select/SearchAndSelect";
import { useSelector } from "react-redux";
import { crmClientSelector } from "../../../store/crm/clients/clientSlice";
import { crmDivisionSelector } from "../../../store/crm/divisions/divisionSlice";

export default function ClientHeader({ client }) {
  const [tag, setTag] = useState(null);
  const [tags, setTags] = useState([]);

  const { viewClientDivisionData, viewClientDivisionLoading } =
    useSelector(crmDivisionSelector);

  return (
    <>
      <Paper
        sx={{ top: "175px", position: "sticky", display: "flex" }}
        variant="header"
        className="d-flex gap-4 align-items-center px-2 py-1"
      >
        {" "}
        <Grid>
          <BadgeAvatar
            image={viewClientDivisionData?.client?.profile_img}
            isEdit={false}
          />
        </Grid>
        <Grid container className="d-flex flex-column gap-2">
          <Grid>
            <Typography
              size={"large"}
              variant="bold"
              component={"div"}
              className="singleLine"
              // sx={{ wordBreak: "break-all" }}
            >
              {viewClientDivisionData?.client?.name}
              {/* <Typography variant="light" size="medium" component={"span"}>
              (Abcd Law Firm)
            </Typography> */}
              {/* <Button
              variant=""
              size="small"
              sx={{ borderRadius: "5px", background: "#D9E1FF" }}
            >
              MedLegal
            </Button> */}
            </Typography>
          </Grid>
          <Grid container className="d-flex align-items-center gap-3">
            {/* <Box>
              {tag ? (
                <Box width={"220px"}>
                  <SearchAndSelect
                    onChange={handleTagSelect}
                    value={tags}
                    options={[
                      {
                        tag: () => (
                          <TagsIcon color={"#15A87C"} name={"PI Attorney"} />
                        ),
                        label: "a",
                      },
                      {
                        tag: () => (
                          <TagsIcon
                            color={"#F9C12A"}
                            name={"MedMal Attorney"}
                          />
                        ),
                        label: "b",
                      },
                      {
                        tag: () => <TagsIcon color={"#AF28DF"} name={"QME"} />,
                        label: "c",
                      },
                    ]}
                  />
                </Box>
              ) : (
                <Button
                  sx={{ textTransform: "unset" }}
                  onClick={() => setTag(true)}
                >
                  {TagIcon}
                  <Typography variant="light" size="small">
                    Add Tag
                  </Typography>
                </Button>
              )}
            </Box> */}
            <Grid item>
              <Typography variant="light" size="medium" color={"#00A843"}>
                Client
              </Typography>
            </Grid>
            <Button
              size="small"
              sx={{ borderRadius: "5px", border: " 2px dashed #545252" }}
            >
              Client ID: {viewClientDivisionData?.client?.client_id}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
