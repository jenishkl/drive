import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { StepConnector, stepConnectorClasses, useMediaQuery, useTheme } from "@mui/material";

export default function HorizontalLinearStepper({
  activeStep = 0,
  steps = [],
}) {
   const theme = useTheme();
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box className={`w-100 ${matchesLG ? "horizontal-stepper" : "remove-line"}`}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", lg: "start" },
        }}
      >
        {steps.map((item, index) => (
          <Step key={index} variant="horizontal">
            <StepLabel>
              <Typography variant="bold" component={"h3"}>
                {item}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
