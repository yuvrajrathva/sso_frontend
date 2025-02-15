import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContextSP from "./AuthContextSP";
import { backendUrl } from "../config";
import toast from "react-hot-toast";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } =
    useContext(AuthContextSP);
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: backendUrl,
    headers: {
      Authorization: authTokens?.access_token
        ? `Bearer ${authTokens.access_token}`
        : undefined,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    try {
      const user = jwtDecode(authTokens.access_token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;
      console.log("Refreshing token...");
      const response = await axios.get(
        `${backendUrl}/api/token/refresh/`,
        {
          headers: {
          "Content-Type": "application/json",
          "refresh_token": authTokens.refresh_token,
          }
        }
      );

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access_token));

      req.headers.Authorization = `Bearer ${response.data.access_token}`;
    } catch (error) {
      console.error("Error refreshing token:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please login again.");
      }
      // we should logout here? or just redirect to login page
      // logoutUser();
      navigate("/developer/login")
    }
    return req;
  });

  return axiosInstance;
};

export default useAxios;
