"use client";

import { checkUserStatusAction } from "@/actions/user-actions/user.actions";
import { ActionResponse } from "@/types/actions-response.types";
import { UserStatusDto } from "@/types/user.types";
import { isDateExpired } from "@/utils/time";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { Fragment, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const timeInterval = 0.5 * 60 * 1000; // 0.8 of a Minute

const checkIsSessionExpired = (expiryTime: string): boolean => {
  return isDateExpired(expiryTime); // True if Expired
};

export const checkSessionExpiration = async (
  pathName: string,
  sessionData: Session | null
): Promise<void> => {
  if (!sessionData) {
    return;
  }

  const { expires, user } = sessionData;

  if (checkIsSessionExpired(expires)) {
    alert("This session is expired, please login again.");
    signOut();
    return;
  }

  const userStatusRes: ActionResponse<UserStatusDto> =
    await checkUserStatusAction(user.co_user_id);

  if (!userStatusRes.data) {
    alert("Unknown user session, please login again.");
    signOut();
    return;
  }

  if (pathName.startsWith("/dashboard")) {
    if (userStatusRes.data.status_id === 1) {
      return;
    }

    alert("User status changed, please login again.");
    signOut();
    return;
  }

  if (
    pathName.startsWith("/pending-account") ||
    pathName.startsWith("/blocked-account")
  ) {
    if (userStatusRes.data.status_id === 1) {
      alert("User status changed, please login again.");
      signOut();
      return;
    }

    return;
  }

  return;
};

const SessionMonitor = ({ children }: Props) => {
  const { data: sessionData } = useSession();
  const pathName = usePathname();

  useEffect(() => {
    checkSessionExpiration(pathName, sessionData);

    const timeIntervalId = setInterval(() => {
      checkSessionExpiration(pathName, sessionData);
    }, timeInterval);

    return () => clearInterval(timeIntervalId);
  }, [sessionData, pathName]);

  return <Fragment>{children}</Fragment>;
};

export default SessionMonitor;
