import React from "react";
import HomePage from "../components/HomePage";
import { AppProvider } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Key, Hub, Home } from "@mui/icons-material";
import Credentials from "../components/Credentials";

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
];

const PAGES = {
  credentials: <Credentials />,
};

export default function Dashboard() {
  const [pathname, setPathname] = React.useState("/dashboard");
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Hub fontSize="large" style={{ padding: "5px" }} />,
        title: "SSO IITJ",
      }}
      router={router}
    >
      <DashboardLayout>
        <div style={{ padding: "50px 100px" }}>
          {PAGES[router.pathname.slice(1)] || <HomePage />}
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
