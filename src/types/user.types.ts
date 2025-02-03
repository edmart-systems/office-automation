import { Role, Status, User, User_signature } from "@prisma/client";
import { ReactElement } from "react";

export type SimpleUserDtoType = {
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
  co_user_id: string;
  otherName: string | null;
  phone_number: string;
  profile_picture: string | null;
  status_id: number;
  role_id: number;
};

// export type NewUser = {
//   co_user_id: string;
//   firstName: string;
//   lastName: string;
//   otherName: string;
//   email: string;
//   phone_number: string;
//   role_id: number;
//   status_id: number;
//   hash: string;
//   profile_picture?: string;
// };

export type NewUser = Omit<User, "userId" | "created_at" | "updated_at">;

export type UserRegInfo = {
  firstName?: string;
  lastName?: string;
  otherName?: string;
  email?: string;
  phone?: string;
  tcsAgreement?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  verifiedEmail?: string;
  verifiedPhone?: string;
};

export type UserRegPass = {
  pass1: string;
  pass2: string;
};

export type UserStatus = "active" | "blocked" | "pending" | "inactive";

export type UserStatusDto = Pick<Status, "status" | "status_id">;

export type FullUser = Omit<User, "hash"> & {
  role: Omit<Role, "created_at" | "updated_at">;
  status: Omit<Status, "created_at" | "updated_at">;
};

export type UserStatusCounts = {
  [key in UserStatus | "all"]: number;
};

export type UsersAndStatusCounts = {
  users: FullUser[];
  summary: UserStatusCounts;
};

export type UserStatusActionType = "block" | "delete" | "setLeft" | "activate";

export type UserStatusAction = {
  [key in UserStatus]: {
    name: UserStatusActionType;
    label: string;
    desc: string;
    color:
      | "error"
      | "info"
      | "success"
      | "warning"
      | "primary"
      | "inherit"
      | "secondary"
      | undefined;
    icon: ReactElement;
  }[];
};

export type PendingUserActivationData = {
  old_co_user_id: string;
  co_user_id: string;
};

export type UserSignatureDto = Omit<
  User_signature,
  "created_at" | "updated_at"
>;

export type NewSignatureData = {
  userId: string;
  dataUrl: string;
};
