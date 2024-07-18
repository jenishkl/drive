import * as React from "react";
import Grid from "@mui/material/Grid";
import {
  StripeTextFieldNumber,
  StripeTextFieldExpiry,
  StripeTextFieldCVC,
} from "./StripeTextFIelds";

export default function CreditCardDetail({ setFocusedInput, setValue }) {
  const [state, setState] = React.useState({
    cardNumberComplete: false,
    expiredComplete: false,
    cvcComplete: false,
    cardNumberError: null,
    expiredError: null,
    cvcError: null,
  });

  const onElementChange =
    (field, errorField) =>
    ({ complete, error = { message: null } }) => {
      setFocusedInput(field);
      setState({ ...state, [field]: complete, [errorField]: error.message });
    };

  const { cardNumberError, expiredError, cvcError } = state;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <StripeTextFieldNumber
          error={Boolean(cardNumberError)}
          labelErrorMessage={cardNumberError}
          //   onChange={onElementChange("number", "cardNumberError")}
          onChange={(e) => {
            setValue("number", e.target.value);
            cardElement.on('change', function(event) {
                var displayError = document.getElementById('card-errors');
                if (event.error) {
                  displayError.textContent = event.error.message;
                } else {
                  displayError.textContent = '';
                }
              });
        }}
          onInputChange={(event) => console.log("Input change:", event)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StripeTextFieldExpiry
          error={Boolean(expiredError)}
          labelErrorMessage={expiredError}
          onChange={onElementChange("expiry", "expiredError")}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <StripeTextFieldCVC
          error={Boolean(cvcError)}
          labelErrorMessage={cvcError}
          onChange={onElementChange("cvc", "cvcError")}
        />
      </Grid>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </Grid>
  );
}
