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
import AuthContextSP from "../context/AuthContextSP";
import toast, { Toaster } from "react-hot-toast";

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
  const api = useAxios();
  const { user } = React.useContext(AuthContextSP);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [keyName, setKeyName] = React.useState("");
  const [redirectUrl, setRedirectUrl] = React.useState("");
  const [scopes, setScopes] = React.useState([]);
  const [selectedScopes, setSelectedScopes] = React.useState([]);

  const handleScopeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedScopes(typeof value === "string" ? value.split(",") : value);
  };

  const handleCreateKey = () => {
    const newKeyData = {
      name: keyName,
      developer_id: user.sub,
      redirect_url: redirectUrl,
      scopes: selectedScopes,
    };
    console.log(newKeyData);
    api
      .post("/service-provider/create/", newKeyData)
      .then((response) => {
        console.log(response);
        toast.success("Key created successfully.");
      })
      .catch((error) => {
        console.error("Error creating key:", error);
        if (error.response && error.response.data && error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
    api
      .get("/developer/available-scopes/")
      .then((response) => {
        console.log("Scopes fetched successfully:", response.data);
        setScopes(response.data.map((scope) => scope.scope));
      })
      .catch((error) => {
        console.error("Error fetching scopes:", error);
        if (error.response && error.response.data && error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    api
      .get("/developer/keys/")
      .then((response) => {
        console.log("Keys fetched successfully:", response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching keys:", error);
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
              handleCreateKey();
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
                onChange={(event) => setKeyName(event.target.value)}
                variant="outlined"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="redirect-url"
                name="redirect-url"
                label="Redirect URL"
                type="text"
                fullWidth
                onChange={(event) => setRedirectUrl(event.target.value)}
                variant="outlined"
              />
              <FormControl fullWidth margin="dense">
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
            <Button type="submit">Create</Button>
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
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
