"use client";

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React, { Fragment, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const timeInterval = 0.8 * 60 * 1000; // 0.8 of a Minute

export const checkSessionExpiration = async (
  sessionData: Session | null
): Promise<void> => {
  if (!sessionData) {
    return;
  }

  const { expires } = sessionData;

  const now = new Date().getTime();
  const expired = new Date(expires).getTime();

  const isExpired = expired < now;

  if (isExpired) {
    alert("This session is expired, please login again.");
    signOut();
    return;
  }

  return;
};

const SessionMonitor = ({ children }: Props) => {
  const { data: sessionData } = useSession();

  useEffect(() => {
    checkSessionExpiration(sessionData);

    const timeIntervalId = setInterval(() => {
      checkSessionExpiration(sessionData);
    }, timeInterval);

    return () => clearInterval(timeIntervalId);
  }, [sessionData]);

  return <Fragment>{children}</Fragment>;
};

export default SessionMonitor;
