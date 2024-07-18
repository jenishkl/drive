import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyAuMasrWV0TeiQw3NQi3BBRF5ezpAqC1YY";
function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function GoogleAddress({
  country,
  onChange = () => {},
  value,
  variant = "outlined",
  readOnly,
  disabled,
  label,
  bootstrap,
}) {
  const [addressDetails, setAddressDetails] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  console.log("addressDetails", addressDetails);
  console.log("value", JSON.stringify(value));
  console.log("options", options);
  // React.useEffect(() => {
  //   if (true) {
  //     if (!document.querySelector("#google-maps")) {
  //       loadScript(
  //         `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
  //         document.querySelector("head"),
  //         "google-maps"
  //       );
  //     }

  //     loaded.current = true;
  //   }
  // }, [country, loaded.current, window, document]);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        request.componentRestrictions = { country: country };
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [country]
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, country]);

  const extractDetails = (components) => {
    const details = { city: "", state: "", zip: "" };
    components.forEach((component) => {
      if (component.types.includes("locality")) {
        details.city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        details.state = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        details.zip = component.long_name;
      }
      if (component.types.includes("route")) {
        details.street = component.long_name;
      }
    });
    return details;
  };
  return (
    <Box key={country}>
      <Autocomplete
        key={country}
        id="google-map-demo"
        fullWidth
        readOnly={readOnly}
        freeSolo
        disabled={disabled}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        size="small"
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);

          if (newValue && newValue.place_id) {
            const service = new window.google.maps.places.PlacesService(
              document.createElement("div")
            );
            service.getDetails(
              { placeId: newValue.place_id },
              (place, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  const details = extractDetails(place.address_components);
                  onChange(newValue, details);
                  setAddressDetails(details); // You can use these details as needed
                }
              }
            );
          }
          // setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          onChange({ description: newInputValue ?? "" }, {});
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            sx={(theme) =>
              bootstrap && {
                "& label.Mui-focused": {
                  color: "#A0AAB4",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#B2BAC2",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E0E3E7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B2BAC2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6F7E8C !important",
                  },
                },
              }
            }
            {...params}
            variant={variant}
            label={label}
            fullWidth
            InputProps={{ ...params?.InputProps, disableUnderline: true }}
            // InputProps={(d) => ({ ...d, disableUnderline: true })}
          />
        )}
        renderOption={(props, option) => {
          const matches =
            option?.structured_formatting?.main_text_matched_substrings || [];

          const parts = parse(
            option?.structured_formatting?.main_text,
            matches?.map((match) => [
              match?.offset,
              match?.offset + match?.length,
            ])
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts?.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      <Typography variant="light" size="small">
                        {part?.text}
                      </Typography>
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option?.structured_formatting?.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </Box>
  );
}
