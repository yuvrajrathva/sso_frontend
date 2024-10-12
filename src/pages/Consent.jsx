import React from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import MuiCard from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { backendUrl } from "../config.js";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function Consent() {
  const { responseType, scope, clientId, state, redirectUri } =
    React.useContext(AuthContext);

  const handleContinuing = () => {
    const consentData = {
      response_type: responseType,
      scope: scope,
      client_id: clientId,
      state: state,
      redirect_uri: redirectUri,
    };
    console.log(consentData);
    axios
      .get(`${backendUrl}/service-provider/authorize/`, { params: consentData }, { withCredentials: true })
      .then((response) => {
        window.location.href = response.request.responseURL;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography variant="h4" align="center">
            Signin to SSO IITJ
          </Typography>
          <Typography variant="body1" align="center">
            By continuing, SSO IITJ will share your{" "}
            {scope
              .split(" ")
              .filter((e) => e != "open-id")
              .slice(0, -1)
              .join(", ") +
              " and " +
              scope
                .split(" ")
                .filter((e) => e != "open-id")
                .slice(-1)}{" "}
            with this application.
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinuing}
            >
              Continue
            </Button>
          </Stack>
        </Card>
      </SignInContainer>
    </>
  );
}
