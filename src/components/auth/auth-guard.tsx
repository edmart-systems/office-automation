"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/utils/paths.utils";
import { logger } from "@/logger/default-logger";
import { useSession } from "next-auth/react";
import ScreenLoader from "../errors/screen-loading";
import nProgress from "nprogress";

export interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): React.JSX.Element | null => {
  const router = useRouter();
  const { status, data } = useSession();

  const checkPermissions = async (): Promise<void> => {
    if (status == "loading") {
      return;
    }

    if (status == "unauthenticated") {
      // logger.warn("[AuthGuard]: User is not logged in, redirecting to sign in");
      nProgress.start();
      router.replace(paths.auth.login);
      return;
    }
  };

  useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [status]);

  if (status == "authenticated") {
    return <>{children}</>;
  } else {
    return <ScreenLoader fullScreen />;
  }
};

export default AuthGuard;
