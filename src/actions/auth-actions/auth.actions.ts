"use serve";

import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { LoginCredentials } from "@/types/auth.types";
import { SimpleUserDtoType } from "@/types/user.types";
import { logger } from "@/logger/default-logger";
import { UserService } from "@/actions/user-actions/user.service";

const userService = new UserService();

const login = async (
  credentials: LoginCredentials
): Promise<SimpleUserDtoType> => {
  try {
    const user: User | null = await userService.getUserByEmail(
      credentials.email
    );

    if (!user) throw new Error("Wrong credentials!");

    if (user.status_id === 4) throw new Error("Blocked Account!");

    const isPassCorrect = await bcrypt.compare(credentials.password, user.hash);

    if (!isPassCorrect) throw new Error("Wrong credentials!");

    return Promise.resolve(userService.generateSimpleUserDto(user));
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export type SessionUser = SimpleUserDtoType & {
  isAdmin: Boolean;
};

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }

  interface User extends SimpleUserDtoType {}
}

export const authOptions: NextAuthOptions = {
  // ...authConfig,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 0.5 * 24 * 60 * 60, // 0.5 day
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req): Promise<any> => {
        try {
          if (!credentials?.email || !credentials.password) {
            return Promise.resolve(null);
          }

          const loginCredentials: LoginCredentials = {
            email: credentials.email,
            password: credentials.password,
          };

          const user: SimpleUserDtoType = await login(loginCredentials);

          if (user) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (err) {
          logger.error("Error in authorization:", err);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // if (account.provider === "github") {
      //   try {
      //     const user: User | null = await userRepo.getUserByEmail(
      //       profile.email
      //     );
      //     if (!user) {
      //       //TODO: Create User
      //     }
      //   } catch (err) {
      //     console.log(err);
      //     return false;
      //   }
      // }
      // console.log(`User: ${user} \nAccount: ${account} \nProfile: ${profile}`);
      return true;
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (!user) {
        // throw new Error("Auth no user: JWT");
        return token;
      }
      token.id = user.co_user_id;
      token.picture = user.profile_picture;
      token.isAdmin = user.role_id == 1;
      token.name = user.firstName;
      token.user = user;
      return token;
    },
    session: async ({ session, token, user }) => {
      const _user = token.user as SimpleUserDtoType;
      session.user = { ..._user, isAdmin: _user.role_id == 1 };
      return session;
    },
    // ...authConfig.callbacks,
  },
};

export const {
  // handlers: { GET, POST },
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

export const getAuthSession = () => getServerSession(authOptions);
