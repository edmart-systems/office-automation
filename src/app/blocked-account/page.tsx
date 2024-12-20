import UserBlocked from "@/components/blocked-user/user-blocked";
import UserPending from "@/components/pending-user/user-pending";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pending Account | Office X",
  description: "User Suspended",
};

const UserPendingPage = () => {
  return <UserBlocked />;
};

export default UserPendingPage;
