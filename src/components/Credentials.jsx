import React from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import KeysTable from "./KeysTable";

export default function Credentials() {
  const [rows, setRows] = React.useState([{
    id: 1,
    name: "Default",
    client_id: "123456",
    client_secret: "abcdef",
    created_at: "2021-10-01",
    scopes: ["name", "email"],
  },
  {
    id: 2,
    name: "Test",
    client_id: "654321",
    client_secret: "fedfasf",
    created_at: "2021-10-02",
    scopes: ["name", "email", "phone"],
  }]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>API Keys</h1>
        <Button variant="text" sx={{ fontWeight: "bold" }}>
          <Add />
          CREATE CREDENTIALS
        </Button>
      </Box>
      <p>
        API keys are used to authorize your app's requests to the sso. You can
        generate and manage your API keys in your account settings.
      </p>
      <KeysTable rows={rows} />
    </>
  );
}
