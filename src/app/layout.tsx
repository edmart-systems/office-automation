import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Fragment, ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import "@/styles/global.css";
import { LocalizationProvider } from "@/components/core/localization-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AuthProvider from "@/components/auth/auth-provider";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/toast/toast-provider";
import ReduxProvider from "@/components/redux/redux-provider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

export const metadata: Metadata = {
  title: "Office X",
  description: "Office Automation System",
};

type Props = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader color="#D98219" height={4} />
        <AuthProvider>
          <LocalizationProvider>
            <Fragment>
              <ReduxProvider>
                <ThemeProvider>
                  {children}
                  <ToastProvider />
                </ThemeProvider>
              </ReduxProvider>
            </Fragment>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
