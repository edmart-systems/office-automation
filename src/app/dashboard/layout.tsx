import AuthGuard from "@/components/auth/auth-guard";
import { MainNav } from "@/components/dashboard/nav-bar/main-nav";
import NotificationsDrawer from "@/components/dashboard/nav-bar/notifications-drawer";
import { SideNav } from "@/components/dashboard/nav-bar/side-nav";
import { Box, Container, GlobalStyles } from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <AuthGuard>
        <GlobalStyles
          styles={{
            body: {
              "--MainNav-height": "56px",
              "--MainNav-zIndex": 1000,
              "--SideNav-width": "280px",
              "--SideNav-zIndex": 1100,
              "--MobileNav-width": "320px",
              "--MobileNav-zIndex": 1100,
            },
          }}
        />
        <Box
          sx={{
            bgcolor: "var(--mui-palette-background-default)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minHeight: "100%",
          }}
        >
          <SideNav />
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              pl: { lg: "var(--SideNav-width)" },
            }}
          >
            <MainNav />
            <main>
              <Container maxWidth="xl" sx={{ py: "64px" }}>
                {children}
              </Container>
            </main>
            <NotificationsDrawer />
          </Box>
        </Box>
      </AuthGuard>
    </div>
  );
};

export default DashboardLayout;
