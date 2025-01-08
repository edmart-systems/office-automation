"use server";

import { logger } from "@/logger/default-logger";
import {
  ActionResponse,
  isActionResponse,
} from "@/types/actions-response.types";
import {
  FullUser,
  UserRegInfo,
  UserRegPass,
  UsersAndStatusCounts,
  UserStatus,
} from "@/types/user.types";
import { User } from "@prisma/client";
import { CheckUserExistenceType } from "@/types/verification.types";
import { UserService } from "./user.service";
import { getAuthSession } from "../auth-actions/auth.actions";
import { revalidatePath } from "next/cache";
import { paths } from "@/utils/paths.utils";
import { Session } from "next-auth";
import { SessionService } from "../auth-actions/session.service";

const userService = new UserService();
const sessionService = new SessionService();

export const checkCredentialsExistence = async (
  credentials: CheckUserExistenceType
): Promise<ActionResponse> => {
  try {
    if (!credentials.email && !credentials.phone) {
      throw new Error("Invalid Credentials");
    }
    const isUserExisting = await userService.isUserExisting(credentials);

    if (isUserExisting) {
      return Promise.resolve({
        status: true,
        message: credentials.email
          ? "Email address is already registered on the system"
          : credentials.phone
          ? "Phone number is already registered on the system"
          : "User is already registered on the system",
      });
    }

    return Promise.resolve({
      status: false,
      message: "User not existing",
    });
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const createUserAccount = async (
  newUserInfo: UserRegInfo,
  userPass: UserRegPass
): Promise<ActionResponse> => {
  try {
    const res: ActionResponse = await userService.createNewUser({
      newUserInfo,
      userPass,
    });

    return Promise.resolve(res);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const fetchAllUsers = async (
  status: UserStatus | null
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.isUserSessionManager(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const usersData: UsersAndStatusCounts = await userService.fetchUsers(
      status
    );

    return Promise.resolve({
      status: true,
      message: "Successful",
      data: usersData,
    });
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const fetchSingleUser = async (
  userId: string
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.isUserSessionManager(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const userData: ActionResponse = await userService.getUserById(userId);

    return Promise.resolve(userData);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const activateUserAction = async (
  userId: string
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.isUserSessionManager(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    if (
      !(await userService.userCanUpdateOtherUsersAccountStatus(userId, session))
    ) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const activateUserActionResponse = await userService.activateUserHandler(
      userId
    );

    revalidatePath(paths.dashboard.users.main + "/[id]", "page");
    return Promise.resolve(activateUserActionResponse);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const deleteUserAction = async (
  userId: string
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.isUserSessionManager(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    if (
      !(await userService.userCanUpdateOtherUsersAccountStatus(userId, session))
    ) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const deleteActionResponse = await userService.deleteUserHandler(userId);

    revalidatePath(paths.dashboard.users.main + "/[id]", "page");
    return Promise.resolve(deleteActionResponse);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const blockUserAction = async (
  userId: string,
  reason?: string
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.isUserSessionManager(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    if (
      !(await userService.userCanUpdateOtherUsersAccountStatus(userId, session))
    ) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const blockActionResponse = await userService.blockUserHandler(
      userId,
      reason
    );

    revalidatePath(paths.dashboard.users.main + "/[id]", "page");
    return Promise.resolve(blockActionResponse);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const setUserAsLeftAction = async (
  userId: string,
  reason?: string
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.isUserSessionManager(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    if (
      !(await userService.userCanUpdateOtherUsersAccountStatus(userId, session))
    ) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const setLeftActionResponse = await userService.setUserAsLeftHandler(
      userId,
      reason
    );

    revalidatePath(paths.dashboard.users.main + "/[id]", "page");
    return Promise.resolve(setLeftActionResponse);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};
