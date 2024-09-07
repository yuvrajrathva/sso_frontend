import React from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";

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

export default function Signup() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [rollNumber, setRollNumber] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    if (confirmPassword !== password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const validateInputs = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      rollNumber.trim() === ""
    ) {
      toast.error("Please fill all the fields");
      return false;
    }

    // validate phone number here

    if (
      email.trim() === "" ||
      !email.includes("@") ||
      !email.includes(".") ||
      !email.includes("iitj.ac.in")
    ) {
      setEmailError(true);
      toast.error("Please enter a valid email");
      return false;
    }

    if (password.trim() === "") {
      setPasswordError(true);
      toast.error("Please enter a valid password");
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            Sign up
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <FormControl>
                <FormLabel htmlFor="name">First Name</FormLabel>
                <TextField
                  id="name"
                  type="text"
                  name="first_name"
                  placeholder="John"
                  autoComplete="first_name"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ ariaLabel: "First Name" }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Last Name</FormLabel>
                <TextField
                  id="name"
                  type="text"
                  name="last_name"
                  placeholder="Doe"
                  autoComplete="last_name"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ ariaLabel: "Last Name" }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Roll Number</FormLabel>
                <TextField
                  id="name"
                  type="text"
                  name="roll_number"
                  placeholder="B21CS064"
                  autoComplete="roll_number"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ ariaLabel: "Roll Number" }}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Phone Number</FormLabel>
                <TextField
                  id="name"
                  type="number"
                  name="phone_number"
                  placeholder="9898989898"
                  autoComplete="phone_number"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ ariaLabel: "Phone number" }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@iitj.ac.in"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "email" }}
                error={emailError}
                color={emailError ? "error" : "primary"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "password" }}
                error={passwordError}
                color={passwordError ? "error" : "primary"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "password" }}
                error={passwordError}
                color={passwordError ? "error" : "primary"}
                onChange={(e) => handleConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Create Account
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Login
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
