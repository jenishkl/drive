import React, { useEffect } from "react";
import { findSubModuleId, get } from "../helper";
import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "sonner";
import ImageCommon from "../../imagecomponent/ImageCommon";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  _billingQueries,
  _caseQueries,
  _messages,
  _otherQueries,
  _technicalQueries,
} from "../../../helpers/moduleLinks";
import { useSelector } from "react-redux";
import {
  getBillQueries,
  getCaseQueries,
  getOtherQueries,
  getQueryMessages,
  getTechQueries,
} from "../../../store/messages/messageAction";
import { viewEstimateMsg } from "../../../store/billing/invoiceBillingActions";

const PushNotificationDataHandler = (data, theme, dispatch, state) => {
  const fcmData = data?.data;
  const additionalData = data?.data?.additionalData
    ? JSON.parse(data?.data?.additionalData)
    : null;
  const msgState = state?.messages;
  const CurrentQueryWise = msgState?.CurrentQueryWise;

  switch (fcmData?.notify_type?.toLowerCase()?.replace(/ /g, "")) {
    case "casequeries":
      try {
        dispatch(
          getCaseQueries(
            `/caseQuery/${findSubModuleId(
              _messages,
              _caseQueries
            )}/${CurrentQueryWise}`
          )
        );
        if (!window.location.pathname.includes("messages")) {
          return toast.info(
            <Box className="d-flex align-items-center w-100 " mx={2}>
              <Box className="d-flex" mx={2} sx={{ flexDirection: "column" }}>
                <Typography component={"h3"} variant="bold">
                  {data?.notification?.title}
                </Typography>
                <Typography>{data?.notification?.body}</Typography>
              </Box>
            </Box>
          );
        }
      } catch (error) {
        console.error("Error occurred while dispatching queries:", error);
      }

      break;
    case "billingqueries":
      try {
        dispatch(
          getBillQueries(
            `/caseQuery/${findSubModuleId(
              _messages,
              _billingQueries
            )}/${CurrentQueryWise}`
          )
        );
        if (!window.location.pathname.includes("messages")) {
          return toast.info(
            <Box className="d-flex align-items-center w-100 " mx={2}>
              <Box className="d-flex" mx={2} sx={{ flexDirection: "column" }}>
                <Typography component={"h3"} variant="bold">
                  {data?.notification?.title}
                </Typography>
                <Typography>{data?.notification?.body}</Typography>
              </Box>
            </Box>
          );
        }
      } catch (error) {
        console.error("Error occurred while dispatching queries:", error);
      }

      break;
    case "technicalqueries":
      try {
        dispatch(
          getTechQueries(
            `/caseQuery/${findSubModuleId(
              _messages,
              _technicalQueries
            )}/${CurrentQueryWise}`
          )
        );
        if (!window.location.pathname.includes("messages")) {
          return toast.info(
            <Box className="d-flex align-items-center w-100 " mx={2}>
              <Box className="d-flex" mx={2} sx={{ flexDirection: "column" }}>
                <Typography component={"h3"} variant="bold">
                  {data?.notification?.title}
                </Typography>
                <Typography>{data?.notification?.body}</Typography>
              </Box>
            </Box>
          );
        }
      } catch (error) {
        console.error("Error occurred while dispatching queries:", error);
      }

      break;
    case "otherqueries":
      try {
        dispatch(
          getOtherQueries(
            `/caseQuery/${findSubModuleId(
              _messages,
              _otherQueries
            )}/${CurrentQueryWise}`
          )
        );
        if (!window.location.pathname.includes("messages")) {
          return toast.info(
            <Box className="d-flex align-items-center w-100 " mx={2}>
              <Box className="d-flex" mx={2} sx={{ flexDirection: "column" }}>
                <Typography component={"h3"} variant="bold">
                  {data?.notification?.title}
                </Typography>
                <Typography>{data?.notification?.body}</Typography>
              </Box>
            </Box>
          );
        }
      } catch (error) {
        console.error("Error occurred while dispatching queries:", error);
      }

      break;
    case "eachcasequeries":
      try {
        dispatch(
          getQueryMessages(
            `/caseQuery/view/${additionalData?.case_id}/${findSubModuleId(
              _messages,
              _caseQueries
            )}/0`
          )
        );
        if (!window.location.pathname.includes("query")) {
          return toast.info(
            <Box className="d-flex align-items-center w-100 " mx={2}>
              <Box className="d-flex" mx={2} sx={{ flexDirection: "column" }}>
                <Typography component={"h3"} variant="bold">
                  {data?.notification?.title}
                </Typography>
                <Typography>{data?.notification?.body}</Typography>
              </Box>
            </Box>
          );
        }
      } catch (error) {
        console.error("Error occurred while dispatching queries:", error);
      }

      break;
    case "invoice_estimation":
      try {
        dispatch(
          viewEstimateMsg(
            `case/estimate/view/${additionalData?.case_id}/${additionalData?.id}`
          )
        );
        if (!window.location.pathname.includes("estimate")) {
          return toast.info(
            <Box className="d-flex align-items-center w-100 " mx={2}>
              <Box className="d-flex" mx={2} sx={{ flexDirection: "column" }}>
                <Typography component={"h3"} variant="bold">
                  {data?.notification?.title}
                </Typography>
                <Typography>{data?.notification?.body}</Typography>
              </Box>
            </Box>
          );
        }
      } catch (error) {
        console.error("Error occurred while dispatching queries:", error);
      }

      break;
    case "comment":
    case "like":

    default:
      break;
  }
  // return ;
};

const PushNotificationHandler = ({ theme, dispatch }) => {
  const messaging = getMessaging();
  const state = useSelector((state) => state);

  useEffect(() => {
    const foregroundMessageHandler = (payload) => {
      PushNotificationDataHandler(payload, theme, dispatch, state);
    };

    const unsubscribeForeground = onMessage(
      messaging,
      foregroundMessageHandler
    );

    return () => {
      unsubscribeForeground();
    };
  }, [theme, dispatch]);

  useEffect(() => {
    const backgroundMessageHandler = (event) => {
      const payload = event.data;
      console.log("Received background message ", payload);
      PushNotificationDataHandler(payload, theme, dispatch, state);
    };

    const channel = new BroadcastChannel("background-message-channel");
    channel.onmessage = backgroundMessageHandler;

    return () => {
      channel.close();
    };
  }, []);

  return null;
};

export { PushNotificationHandler, PushNotificationDataHandler };
