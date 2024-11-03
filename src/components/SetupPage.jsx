import React from "react";

export default function SetupPage() {
  const loginButtonCode = `
  const SSO_LOGIN_CLIENT_URL = <SSO_LOGIN_URL>; // e.g. "http://localhost:5173/landing"
  const CLIENT_ID = <YOUR_CLIENT_ID>; // e.g. "bbdo4vhtvu7e"
  const REDIRECT_URL = <YOUR_REDIRECT_URL>; // e.g. Your application url "http://localhost:5174"
  const RESPONSE_TYPE = "code";
  const SCOPE = <YOUR_ALLOWED_SCOPES>; // e.g. "openid profile email"
  const STATE = Math.random().toString(36).substring(2);

  const handleLogin = () => {
    window.location.href = \`\${SSO_LOGIN_CLIENT_URL}?client_id=\${CLIENT_ID}&redirect_url=\${REDIRECT_URL}
    &response_type=\${RESPONSE_TYPE}&scope=\${SCOPE}&state=\${STATE}\`;
  };

  return (
    <button onClick={handleLogin}>Login with IITJ SSO</button>
  );
  `;

  const fetchDataCode = `
  const CLIENT_ID = "bbdo4vhtvu7e";
  const CLIENT_SECRET = "3b3b4b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b";
  const SSO_URL = <SSO_URL>; // e.g. "http://localhost:5173";
  const REDIRECT_URL = <YOUR_REDIRECT_URL>; // e.g. Your application url "http://localhost:5174";
  const CLIENT_ID = <YOUR_CLIENT_ID>; // e.g. "bbdo4vhtvu7e";
  const CLIENT_SECRET = <YOUR_CLIENT_SECRET>; // e.g. "3b3b4b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b";
  
  const handleUserDataRequest = () => {
    const response = axios.post(
      \`\${SSO_URL}/api/token/\`,
      {
        auth_code: auth_code,
        grant_type: "authorization_code",
        redirect_url: REDIRECT_URL,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization":
            "Basic " +
            new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
        json: true,
      }
    );
  
    console.log(response);
    // on success, the respone will have 200 OK status and JSON data with body containing, access_token, refresh_token, and expires_in
  };
  `;

  const [copySuccess, setCopySuccess] = React.useState("");

  const handleLoginButtonCopy = () => {
    navigator.clipboard
      .writeText(loginButtonCode)
      .then(() => setCopySuccess("Code copied!"))
      .catch(() => setCopySuccess("Failed to copy code."));
  };
  return (
    <>
      <h1>Setup Page</h1>
      <p>This is the setup page. You can use this page to set up your app.</p>
      <h2>Instructions</h2>
      <p>
        Copy the code below and paste it in your code file where you want to use the
        SSO login button.
      </p>
      <div
        style={{ position: "relative", margin: "20px 0" }}
      >
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <code style={{color: "black"}}>{loginButtonCode}</code>
        </pre>
        <button
          onClick={handleLoginButtonCopy}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: `${copySuccess ? "#28a745" : "#007bff"}`,
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {copySuccess ? copySuccess : "Copy code"}
        </button>
      </div>
      <br/>
      <p>
        Copy the code below and paste it in your code file where you want to fetch user data using auth_code and client_secret. 
      </p>
      <div
        style={{ position: "relative", margin: "20px 0" }}
      >
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <code style={{color: "black"}}>
            {fetchDataCode}
          </code>
        </pre>
        <button
          onClick={handleLoginButtonCopy}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: `${copySuccess ? "#28a745" : "#007bff"}`,
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {copySuccess ? copySuccess : "Copy code"}
        </button>
      </div>

    </>
  );
}
