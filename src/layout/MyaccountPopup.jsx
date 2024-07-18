"use client";
import * as React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  Stack,
  IconButton,
  Grid,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RiUserSettingsLine } from "react-icons/ri";

import { toast } from "sonner";
import BadgeAvatar from "@/components/Common/Avatar/BadgeAvatar";
import { SESSION } from "@/helpers/localSessions";
import LoadingButton from "@/components/Common/Buttons/LoadingButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { TM, USER, imageurl, randomColor } from "@/helpers/utils";
import Link from "next/link";
import { MYACCOUNT_URL } from "@/helpers/envis";

export default function MyAccountPopUp() {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  // const handleLogout = async () => {
  //   try {
  //     var res = await dispatch(logout());
  //     if (res?.payload?.status == 200) {
  //       toast.success(res.payload?.message);
  //     }
  //   } catch (e) {
  //     console.log("e", e);
  //   }
  // };
  return (
    <>
      <div>
        <ClickAwayListener
          onClickAway={() => {
            setOpen(false);
          }}
        >
          <Box>
            <Tooltip
              arrow
              placement="bottom"
              title={
                <>
                  <Box
                    sx={{
                      pt: 4,
                      // pb: 1,
                      position: "relative",
                      maxWidth: "290px",
                      background: theme?.palette?.background1,
                      borderRadius: "20px",
                    }}
                  >
                    <Stack
                      direction={"column"}
                      alignItems={"center"}
                      gap={2}
                      sx={{
                        background: theme?.palette?.primary?.main,
                        p: 3,
                        mt: 5,
                      }}
                    >
                      <Box position={"absolute"} top={35}>
                        <BadgeAvatar
                          size="large"
                          id={"profile_img"}
                          image={USER.profile_img}
                          name={USER?.name}
                        />
                      </Box>
                      <Typography
                        color={"white"}
                        variant={"bold"}
                        size={"high"}
                        sx={{ mt: 2 }}
                      >
                        {USER?.name}
                      </Typography>
                      <Typography
                        sx={{
                          background: theme?.palette?.background2,
                          px: 3,
                          borderRadius: "100px",
                        }}
                        variant={"bold"}
                        size={"medium"}
                      >
                        {USER?.display_name}
                      </Typography>
                      <Box>
                        <Box>
                          <Typography
                            variant="bold"
                            size={"xsmall"}
                            style={{ color: "white" }}
                          >
                            Email : {USER?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                    <Box>
                      <Stack direction={"column"} gap={1} px={3} py={2}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          gap={2}
                          style={{
                            margin: "5px",
                            padding: "0px 30px",
                          }}
                        >
                          {" "}
                          <Link
                            href={`${MYACCOUNT_URL}`}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <ManageAccountsIcon
                            // sx={{
                            //   color:
                            //     TM == "light"
                            //       ? "#fff !important"
                            //       : "#000 !important",
                            // }}
                            />

                            <Typography
                              className="popup-items"
                              variant="light"
                              size={"medium"}
                            >
                              My Account
                            </Typography>
                          </Link>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        width={"100%"}
                        pb={3}
                      >
                        {/* <LoadingButton
                          variant="danger"
                          sx={{ borderRadius: "20px", minWidth: 120 }}
                          label={"Logout"}
                          loading={state?.logout?.loading}
                          onClick={handleLogout}
                        /> */}
                      </Stack>
                    </Box>
                  </Box>
                </>
              }
              open={open}
            >
              <IconButton aria-label="" onClick={() => setOpen(!open)}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    background: randomColor(USER?.name?.slice(0, 2)),
                  }}
                  src={imageurl(USER?.profile_img)}
                >
                  {USER?.name?.slice(0, 2)?.toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </ClickAwayListener>
      </div>
    </>
  );
}
