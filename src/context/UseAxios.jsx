import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContextSP from "./AuthContextSP";
import { backendUrl } from "../config";
import toast from "react-hot-toast";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } =
    useContext(AuthContextSP);
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
      const response = await axios.post(
        `${backendUrl}/developer/token/refresh/`,
        {
          refresh_token: authTokens.refresh_token,
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
      logoutUser();
    }
    return req;
  });

  return axiosInstance;
};

export default useAxios;
