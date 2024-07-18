import * as React from "react";
import "./headers.css";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import BadgeAvatar from "../../components/Common/Avatar/BadgeAvatar";
import {
  Stack,
  IconButton,
  Grid,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  USER,
  clearSessionStorage,
  encode,
  getSessionStorage,
  imageurl,
  setSessionStorage,
} from "../../helpers/utils";
import { updateLeadImage } from "../../store/crm/leads/leadsActions";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import { GoGift } from "react-icons/go";
import { PiTelegramLogo } from "react-icons/pi";
import { SESSION } from "../../helpers/localSessions";
import { get } from "../../components/Common/helper";
import { logout } from "../../store/cases/orderIntakeActions";
import { LOG_OUT_USER } from "../../store/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/Common/Buttons/LoadingButton";

export default function MyAccountPopUp() {
  const [open, setOpen] = React.useState(false);
  const state = useSelector((state) => state.orderIntake);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const handleLogout = async () => {
    try {
      var res = await dispatch(logout());
      if (res?.payload?.status == 200) {
        toast.success(res.payload?.message);
      }
      await clearSessionStorage();
      await dispatch(LOG_OUT_USER());
      window.location.replace(import.meta.env.VITE_APP_MYACCOUNT_LOGIN_URL);
    } catch (e) {
      console.log("e", e);
    }
  };
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
                          image={imageurl(
                            getSessionStorage(SESSION.PROFILE_IMG)
                          )}
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
                        {USER?.profileName}
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
                          <RiUserSettingsLine size={20} />
                          <Typography
                            className="popup-items"
                            variant="light"
                            size={"medium"}
                            onClick={() =>
                              window.open(
                                import.meta.env.VITE_APP_MYACCOUNT_URL,
                                "_blank"
                              )
                            }
                          >
                            My Account
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        width={"100%"}
                        pb={3}
                      >
                        <LoadingButton
                          variant="danger"
                          sx={{ borderRadius: "20px", minWidth: 120 }}
                          label={"Logout"}
                          loading={state?.logout?.loading}
                          onClick={handleLogout}
                        />
                      </Stack>
                    </Box>
                  </Box>
                </>
              }
              open={open}
            >
              <IconButton aria-label="" onClick={() => setOpen(!open)}>
                <Avatar
                  sx={{ width: 25, height: 25 }}
                  src={
                    import.meta.env.VITE_APP_BASE_IMAGE_API + USER?.profile_img
                  }
                />
              </IconButton>
            </Tooltip>
          </Box>
        </ClickAwayListener>
      </div>
    </>
  );
}
