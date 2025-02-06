import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../config.js";

const AuthContext = React.createContext();
export default AuthContext;

// axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect_url");
  const responseType = searchParams.get("response_type");
  const clientId = searchParams.get("client_id");
  const scope = searchParams.get("scope");
  const state = searchParams.get("state");
  const [loading, setLoading] = React.useState(true);

  const login = async (email, password) => {
    setLoading(true);
    const loginData = {
      email: email,
      password: password,
      redirect_url: redirectUrl,
      response_type: responseType,
      client_id: clientId,
      scope: scope,
      state: state,
    };
    console.log(loginData);
    try {
      const response = await axios.post(`${backendUrl}/user/login`, loginData);
      setLoading(false);

      toast.success("Logged in successfully.");
      console.log(response);

      if (response.data.should_redirect) {
        localStorage.setItem("session_id", response.data.session_id);
        window.location.href = response.data.redirect_url;
      } else {
        localStorage.setItem("session_id", response.data.session_id);
        // TODO: Do this redirection thing from Frontend
        navigate("/consent", {
          state: {
            response_type: loginData.response_type,
            client_id: loginData.client_id,
            state: response.data.state,
            scope: response.data.scope,
            redirect_url: response.data.redirect_url,
          },
        });
      }
      return response.data;
    } catch (error) {
      console.error(error);
      setLoading(false);

      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred. Please try again later.");
      }

      throw error;
    }
  };

  const signup = async (
    first_name,
    last_name,
    roll_number,
    email,
    password,
    phone_number
  ) => {
    setLoading(true);
    const signupData = {
      roll_no: roll_number,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      phone_number: phone_number,
    };
    console.log(signupData);
    try {
      const response = await axios.post(
        `${backendUrl}/user/signup`,
        signupData
      );
      setLoading(false);
      toast.success("Account created successfully. Please login.");
      localStorage.setItem("sso-email", email);
      navigate("/verification-code");
      return response.data;
    } catch (error) {
      console.error(error);
      setLoading(false);

      if (error.response && error.response.data && error.response.data.detail) {
        console.log(error.response.data.detail);
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      throw error;
    }
  };

  const verifySession = async () => {
    try {
      const verifySessionData = {
        redirect_url: redirectUrl,
        response_type: responseType,
        client_id: clientId,
        scope: scope,
        state: state,
      };
      const response = await axios.post(
        `${backendUrl}/user/verify-session`,
        verifySessionData,
        {
          headers: {
            session_id: localStorage.getItem("session_id"),
          },
        }
      );
      console.log(response.request.responseURL);
      window.location.href = response.request.responseURL;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const contextData = {
    login,
    signup,
    scope,
    clientId,
    responseType,
    redirectUrl,
    state,
    verifySession,
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AuthContext.Provider value={contextData}>
        {loading ? null : children}
      </AuthContext.Provider>
    </>
  );
};
