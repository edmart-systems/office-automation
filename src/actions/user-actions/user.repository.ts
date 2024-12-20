import { logger } from "@/logger/default-logger";
import {
  FullUser,
  NewUser,
  PendingUserActivationData,
  UserStatus,
  UserStatusCounts,
} from "@/types/user.types";
import { CheckUserExistenceType } from "@/types/verification.types";
import { PrismaClient, Role, Status, User } from "@prisma/client";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const user: User | null = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          role: true,
          status: true,
        },
      });

      if (!user) {
        return Promise.resolve(null);
      }

      return Promise.resolve(user);
    } catch (err) {
      logger.error(err);
      return Promise.resolve(null);
    }
  };

  checkUserExistence = async (
    credentials: CheckUserExistenceType
  ): Promise<boolean> => {
    try {
      const { email, phone } = credentials;

      if (!email && !phone) {
        throw new Error("Invalid Credentials");
      }
      const user: User | null = await this.prisma.user.findFirst({
        where: {
          OR:
            email && phone
              ? [{ email: email }, { phone_number: phone }]
              : !email && phone
              ? [{ phone_number: phone }]
              : email && !phone
              ? [{ email: email }]
              : [],
        },
      });

      if (user) {
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  createNewUser = async (newUser: NewUser): Promise<User | null> => {
    try {
      const user: User = await this.prisma.user.create({
        data: {
          ...newUser,
        },
      });

      if (user) {
        return Promise.resolve(user);
      }

      return Promise.resolve(null);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  countExistingUsers = async (prefix: string): Promise<number> => {
    try {
      const userCount = await this.prisma.user.count({
        where: {
          co_user_id: {
            startsWith: prefix,
          },
        },
      });

      return Promise.resolve(userCount);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fetchUsers = async (status: UserStatus | null): Promise<FullUser[]> => {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          role: true,
          status: true,
        },
        orderBy: {
          userId: "desc",
        },
        ...(status && {
          where: {
            status: {
              status: status,
            },
          },
        }),
      });

      const fullUsers: FullUser[] = [];

      for (let i = 0; i < users.length; i++) {
        const { role, status, ...rest } = users[i];
        fullUsers.push(this.fullUserProcessor(rest, role, status));
      }

      return Promise.resolve(fullUsers);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  getUserStatusCount = async (): Promise<UserStatusCounts> => {
    try {
      const counts = await this.prisma.$queryRaw<
        {
          status: UserStatus;
          count: number;
        }[]
      >`
  SELECT status.status, COALESCE(COUNT(user.status_id), 0) AS count FROM status LEFT JOIN user ON user.status_id = status.status_id WHERE status.status IN ('active', 'blocked', 'pending', 'inactive') GROUP BY status.status order by status.status asc;
      `;

      const statusCount: UserStatusCounts = {
        active: 0,
        blocked: 0,
        inactive: 0,
        pending: 0,
        all: 0,
      };

      counts.forEach(({ status, count }) => {
        const _count = parseInt(`${count}`, 10);
        statusCount[status] = _count;
        statusCount.all += _count;
      });

      return Promise.resolve(statusCount);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fetchUserById = async (userId: string): Promise<FullUser> => {
    try {
      const user = await this.prisma.user.findUnique({
        include: {
          role: true,
          status: true,
        },
        where: {
          co_user_id: userId,
        },
      });

      if (!user) {
        return Promise.reject(`User ${userId} not found`);
      }

      const { role, status, ...rest } = user;
      const fullUser = this.fullUserProcessor(rest, role, status);

      return Promise.resolve(fullUser);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  deleteUserById = async (userId: string): Promise<User | null> => {
    try {
      const user = await this.prisma.user.delete({
        where: {
          co_user_id: userId,
          status_id: 3, // Only delete Pending Users
        },
      });

      if (!user) {
        return Promise.resolve(null);
      }

      return Promise.resolve(user);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  blockUserById = async (
    userId: string,
    reason?: string
  ): Promise<User | null> => {
    try {
      const user = await this.prisma.user.update({
        data: {
          status_id: 2,
          status_reason: reason ? reason.substring(0, 200) : null,
        },
        where: {
          co_user_id: userId,
          status_id: 1,
        },
      });

      if (!user) {
        return Promise.resolve(null);
      }

      return Promise.resolve(user);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  activateUserById = async (userId: string): Promise<User | null> => {
    try {
      const user = await this.prisma.user.update({
        data: {
          status_id: 1,
          status_reason: null,
        },
        where: {
          co_user_id: userId,
          NOT: {
            status_id: 1,
          },
        },
      });

      if (!user) {
        return Promise.resolve(null);
      }

      return Promise.resolve(user);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  activatePendingUser = async (
    userInfo: PendingUserActivationData
  ): Promise<User | null> => {
    try {
      const user = await this.prisma.user.update({
        data: {
          co_user_id: userInfo.co_user_id,
          status_id: 1,
          status_reason: null,
        },
        where: {
          co_user_id: userInfo.old_co_user_id,
          NOT: {
            status_id: 1,
          },
        },
      });

      if (!user) {
        return Promise.resolve(null);
      }

      return Promise.resolve(user);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  setUserAsLeftById = async (
    userId: string,
    reason?: string
  ): Promise<User | null> => {
    try {
      const user = await this.prisma.user.update({
        data: {
          status_id: 4,
          status_reason: reason ? reason.substring(0, 200) : null,
        },
        where: {
          co_user_id: userId,
          status_id: {
            in: [1, 2],
          },
        },
      });

      if (!user) {
        return Promise.resolve(null);
      }

      return Promise.resolve(user);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fullUserProcessor = (user: User, role: Role, status: Status): FullUser => {
    const { hash, ...userRest } = user;
    const {
      created_at: roleCreated_at,
      updated_at: roleUpdated_at,
      ...roleRest
    } = role;
    const {
      created_at: statusCreated_at,
      updated_at: statusUpdated_at,
      ...statusRest
    } = status;
    return {
      ...userRest,
      role: roleRest,
      status: statusRest,
    };
  };
}
