import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function SetupPage() {
  const loginButtonCode = `
    // Define the SSO login URL and client details
    const SSO_LOGIN_CLIENT_URL = "<SSO_LOGIN_URL>"; // e.g., "http://localhost:5173/landing"
    const CLIENT_ID = "<YOUR_CLIENT_ID>"; // e.g., "bbdo4vhtvu7e"
    const REDIRECT_URL = "<YOUR_REDIRECT_URL>"; // e.g., "http://localhost:5174"
    const RESPONSE_TYPE = "code";
    const SCOPE = "<YOUR_ALLOWED_SCOPES>"; // e.g., "openid profile email"
    const STATE = Math.random().toString(36).substring(2); // Generates a random state for security

    // Function to handle login redirection
    const handleLogin = () => {
      window.location.href = \`\${SSO_LOGIN_CLIENT_URL}?client_id=\${CLIENT_ID}
      &redirect_url=\${REDIRECT_URL}&response_type=\${RESPONSE_TYPE}&scope=\${SCOPE}&state=\${STATE}\`;
    };

    // Render the login button
    return (
      <button onClick={handleLogin}>Login with IITJ SSO</button>
    );
  `;

  const fetchAccessTokenCode = `
  // Define the SSO URL and client credentials
  const SSO_URL = "<SSO_URL>"; // e.g., "http://localhost:5173"
  const CLIENT_ID = "<YOUR_CLIENT_ID>"; // e.g., "bbdo4vhtvu7e"
  const CLIENT_SECRET = "<YOUR_CLIENT_SECRET>"; // e.g., "3b3b4b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b"
  const REDIRECT_URL = "<YOUR_REDIRECT_URL>"; // e.g., "http://localhost:5174"

  // Function to handle access token request
  const handleTokenRequest = async (auth_code) => {
    const requestData = {
      auth_code: auth_code,
      grant_type: "authorization_code",
      redirect_url: REDIRECT_URL,
    };

    try {
      const response = await axios.post(
        \`\${SSO_URL}/api/token/\`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + Buffer.from(\`\${CLIENT_ID}:\${CLIENT_SECRET}\`).toString("base64"),
          },
        }
      );
      const { access_token, refresh_token } = response.data;

      // Store tokens in local storage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    } catch (error) {
      console.error("Token request failed:", error);
    }
  };
  `;

  const fetchUserDataCode = `
  // Function to fetch user data using access token
  const handleUserDataRequest = async () => {
    const user = jwtDecode(localStorage.getItem("access_token"));
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      try {
        const response = await axios.get(\`\${backendUrl}/api/token/refresh/\`, {
          headers: {
            "Content-Type": "application/json",
            "refresh_token": localStorage.getItem("refresh_token"),
          }
        })
        console.log(response.data);

        localStorage.setItem("access_token", response.data.access_token);
        // setAccessToken(response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        console.log("New Token saved to local storage");
      } catch (error) {
        console.error(error);
      }
    } 

    try {
      const response = await axios.get(\`\${backendUrl}/user/me/\`, {
        headers: {
          Authorization: \`Bearer \${localStorage.getItem("access_token")}\`,
        },
      });
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }    
  };
  `;

  const [copyLoginButtonSuccess, setCopyLoginButtonSuccess] =
    React.useState(false);
  const [copyTokenRequestSuccess, setCopyTokenRequestSuccess] =
    React.useState(false);
  const [copyUserDataRequestSuccess, setCopyUserDataRequestSuccess] =
    React.useState(false);

  const handleLoginButtonCopy = () => {
    navigator.clipboard
      .writeText(loginButtonCode)
      .then(() => setCopyLoginButtonSuccess(true))
      .catch(() => setCopyLoginButtonSuccess(false));
  };

  const handleTokenRequestCopy = () => {
    navigator.clipboard
      .writeText(fetchAccessTokenCode)
      .then(() => setCopyTokenRequestSuccess(true))
      .catch(() => setCopyTokenRequestSuccess(false));
  };

  const handleDataRequestCopy = () => {
    navigator.clipboard
      .writeText(fetchUserDataCode)
      .then(() => setCopyUserDataRequestSuccess(true))
      .catch(() => setCopyUserDataRequestSuccess(false));
  };

  return (
    <>
      <h1>Setup Page</h1>
      <p>This is the setup page. You can use this page to set up your app.</p>
      <h2>Instructions</h2>
      <h3>Step 1: Add an SSO Login Button to Your Application</h3>
      <ol type="1">
        <li>
          Copy the following code and paste it in the part of your application
          where you want the "Login with IITJ SSO" button to appear.
        </li>
        <li>{`Replace placeholders (<SSO_LOGIN_URL>, <YOUR_CLIENT_ID>, <YOUR_REDIRECT_URL>, <YOUR_ALLOWED_SCOPES>) with actual values.`}</li>
      </ol>
      <div style={{ position: "relative", margin: "20px 0" }}>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <code style={{ color: "black" }}>{loginButtonCode}</code>
        </pre>
        <button
          onClick={handleLoginButtonCopy}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {copyLoginButtonSuccess ? <CheckBoxIcon /> : <ContentCopyIcon />}
        </button>
      </div>
      <br />
      <h3>Step 2: Request Access Token</h3>
      <ol type="1">
        <li>
          Place this code in the file where you handle access token requests.
        </li>
        <li>{`Replace placeholders (<SSO_URL>, <YOUR_CLIENT_ID>, <YOUR_REDIRECT_URL>, <YOUR_REDIRECT_URL>) with actual values.`}</li>
      </ol>
      <div style={{ position: "relative", margin: "20px 0" }}>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <code style={{ color: "black" }}>{fetchAccessTokenCode}</code>
        </pre>
        <button
          onClick={handleTokenRequestCopy}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {copyTokenRequestSuccess ? <CheckBoxIcon /> : <ContentCopyIcon />}
        </button>
      </div>
      <br />
      <h3>Step 3: Fetch User Data with Access Token</h3>
      <ol type="1">
        <li>
          Add this code wherever you need to fetch user data using the access
          token.
        </li>
        <li>Set the backendUrl to the correct URL of your backend.</li>
      </ol>
      <div style={{ position: "relative", margin: "20px 0" }}>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <code style={{ color: "black" }}>{fetchUserDataCode}</code>
        </pre>
        <button
          onClick={handleDataRequestCopy}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {copyUserDataRequestSuccess ? <CheckBoxIcon /> : <ContentCopyIcon />}
        </button>
      </div>
    </>
  );
}
