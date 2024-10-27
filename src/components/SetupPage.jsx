import React from "react";

export default function SetupPage() {
  const codeToCopy = `
  const SSO_LOGIN_CLIENT_URL = <SSO_LOGIN_URL>; // e.g. "http://localhost:5173/landing"
  const CLIENT_ID = <YOUR_CLIENT_ID>; // e.g. "bbdo4vhtvu7e"
  const REDIRECT_URI = <yOUR_REDIRECT_URI>; // e.g. Your application uri "http://localhost:5174"
  const RESPONSE_TYPE = "code";
  const SCOPE = <YOUR_ALLOWED_SCOPES>; // e.g. "openid profile email"
  const STATE = Math.random().toString(36).substring(2);

  const handleLogin = () => {
    window.location.href = \`\${SSO_LOGIN_CLIENT_URL}?client_id=\${CLIENT_ID}&redirect_uri=\${REDIRECT_URI}
    &response_type=\${RESPONSE_TYPE}&scope=\${SCOPE}&state=\${STATE}\`;
  };

  return (
    <button onClick={handleLogin}>Login with IITJ SSO</button>
  );
  `;

  const [copySuccess, setCopySuccess] = React.useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(codeToCopy)
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
        SSO login.
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
          <code style={{color: "black"}}>{codeToCopy}</code>
        </pre>
        <button
          onClick={handleCopy}
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
