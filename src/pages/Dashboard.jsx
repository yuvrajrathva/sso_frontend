import React from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import { AppProvider } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Key, Hub, Home, Info } from "@mui/icons-material";
import Credentials from "../components/Credentials";
import About from "../components/About";
import AuthContextSP from "../context/AuthContextSP";
import useAxios from "../context/UseAxios";
import toast, { Toaster } from "react-hot-toast";
import { backendUrl } from "../config";

const NAVIGATION = [
  {
    segment: "home",
    title: "Home",
    icon: <Home />,
  },
  {
    segment: "credentials",
    title: "Credentials",
    icon: <Key />,
  },
  {
    segment: "about",
    title: "About",
    icon: <Info />,
  },
];

export default function Dashboard() {
  const api = useAxios();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = React.useState(null);
  const { logoutUser } = React.useContext(AuthContextSP);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        navigate("/developer/login");
      },
      signOut: () => {
        setUserDetails(null);
        logoutUser();
      },
    };
  }, []);
  const [pathname, setPathname] = React.useState("/dashboard");

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`${backendUrl}/developer/get-user/`);
        console.log(response.data);
        setUserDetails({
          user: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
    };

    fetchUserDetails();
  }, []);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const PAGES = {
    credentials: <Credentials setPathname={setPathname} />,
    about: <About />,
  };

  return (
    <AppProvider
      session={userDetails}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: <Hub fontSize="large" style={{ padding: "5px" }} />,
        title: "SSO IITJ",
      }}
      router={router}
    >
      <DashboardLayout>
        <div style={{ padding: "20px 100px" }}>
          {PAGES[router.pathname.slice(1)] || (
            <HomePage setPathname={setPathname} />
          )}
        </div>
      </DashboardLayout>
      <Toaster position="bottom-center" reverseOrder={false} />
    </AppProvider>
  );
}
