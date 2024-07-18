import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Box,
  Card,
  CircularProgress,
  IconButton,
  Skeleton,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";
import StringField from "../InputFields/StringField";
import CardExpiryField from "../InputFields/CardExpiryInput";
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from "../InputFields/StripeTextFIelds";
import {
  AddressElement,
  CardElement,
  CardNumberElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CreditCardDetail from "../InputFields/CreditCardDetail";
import { loadStripe } from "@stripe/stripe-js";
import LoadingButton from "../Buttons/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createCard,
  defaultCardSet,
  deleteCard,
  listClientCards,
} from "../../../store/crm/clients/clientActions";
import { toast } from "sonner";
import CardNumberField from "../InputFields/CardNumberField";
import CardCvcField from "../InputFields/CardCvcField";
import { Each } from "../../../helpers/utils";
import { crmClientSelector } from "../../../store/crm/clients/clientSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { GlobalContext } from "../../../layout/GlobalContextProvider";
export default function AddPaymentCard({
  stripe_id,
  client_id,
  cardsOpen,
  onClose,
}) {
  const {
    control,
    formState: { errors },
    getValues,
    register,
    reset,
    watch,
    // handleSubmit,
    trigger,
    setValue,
    setError,
  } = useForm({});
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState("number");
  const { setConfirmPopUp } = useContext(GlobalContext) || {};
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  // const stripe = new Strip()
  const { listClientCardsData, defaultCardSetLoading, listClientCardsLoading } =
    useSelector(crmClientSelector);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        console.log("Stripe has not loaded yet!");
        return;
      }
      setLoading(true);
      const cardNumberElement = elements.getElement(CardElement);

      const { error, token } = await stripe.createToken(cardNumberElement, {
        address: watch("address"),
        name: watch("name"),
      });

      await dispatch(
        createCard({ customer_id: stripe_id, token: token?.id, client_id })
      )
        .unwrap()
        .then((d) => toast.success(d?.msg));
      //   const customerSource = await stripe.createSource({
      //     source: "tok_visa",
      //     token: token,
      //     customer: stripe_id,
      //   });
      dispatch(listClientCards({ params: { client_id } }));
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Received Stripe Token:", token.id);
        // handleFetchCards();
        // Here, you can call your backend API to process the payment
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  // const handleFetchCards = async () => {
  //   try {
  //     const url = `https://api.stripe.com/v1/customers/${stripe_id}/cards`;
  //     const response = await fetch(url, {
  //       method: "GET", // Not necessary to specify since GET is the default method
  //       headers: {
  //         Authorization: `Bearer ${import.meta.env.VITE_APP_STRIPE_SECRET_KEY}`,
  //       },
  //     });
  //     console.log("response", response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  useEffect(() => {
    // handleFetchCards();
    if (client_id) dispatch(listClientCards({ params: { client_id } }));
  }, [client_id]);

  const card = useMemo(() => {
    return (
      <Cards
        number={watch("number")}
        expiry={watch("month") + "/" + watch("year")}
        cvc={watch("cvc")}
        name={"xxxx"}
        // callback={(e) => {
        //   console.log("e", e);
        //   if (e?.issuer == "unknown") {
        //     setError("number", { message: "Enter Valid Card Number" });
        //   } else {
        //     setError("number", { message: "" });
        //   }
        // }}
        focused={focusedInput}
        preview
      />
    );
  }, [watch("number"), watch("cvc"), watch("month"), watch("year")]);
  const [defId, setDefId] = useState("");
  const handleDefaultCardSet = async (id) => {
    try {
      setDefId(id);
      await dispatch(defaultCardSet({ card_id: id, client_id })).unwrap();
      dispatch(listClientCards({ params: { client_id } }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteCard = async (card_id) => {
    try {
      await dispatch(
        deleteCard({
          client_id: client_id,
          card_id: card_id,
        })
      )
        .unwrap()
        .then((d) => toast.success(d.msg));
      setConfirmPopUp(null);
      dispatch(listClientCards({ params: { client_id } }));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Dialog
        open={cardsOpen}
        onClose={onClose}
        maxWidth={"lg"}
        fullWidth
        aria-labelledby={"card-p"}
      >
        <DialogTitle id={"card-p-t"}>
          <Button
            variant="contained"
            size="small"
            sx={{ width: "100px" }}
            onClick={() => setOpen(true)}
          >
            Add Cards
          </Button>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={5} p={3}>
            {listClientCardsLoading && (
              <Each
                of={Array(3).fill("")}
                render={() => {
                  return (
                    <Grid item xs={4} sm={4} sx={{ cursor: "pointer" }}>
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"200px"}
                      />
                    </Grid>
                  );
                }}
              />
            )}
            {!listClientCardsLoading && (
              <Each
                of={listClientCardsData?.data}
                render={(it, i) => {
                  return (
                    <Grid item xs={4} sm={4} sx={{ cursor: "pointer" }}>
                      <Box display={"flex"}>
                        <Box
                          className={`position-relative credit-card ${
                            listClientCardsData?.default_card == it?.id
                              ? "ring neon-green rounded  "
                              : ""
                          }`}
                        >
                          <IconButton
                            className="delete-card d-none"
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 0,
                              zIndex: 1,
                            }}
                            onClick={() =>
                              setConfirmPopUp({
                                onSubmit: () => handleDeleteCard(it?.id),
                                // content:"Are "
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Box onClick={() => handleDefaultCardSet(it?.id)}>
                            <Cards
                              key={i}
                              // number={"xxxxx x xx xx x x"}
                              number={`${it?.card?.last4}`}
                              cvc={222}
                              expiry={`0${it?.card?.exp_month}/${String(
                                it?.card?.exp_year
                              )?.slice(-2)}`}
                              issuer="Visa"
                              focused="number"
                              name={it?.billing_details?.name}
                              placeholders={"sss"}
                            />
                          </Box>
                          <Box className="absolute-center">
                            {defId == it?.id && defaultCardSetLoading && (
                              <CircularProgress
                                color="warning"
                                size={"20px !important"}
                                sx={{
                                  fontSize: "20px !important",
                                  width: "20px !important",
                                  height: "20px !important",
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                }}
              />
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="cancel">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* <PaymentElement
        options={{
          layout: {
            spacedAccordionItems: true,
            type: "tabs",
            defaultCollapsed: false,
          },
        }}
      /> */}
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby={"payment-card-detail-popup"}
      >
        <DialogTitle id={"pcdp"}>Add Card Details</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 5 }}>
            {/* <CreditCardDetail
              setFocusedInput={setFocusedInput}
              setValue={setValue}
            /> */}
            {/* <PaymentElement/> */}
            <CardElement
              onNetworksChange={(e) => console.log("e", e)}
              onChange={(e) => {
                console.log(document.getElementsByName("cardnumber").values);
              }}
              className="aaaa"
              id="cardN"
              options={{
                style: {
                  base: {},
                },
                hidePostalCode: true,
              }}
            />
            <Box mt={4}>
              <AddressElement
                options={{ mode: "billing" }}
                onChange={(e) => {
                  setValue("name", e.value.name);
                  setValue("address", e.value.address);
                }}
              />
            </Box>

            {/* <Grid container mt={5}>
              <Grid item xs={8}>
                <CardNumberField
                  value={watch("number")}
                  error={errors?.number?.message}
                  onChange={(v) => setValue("number", v)}
                />
              </Grid>
              <Grid item xs={2}>
                <CardExpiryField
                  value={watch("month") + "/" + watch("year")}
                  onChange={(v) => {
                    setValue("month", v.split("/")[0]);
                    setValue("year", v.split("/")[1]);
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <CardCvcField
                  value={watch("cvc")}
                  onChange={(v) => {
                    setValue("cvc", v);
                  }}
                />
              </Grid>
            </Grid> */}
            {/* <Box mt={4}>{card}</Box> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="cancel">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            label="Add"
            loading={loading}
            onClick={handleSubmit}
            disabled={!stripe}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
