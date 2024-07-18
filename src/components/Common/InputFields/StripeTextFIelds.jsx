import * as React from "react";
import {
  AuBankAccountElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  FpxBankElement,
  IbanElement,
  IdealBankElement,
  
} from "@stripe/react-stripe-js";
import TextField from "@mui/material/TextField";
import StripeInput from "./StripeInput";

export const StripeTextField = (props) => {
  const {
    helperText,
    InputLabelProps,
    InputProps = {},
    inputProps,
    error,
    labelErrorMessage,
    stripeElement,
    ...other
  } = props;
console.log('other.value', other?.value)
  return (
    <TextField
      fullWidth
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      error={error}
      InputProps={{
        ...InputProps,
        inputProps: {
          ...inputProps,
          ...InputProps.inputProps,
          component: stripeElement??undefined,
        },
        // inputComponent: StripeInput,
      }}
      helperText={error ? labelErrorMessage : helperText}
      {...other}
    />
  );
};

export function StripeTextFieldNumber(props) {
  return (
    <StripeTextField
      label="Credit Card Number"
    //   stripeElement={CardNumberElement}
      {...props}
    />
  );
}
export function StripeTextFieldName(props) {
  return (
    <StripeTextField
      label="Credit Card Number"
      stripeElement={CardName}
      {...props}
    />
  );
}

export function StripeTextFieldExpiry(props) {
  return (
    <StripeTextField
      label="Expires"
      stripeElement={CardExpiryElement}
      {...props}
    />
  );
}

export function StripeTextFieldCVC(props) {
  return (
    <StripeTextField
      label="CVC Code"
      stripeElement={CardCvcElement}
      {...props}
    />
  );
}
