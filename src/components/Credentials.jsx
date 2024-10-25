import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  Select,
  Chip,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import KeysTable from "./KeysTable";
import useAxios from "../context/UseAxios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function Credentials() {
  const theme = useTheme();
  const axios = useAxios();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [redirectUri, setRedirectUri] = React.useState("");
  const [scopes, setScopes] = React.useState(["openid", "profile", "email"]);
  const [selectedScopes, setSelectedScopes] = React.useState([]);

  const handleScopeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedScopes(typeof value === "string" ? value.split(",") : value);
  };

  const handleCreateKey = () => {
    console.log(name, redirectUri);
    selectedScopes.map((scope) => {
      console.log(scope);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <Button
          variant="text"
          sx={{ fontWeight: "bold" }}
          onClick={handleClickOpen}
        >
          <Add />
          CREATE CREDENTIALS
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Create New Key</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new API key, please enter all required fields.
            </DialogContentText>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="key-name"
                label="Key Name"
                type="text"
                fullWidth
                onChange={(event) => setName(event.target.value)}
                variant="outlined"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="redirect-uri"
                name="redirect-uri"
                label="Redirect URI"
                type="text"
                fullWidth
                onChange={(event) => setRedirectUri(event.target.value)}
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Scopes</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={selectedScopes}
                  onChange={handleScopeChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {scopes.map((scope) => (
                    <MenuItem
                      key={scope}
                      value={scope}
                      style={getStyles(scope, selectedScopes, theme)}
                    >
                      {scope}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleCreateKey}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
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
