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
import { Box } from "@mui/material";
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
      <Box sx={{ display: "flex", gap: "50px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Paper sx={{ padding: "20px", maxWidth: "500px" }}>
            <HolidayVillage fontSize="large" />
            <h1>Welcome to SSO IITJ</h1>
            <p style={{ color: "grey" }}>
              This is a Single Sign-On (SSO) application for Indian Institute of
              Technology Jodhpur (IITJ).
            </p>
          </Paper>
          <Paper sx={{ padding: "20px", maxWidth: "500px" }}>
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
              <p style={{ color: "grey", fontWeight: "bold" }}>CLIENT SECRET</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "50px" }}
              >
                {showSecret ? (
                  <p style={{ margin: "0", width: "100%" }}>
                    dwkfhasf yyhifasdfsaf hihfiasdhffddd
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
        </Box>
        <Box>
          <Paper sx={{ padding: "20px", maxWidth: "700px" }}>
            <h2
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                margin: "0",
              }}
            >
              <Quiz fontSize="large" />
              Why to use SSO IITJ?
            </h2>
            <p style={{ color: "grey" }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum
              laborum dolores id cumque ab atque dolore aliquid maiores
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolore, aliquam ea aut eos praesentium cum ducimus nemo. Rerum
              veniam praesentium modi hic delectus iste dolorum minus voluptatum
              optio distinctio.
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim
              labore id quibusdam! Ullam debitis vero exercitationem ut laborum
              ducimus, est dicta nihil cupiditate eos, error facere placeat
              ipsam. Omnis!
            </p>
            <img
              src="https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/62cf03b33d834a7ead7784d5_What%20is%20SSO.jpg"
              alt="sso-representation"
              style={{ width: "100%" }}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}
