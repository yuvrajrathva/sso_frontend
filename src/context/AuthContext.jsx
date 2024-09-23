import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../config.js";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // initialize with session token if applicable
  const [loading, setLoading] = useState(true);

  const login = async (email, pass) => {
    setLoading(true);
    const loginData = {
      username: email,
      password: pass,
    };
    console.log(loginData);
    try {
      const response = await axios.post(`${backendUrl}/login`, loginData);
      setUser(response.data);
      setLoading(false);
      navigate("/");
      toast.success("Logged in successfully.");
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
      const response = await axios.post(`${backendUrl}/signup`, signupData);
      setLoading(false);
      toast.success("Account created successfully. Please login.");
      localStorage.setItem("sso-email", email);
      navigate("/verification-code");
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

  const contextData = {
    user,
    login,
    signup,
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* <Toaster position="bottom-center" reverseOrder={false} /> */}
      <AuthContext.Provider value={contextData}>
        {loading ? null : children}
      </AuthContext.Provider>
    </>
  );
};
