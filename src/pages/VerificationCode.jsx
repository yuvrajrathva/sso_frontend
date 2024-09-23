import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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

export default function VerificationCode() {
  const navigate = useNavigate();
  const [code, setCode] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (code.trim() === "" && code.length !== 6) {
      toast.error("Please fill valid verification code");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/verify-code`, {
        email: localStorage.getItem("sso-email"),
        code: code,
      });
      console.log(response);
      navigate("/login");
      toast.success("Verification successful");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const resendCode = async () => {
    try {
      const response = await axios.post(`${backendUrl}/resend-verify-code`, {
        email: localStorage.getItem("sso-email"),
      });
      console.log(response);
      toast.success("Verification Code sent successfully");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <Toaster position="bottom-center" reverseOrder={false} />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Verification Code
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <TextField
                id="code"
                type="number"
                name="verification-code"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "verification code" }}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Verify
            </Button>
            <Typography
              sx={{ textAlign: "center", cursor: "pointer", color: "blue" }}
              onClick={() => resendCode()}
            >
              Resend code
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
