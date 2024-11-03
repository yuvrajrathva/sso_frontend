import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const response_type =
    location.state?.response_type || params.get("response_type");
  const scope = location.state?.scope || params.get("scope");
  const client_id = location.state?.client_id || params.get("client_id");
  const state = location.state?.state || params.get("state");
  const redirect_url =
    location.state?.redirect_url || params.get("redirect_url");

  // TODO: Verify consent in the initial loading of the page

  const handleContinuing = () => {
    const consentData = {
      response_type: response_type,
      scope: scope,
      client_id: client_id,
      state: state,
      redirect_url: redirect_url,
    };
    console.log(consentData);
    const sessionId = localStorage.getItem("session_id");
    axios
      .post(`${backendUrl}/service-provider/authorize/`, consentData, {
        headers: {
          session_id: sessionId,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.href = `${response.data.redirect_url}?auth_code=${response.data.code}&state=${response.data.state}`;
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
            {scope.split(" ").filter((e) => e != "open-id").length > 1
              ? scope
                  .split(" ")
                  .filter((e) => e != "open-id")
                  .slice(0, -1)
                  .join(", ") + " and "
              : "" +
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
