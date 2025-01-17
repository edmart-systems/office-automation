"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/utils/paths.utils";
import { signOut, useSession } from "next-auth/react";
import ScreenLoader from "../common/screen-loading";
import { toast } from "react-toastify";
import nProgress from "nprogress";

export interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard = ({
  children,
}: GuestGuardProps): React.JSX.Element | null => {
  const router = useRouter();
  const { status, data } = useSession();

  const checkPermissions = async (): Promise<void> => {
    if (status == "loading") {
      return;
    }

    if (status == "authenticated" && data) {
      const { status_id, role_id } = data.user;
      nProgress.start();

      if (status_id === 1) {
        return router.replace(paths.dashboard.overview);
      }

      if (status_id === 2) {
        return router.replace(paths.userStatus.blocked);
      }

      if (status_id === 3) {
        return router.replace(paths.userStatus.pending);
      }

      if (status_id === 4) {
        toast("Account Disabled", { type: "warning" });
        await signOut();
        return;
      }

      await signOut();
      // return router.replace(paths.auth.login);
      return;
    }
  };

  useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [status]);

  if (status == "unauthenticated") {
    return <>{children}</>;
  } else {
    return <ScreenLoader fullScreen />;
  }
};

export default GuestGuard;
