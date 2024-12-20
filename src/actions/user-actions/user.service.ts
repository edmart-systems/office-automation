import { logger } from "@/logger/default-logger";
import prisma from "../../../db/db";
import { UserRepository } from "./user.repository";
import { CheckUserExistenceType } from "@/types/verification.types";
import {
  FullUser,
  NewUser,
  PendingUserActivationData,
  UserDtoType,
  UserRegInfo,
  UserRegPass,
  UsersAndStatusCounts,
  UserStatus,
} from "@/types/user.types";
import { User } from "@prisma/client";
import { formatPhoneNumber } from "@/utils/formatters.util";
import bcrypt from "bcryptjs";
import { ActionResponse } from "@/types/actions-response.types";
import {
  validateCompanyId,
  validateEmailAddress,
  validatePhoneNumber,
  validateUserName,
} from "@/utils/verification-validation.utils";
import {
  sendAccountApprovedEmail,
  sendNewAccountEmail,
} from "@/comm/emails/user.emails";
import { Session } from "next-auth";

export class UserService {
  private readonly userRepo = new UserRepository(prisma);

  constructor() {}

  createNewUser = async ({
    newUserInfo,
    userPass,
  }: {
    newUserInfo: UserRegInfo;
    userPass: UserRegPass;
  }): Promise<ActionResponse> => {
    try {
      const {
        firstName,
        lastName,
        otherName,
        email,
        phone,
        tcsAgreement,
        emailVerified,
        phoneVerified,
      } = newUserInfo;
      const { pass1, pass2 } = userPass;

      if (!tcsAgreement) {
        return Promise.resolve({
          status: false,
          message: "You must accept the terms and conditions",
        });
      }

      if (!email || !validateEmailAddress(email)) {
        return Promise.resolve({
          status: false,
          message: "Invalid User Email",
        });
      }

      if (!phone || !validatePhoneNumber(phone)) {
        return Promise.resolve({
          status: false,
          message: "Invalid Phone Number",
        });
      }

      if (!emailVerified) {
        return Promise.resolve({
          status: false,
          message: "User email must be verified",
        });
      }

      if (!validateUserName(firstName, lastName, otherName)) {
        return Promise.resolve({
          status: false,
          message: "Invalid user name",
        });
      }

      const isUserExisting = await this.isUserExisting({ email, phone });

      if (isUserExisting) {
        return Promise.resolve({
          status: false,
          message: "User is already registered on the system",
        });
      }

      const formattedPhoneNumber = formatPhoneNumber(phone);
      const co_user_id: string = await this.generateCompanyId({
        firstTime: true,
      });
      const hash: string = await bcrypt.hash(pass1, 2);
      const role: number = 2;
      const status: number = 3;

      const newUser: NewUser = {
        co_user_id: co_user_id,
        firstName: firstName!,
        lastName: lastName!,
        otherName: otherName ?? "",
        email: email,
        phone_number: formattedPhoneNumber,
        role_id: role,
        status_id: status,
        hash: hash,
        email_verified: emailVerified ? 1 : 0,
        phone_verified: phoneVerified ? 1 : 0,
        profile_picture: null,
        status_reason: null,
      };

      const createdUser: User | null = await this.userRepo.createNewUser(
        newUser
      );

      if (!createdUser) {
        return Promise.resolve({
          status: false,
          message: "Failed to create new account",
        });
      }

      sendNewAccountEmail(createdUser);

      return Promise.resolve({
        status: true,
        message: "User created successfully",
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      return Promise.resolve(await this.userRepo.getUserByEmail(email));
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  getUserById = async (userId: string): Promise<ActionResponse> => {
    try {
      if (!validateCompanyId(userId)) {
        return Promise.resolve({
          status: false,
          message: "Unknown User",
        });
      }
      const user: FullUser = await this.userRepo.fetchUserById(userId);

      return Promise.resolve({
        status: true,
        message: "Successful",
        data: user,
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  deleteUserHandler = async (userId: string): Promise<ActionResponse> => {
    try {
      if (!validateCompanyId(userId)) {
        return Promise.resolve({
          status: false,
          message: "Unknown User",
        });
      }

      const user = await this.userRepo.fetchUserById(userId);

      if (user.status.status !== "pending") {
        return Promise.resolve({
          status: false,
          message: "User can't be deleted",
        });
      }

      const deletedUser: User | null = await this.userRepo.deleteUserById(
        userId
      );

      if (!deletedUser) {
        return Promise.resolve({
          status: false,
          message: "Failed to delete user",
        });
      }

      return Promise.resolve({
        status: true,
        message: "User deleted successfully",
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  activateUserHandler = async (userId: string): Promise<ActionResponse> => {
    try {
      if (!validateCompanyId(userId)) {
        return Promise.resolve({
          status: false,
          message: "Unknown User",
        });
      }

      const user = await this.userRepo.fetchUserById(userId);

      if (user.status.status === "active") {
        return Promise.resolve({
          status: false,
          message: "User can't be activated",
        });
      }

      if (user.status.status !== "pending") {
        const activatedUser: User | null = await this.userRepo.activateUserById(
          userId
        );

        if (!activatedUser) {
          return Promise.resolve({
            status: false,
            message: "Failed to activate user",
          });
        }

        return Promise.resolve({
          status: true,
          message: "User activated successfully",
        });
      }

      const newCompanyId = await this.generateCompanyId({ firstTime: false });

      const activationData: PendingUserActivationData = {
        co_user_id: newCompanyId,
        old_co_user_id: userId,
      };

      const activatedUser: User | null =
        await this.userRepo.activatePendingUser(activationData);

      if (!activatedUser) {
        return Promise.resolve({
          status: false,
          message: "Failed to activate user",
        });
      }

      sendAccountApprovedEmail(activatedUser);

      return Promise.resolve({
        status: true,
        message: "User activated successfully",
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  blockUserHandler = async (
    userId: string,
    reason?: string
  ): Promise<ActionResponse> => {
    try {
      if (!validateCompanyId(userId)) {
        return Promise.resolve({
          status: false,
          message: "Unknown User",
        });
      }

      const user = await this.userRepo.fetchUserById(userId);

      if (user.status.status !== "active") {
        return Promise.resolve({
          status: false,
          message: "User can't be blocked",
        });
      }

      const blockedUser: User | null = await this.userRepo.blockUserById(
        userId,
        reason
      );

      if (!blockedUser) {
        return Promise.resolve({
          status: false,
          message: "Failed to block user",
        });
      }

      return Promise.resolve({
        status: true,
        message: "User blocked successfully",
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  setUserAsLeftHandler = async (
    userId: string,
    reason?: string
  ): Promise<ActionResponse> => {
    try {
      if (!validateCompanyId(userId)) {
        return Promise.resolve({
          status: false,
          message: "Unknown User",
        });
      }

      const user = await this.userRepo.fetchUserById(userId);

      if (user.status.status !== "active" && user.status.status !== "blocked") {
        return Promise.resolve({
          status: false,
          message: "User can't be set to left",
        });
      }

      const setToLeftUser: User | null = await this.userRepo.setUserAsLeftById(
        userId,
        reason
      );

      if (!setToLeftUser) {
        return Promise.resolve({
          status: false,
          message: "Failed to set user as left",
        });
      }

      return Promise.resolve({
        status: true,
        message: "User successfully set as left",
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  isUserExisting = async (
    credentials: CheckUserExistenceType
  ): Promise<boolean> =>
    Promise.resolve(await this.userRepo.checkUserExistence(credentials));

  fetchUsers = async (
    status: UserStatus | null
  ): Promise<UsersAndStatusCounts> => {
    try {
      const users = await this.userRepo.fetchUsers(status);
      const usersStatusCount = await this.userRepo.getUserStatusCount();
      return Promise.resolve({ users: users, summary: usersStatusCount });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  generateUserDto = (user: User): UserDtoType => {
    const { hash, created_at, updated_at, ...rest } = user;
    return rest;
  };

  generateCompanyId = async ({
    firstTime,
  }: {
    firstTime: boolean;
  }): Promise<string> => {
    try {
      const date = new Date();
      const mmStr = `${date.getMonth() + 1}`;
      const _mmStr = mmStr.length === 1 ? `0${mmStr}` : `${mmStr}`;
      const yy = `${date.getFullYear()}`.substring(2);
      const firstPart = firstTime ? "TEMP" : "ESUL";
      const secondPart = _mmStr + yy;
      const newUserNumber: number =
        (await this.userRepo.countExistingUsers(firstPart + secondPart)) + 1;
      const thirdPart =
        newUserNumber < 10
          ? `00${newUserNumber}`
          : newUserNumber < 100
          ? `0${newUserNumber}`
          : `${newUserNumber}`;
      const newUserId = firstPart + secondPart + thirdPart;
      return Promise.resolve(newUserId);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  isUserSessionManager = async (session: Session | null): Promise<boolean> => {
    if (!session || session.user.role_id !== 1) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  };

  userCanUpdateOtherUsersAccountStatus = async (
    otherUserId: string,
    session: Session | null
  ): Promise<boolean> => {
    if (!session || session.user.co_user_id === otherUserId) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  };
}
