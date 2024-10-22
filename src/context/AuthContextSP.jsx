import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../config.js";

const AuthContextSP = React.createContext();
export default AuthContextSP;

axios.defaults.withCredentials = true;

export const AuthProviderSP = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [accessToken, setAccessToken] = React.useState(
    localStorage.getItem("sso-access-token") || null
  );
  const [refreshToken, setRefreshToken] = React.useState(
    localStorage.getItem("sso-refresh-token") || null
  );

  const login = async (email, password) => {
    setLoading(true);
    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);
    try {
      const response = await axios.post(
        `${backendUrl}/developer/login`,
        loginData
      );
      setLoading(false);

      toast.success("Logged in successfully.");
      navigate("/");
      console.log(response.data);
      localStorage.setItem("sso-access-token", response.data.access_token);
      localStorage.setItem("sso-refresh-token", response.data.refresh_token);
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

  const contextData = {
    login,
    signup,
    accessToken,
    refreshToken,
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AuthContextSP.Provider value={contextData}>
        {loading ? null : children}
      </AuthContextSP.Provider>
    </>
  );
};
