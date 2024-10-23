import React from "react";
import { jwtDecode } from "jwt-decode";
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
  const [user, setUser] = React.useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = React.useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
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

      console.log(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setUser(jwtDecode(response.data.access_token));
      setAuthTokens(response.data);
      toast.success("Logged in successfully.");
      navigate("/");
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

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/developer/login");
    toast.success("Logged out successfully!");
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
    authTokens,
    setAuthTokens,
    user,
    setUser,
    logoutUser,
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
