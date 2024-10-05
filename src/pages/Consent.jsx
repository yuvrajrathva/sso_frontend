import React, {useState} from "react";
import { useLocation } from "react-router-dom";

export default function Consent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [responseType, setResponseType] = useState(searchParams.get("response_type"));
  const [clientId, setClientId] = useState(searchParams.get("client_id"));
  const [scope, setScope] = useState(searchParams.get("scope"));
  const [state, setState] = useState(searchParams.get("state"));

  return (
    <div>
      <h1>Consent</h1>
      <p>Response Type: {responseType}</p>
      <p>Client ID: {clientId}</p>
      <p>Scope: {scope}</p>
      <p>State: {state}</p>
    </div>
  );
}
