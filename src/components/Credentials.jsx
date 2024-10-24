import React from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import KeysTable from "./KeysTable";
import useAxios from "../context/UseAxios";

export default function Credentials() {
  const axios = useAxios();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/service-provider/credentials/")
      .then((response) => {
        console.log("Credentials fetched successfully:", response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching credentials:", error);
      });
  }, []);

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
      {rows?.length === 0 ? (
        <p>
          You don't have any API keys yet. Click the button above to create one.
        </p>
      ) : (
        <KeysTable rows={rows} />
      )}
    </>
  );
}
