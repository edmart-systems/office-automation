"use client";

import React, { useEffect } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { createTheme } from "@/styles/theme/create-theme";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setThemeMode } from "@/redux/slices/theme.slice";
import ScreenLoader from "../errors/screen-loading";
import nProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { checkSessionExpiration } from "../auth/session-monitor";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): React.JSX.Element => {
  const { mode } = useAppSelector((state) => state.theme);
  const { data: sessionData } = useSession();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    nProgress.done();
    if (mode == null) {
      dispatch(setThemeMode(prefersDarkMode ? "dark" : "light"));
    }
    checkSessionExpiration(sessionData);
  }, [mode, pathName, searchParams]);

  if (!mode) {
    return <ScreenLoader fullScreen />;
  }

  const theme = createTheme(mode);

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
