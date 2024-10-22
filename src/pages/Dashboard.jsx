import React from "react";
import HomePage from "../components/HomePage";
import { Account, AppProvider } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Key, Hub, Home, Info } from "@mui/icons-material";
import Credentials from "../components/Credentials";
import About from "../components/About";

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
  const [pathname, setPathname] = React.useState("/dashboard");
  const [session, setSession] = React.useState({
    user: {
      name: "Yuvraj Rathva",
      email: "rathva.1@iitj.ac.in",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
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
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: <Hub fontSize="large" style={{ padding: "5px" }} />,
        title: "SSO IITJ",
      }}
      router={router}
    >
      <Account
        slots={{
          menuItems: <div>Settings</div>,
        }}
      />
      <DashboardLayout>
        <div style={{ padding: "20px 100px" }}>
          {PAGES[router.pathname.slice(1)] || (
            <HomePage setPathname={setPathname} />
          )}
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
