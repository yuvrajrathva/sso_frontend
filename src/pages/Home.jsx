import React from "react";
import { AppProvider } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Key, Hub } from "@mui/icons-material";

export const NAVIGATION = [
  {
    segment: "credentials",
    title: "Credentials",
    icon: <Key />,
  },
];

export default function Home() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Hub fontSize="large" style={{ padding: "5px" }} />,
        title: "SSO IITJ",
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <h1>Home</h1>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
