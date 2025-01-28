"use server";

import { logger } from "@/logger/default-logger";
import { ActionResponse } from "@/types/actions-response.types";
import { NewSignatureData, UserSignatureDto } from "@/types/user.types";
import { getAuthSession } from "../../auth-actions/auth.actions";
import { revalidatePath } from "next/cache";
import { paths } from "@/utils/paths.utils";
import { SessionService } from "../../auth-actions/session.service";
import { UserSignatureService } from "./user-signature.service";

const signatureService = new UserSignatureService();
const sessionService = new SessionService();

export const fetchUserSignature = async (
  userId: string
): Promise<ActionResponse<UserSignatureDto>> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.checkIsUserSessionOk(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const res = await signatureService.getUserSignature(userId);

    return Promise.resolve(res);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const allowUserUpdateSignature = async (
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

    const res = await signatureService.allowUserUpdateSignature(
      userId,
      session!.user.co_user_id!
    );

    return Promise.resolve(res);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const registerUserSignature = async (
  signature: NewSignatureData
): Promise<ActionResponse<UserSignatureDto>> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.checkIsUserSessionOk(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const res = await signatureService.recordUserSignature(signature);

    if (res.status) {
      revalidatePath(paths.dashboard.users.main + "/[id]", "page");
      revalidatePath(paths.dashboard.quotations.create, "page");
    }

    return Promise.resolve(res);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const updateUserSignature = async (
  signature: NewSignatureData
): Promise<ActionResponse<UserSignatureDto>> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.checkIsUserSessionOk(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const res = await signatureService.updateUserSignature(signature);

    if (res.status) {
      revalidatePath(paths.dashboard.users.main + "/[id]", "page");
      revalidatePath(paths.dashboard.quotations.create, "page");
    }

    return Promise.resolve(res);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};
