import { Session } from "next-auth";

export class SessionService {
  isUserSessionManager = async (session: Session | null): Promise<boolean> => {
    if (!session || session.user.role_id !== 1) {
      return Promise.resolve(false);
    }

    if (this.checkIsSessionExpired(session)) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  };

  checkIsUserSessionOk = async (session: Session | null): Promise<boolean> => {
    if (!session) {
      return Promise.resolve(false);
    }

    if (this.checkIsSessionExpired(session)) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  };

  private checkIsSessionExpired = (session: Session): boolean => {
    const { expires } = session;
    const now = new Date().getTime();
    const expiry = new Date(expires).getTime();
    return expiry < now; // True if Expired
  };
}
