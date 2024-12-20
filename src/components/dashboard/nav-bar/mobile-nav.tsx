"use client";

import React, { useState } from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CaretUpDown as CaretUpDownIcon } from "@phosphor-icons/react/dist/ssr/CaretUpDown";

import type { NavItemConfig } from "@/types/nav.types";
import { Logo } from "@/components/core/logo";

import { renderNavItems } from "./nav-config";
import { navIcons } from "./nav-icons";
import { isNavItemActive } from "@/utils/nav.utils";
import { paths } from "@/utils/paths.utils";
import { useSession } from "next-auth/react";
import LogoutDialog from "@/components/auth/logout-dialog";
import { useAppSelector } from "@/redux/store";
import { IconButton } from "@mui/material";

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  items?: NavItemConfig[];
}

export const MobileNav = ({ open, onClose }: MobileNavProps): JSX.Element => {
  const pathname = usePathname();
  const { data: sessionData } = useSession();
  const { mode } = useAppSelector((state) => state.theme);
  const [isNameDisplayed, setIsNameDisplayed] = useState<boolean>(true);

  return (
    <Drawer
      PaperProps={{
        sx: {
          "--SideNav-background": "var(--mui-palette-background-default)",
          "--SideNav-color": "var(--mui-palette-text-primary)",
          "--SideNav-border": "1px solid var(--mui-palette-divider)",
          "--NavGroup-title-color": "var(--mui-palette-neutral-600)",
          "--NavItem-color": "var(--mui-palette-neutral-600)",
          "--NavItem-hover-background": "var(--mui-palette-action-hover)",
          "--NavItem-active-background": "var(--mui-palette-primary-main)",
          "--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
          "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
          "--NavItem-icon-color": "var(--mui-palette-neutral-500)",
          "--NavItem-icon-active-color":
            "var(--mui-palette-primary-contrastText)",
          "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-500)",
          "--NavItem-expand-color": "var(--mui-palette-neutral-500)",
          "--NavItem-children-border": "var(--mui-palette-neutral-200)",
          "--NavItem-children-indicator": "var(--mui-palette-neutral-500)",
          "--Workspaces-background": "var(--mui-palette-neutral-100)",
          "--Workspaces-border-color": "var(--mui-palette-divider)",
          "--Workspaces-title-color": "var(--mui-palette-neutral-400)",
          "--Workspaces-name-color": "var(--mui-palette-neutral-900)",
          "--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
          backgroundColor: "var(--SideNav-background)",
          borderRight: "var(--SideNav-border)",
          bgcolor: "var(--SideNav-background)",
          color: "var(--SideNav-color)",
          // bgcolor: "var(--MobileNav-background)",
          // bgcolor: "#000",
          // color: "var(--MobileNav-color)",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          scrollbarWidth: "none",
          width: "var(--MobileNav-width)",
          zIndex: "var(--MobileNav-zIndex)",
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box
          component={RouterLink}
          href={paths.home}
          sx={{ display: "inline-flex" }}
        >
          <Logo color="dark" height={50} width={200} />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: mode == "dark" ? "#ffffff1a" : "#0000001a",
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            p: "4px 12px",
          }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography color="var(--mui-palette-neutral-400)" variant="body2">
              Office Automation
            </Typography>
            <Typography color="inherit" variant="subtitle1">
              {isNameDisplayed ? (
                <>
                  {sessionData &&
                    `${sessionData.user.firstName} ${sessionData?.user.lastName}`}
                </>
              ) : (
                <>{sessionData && sessionData.user.email}</>
              )}
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => setIsNameDisplayed((prev) => !prev)}
          >
            <CaretUpDownIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
      <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
        {renderNavItems({
          pathname,
          isAdmin: sessionData?.user.isAdmin == true,
        })}
      </Box>
      {/* <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} /> */}
      <Stack spacing={2} sx={{ p: "12px" }}>
        {/* <div>
          <Typography
            color="var(--mui-palette-neutral-100)"
            variant="subtitle2"
          >
            Did you know about this?
          </Typography>
          <Typography color="var(--mui-palette-neutral-400)" variant="body2">
            Check out our new platform.
          </Typography>
        </div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            alt="Pro version"
            src="/assets/edmrt-01-300x88.png"
            sx={{ height: "auto", width: "160px" }}
          />
        </Box>
        <Button
          component="a"
          endIcon={
            <ArrowSquareUpRightIcon fontSize="var(--icon-fontSize-md)" />
          }
          fullWidth
          href="#"
          sx={{ mt: 2 }}
          target="_blank"
          variant="contained"
          color="primary"
        >
          Open
        </Button> */}
        <LogoutDialog />
      </Stack>
    </Drawer>
  );
};
