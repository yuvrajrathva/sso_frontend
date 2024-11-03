import React from "react";
import Paper from "@mui/material/Paper";
import {
  HolidayVillage,
  Password,
  Visibility,
  VisibilityOff,
  ContentCopy,
  Quiz,
} from "@mui/icons-material/";
import Grid from "@mui/material/Grid2";
import toast, { Toaster } from "react-hot-toast";

export default function HomePage(props) {
  const [showSecret, setShowSecret] = React.useState(false);

  const handleCopy = (copyText) => {
    navigator.clipboard.writeText(copyText);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Grid container spacing={3}>
        <Grid
          size={{ xs: 12, md: 12, lg: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Paper sx={{ padding: "20px" }}>
            <HolidayVillage fontSize="large" />
            <h1>Welcome to SSO IITJ</h1>
            <p style={{ color: "grey" }}>
              This is a Single Sign-On (SSO) application for Indian Institute of
              Technology Jodhpur (IITJ).
            </p>
          </Paper>
          <Paper sx={{ padding: "20px" }}>
            <h2
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                margin: "0",
              }}
            >
              <Password fontSize="large" />
              API Keys
            </h2>
            <div style={{ marginBottom: "30px" }}>
              <p style={{ color: "grey", fontWeight: "bold" }}>DESCRIPTION</p>
              <p>
                API keys are used to authenticate IITJ SSO users and authorize a
                service provider to access their data. Keep your keys secure and
                never share them with anyone.
              </p>
            </div>
            <div style={{ marginBottom: "30px" }}>
              <p style={{ color: "grey", fontWeight: "bold" }}>DUMMY CLIENT ID</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "50px" }}
              >
                <p style={{ width: "100%" }}>
                  33daf2bf-5583-4137-80bf-389abfdad32f
                </p>
                <ContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleCopy("33daf2bf-5583-4137-80bf-389abfdad32f")
                  }
                />
              </div>
            </div>
            <div style={{ marginBottom: "30px" }}>
              <p style={{ color: "grey", fontWeight: "bold" }}>DUMMY CLIENT SECRET</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "50px" }}
              >
                {showSecret ? (
                  <p style={{ margin: "0", width: "100%" }}>
                    fu72nomigloh9bojsxo1
                  </p>
                ) : (
                  <p
                    style={{
                      margin: "0",
                      height: "20px",
                      backgroundColor: "gray",
                      width: "100%",
                    }}
                  ></p>
                )}
                {showSecret ? (
                  <Visibility
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowSecret(!showSecret)}
                  />
                ) : (
                  <VisibilityOff
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowSecret(!showSecret)}
                  />
                )}
              </div>
            </div>
            <div
              onClick={() => props.setPathname("/credentials")}
              style={{ cursor: "pointer", color: "#006bd6" }}
            >
              Manage keys
            </div>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 8 }}>
          <Paper sx={{ padding: "20px" }}>
            <h2
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                margin: "0",
              }}
            >
              <Quiz fontSize="large" />
              Why Use IITJ Single Sign-On (SSO)?
            </h2>
            <p style={{ color: "grey" }}>
              Single Sign-On (SSO) at IITJ streamlines the login experience
              across all IITJ applications, offering key benefits for both users
              and developers:
              <br />
              <b>1. Seamless Access Across IITJ Sites</b>: Users only need to
              log in once to access all IITJ applications. After the first
              login, users can navigate to other IITJ sites without needing to
              re-enter credentials, making the experience faster and more
              convenient. <br />
              <b>2. Enhanced Privacy Control</b>: With SSO, users are prompted
              to share personal information only once. Instead of submitting
              data separately to each IITJ site, users can manage which sites
              have access to their information. Each application can request
              different levels of access based on the specific data it needs,
              improving both privacy and data control. <br />
              <b>3. Reduced Data Redundancy for Developers</b>: Developers don’t
              need to store duplicate user information across multiple
              applications, reducing data redundancy and making it easier to
              maintain consistent and accurate user information.
              <br /> <b>4. Centralized Authentication Management</b>: IITJ’s SSO
              handles all authentication processes, freeing developers from the
              burden of implementing complex login systems for each application.
              This reduces security risks and allows developers to focus on
              building better features. SSO at IITJ simplifies user access,
              enhances data privacy, and provides a centralized authentication
              system that benefits both users and developers.
            </p>
            <div style={{ width: "100%", textAlign: "center" }}>
              <img
                src="https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/62cf03b33d834a7ead7784d5_What%20is%20SSO.jpg"
                alt="sso-representation"
                style={{ width: "50%", margin: "auto" }}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
