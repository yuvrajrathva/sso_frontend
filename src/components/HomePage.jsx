import React from "react";
import Paper from "@mui/material/Paper";
import {
  HolidayVillage,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material/";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [showSecret, setShowSecret] = React.useState(false);
  return (
    <>
      <Paper sx={{ padding: "20px", maxWidth: "500px" }}>
        <HolidayVillage fontSize="large" />
        <h1>Welcome to SSO IITJ</h1>
        <p style={{ color: "grey" }}>
          This is a Single Sign-On (SSO) application for Indian Institute of
          Technology Jodhpur (IITJ).
        </p>
      </Paper>
      <Paper sx={{ padding: "20px", maxWidth: "500px", marginTop: "20px" }}>
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
            API keys are used to authenticate requests to the API. You can
            generate and manage your API keys in your account settings.
          </p>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <p style={{ color: "grey", fontWeight: "bold" }}>CLIENT ID</p>
          <p>33daf2bf-5583-4137-80bf-389abfdad32f</p>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <p style={{ color: "grey", fontWeight: "bold" }}>CLIENT SECRET</p>
          <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
            {showSecret ? (
              <p
                style={{
                  margin: "0",
                  height: "20px",
                  backgroundColor: "gray",
                  width: "100%",
                }}
              ></p>
            ) : (
              <p style={{ margin: "0", width: "100%" }}>
                dwkfhasf yyhifasdfsaf hihfiasdhffddd
              </p>
            )}
            {showSecret ? (
              <VisibilityOff
                style={{ cursor: "pointer" }}
                onClick={() => setShowSecret(!showSecret)}
              />
            ) : (
              <Visibility
                style={{ cursor: "pointer" }}
                onClick={() => setShowSecret(!showSecret)}
              />
            )}
          </div>
        </div>
        <Link to="/credentials" style={{ textDecoration: "none"}}>
          Manage keys
        </Link>
      </Paper>
    </>
  );
}
