"use server";

import { logger } from "@/logger/default-logger";
import { ActionResponse } from "@/types/actions-response.types";
import { getAuthSession } from "../auth-actions/auth.actions";
import { SessionService } from "../auth-actions/session.service";
import {
  CreateQuotationPageData,
  NewQuotation,
  PaginatedQuotationsParameter,
  QuotationFilters,
} from "@/types/quotations.types";
import { QuotationsService } from "./quotations.service";
import { revalidatePath } from "next/cache";
import { paths } from "@/utils/paths.utils";

const sessionService = new SessionService();
const quotationsService = new QuotationsService();

export const getCreateNewQuotationsPageData =
  async (): Promise<ActionResponse> => {
    try {
      const session = await getAuthSession();

      if (!(await sessionService.checkIsUserSessionOk(session))) {
        return Promise.resolve({
          status: false,
          message: "Not Authorized",
        });
      }

      const pageDataRes: ActionResponse =
        await quotationsService.getCreateQuotationPageData(
          session!.user.co_user_id
        );

      return Promise.resolve(pageDataRes);
    } catch (err) {
      logger.error(err);
      return Promise.resolve({
        status: false,
        message: "Something went wrong",
      });
    }
  };

export const createNewQuotation = async (
  quotation: NewQuotation
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.checkIsUserSessionOk(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const res = await quotationsService.createNewQuotation(
      session?.user!,
      quotation
    );

    revalidatePath(paths.dashboard.quotations.main);
    return Promise.resolve(res);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const getQuotationsSums = async (): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.checkIsUserSessionOk(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const res = await quotationsService.getQuotationsSumSummary({
      userId: session!.user.co_user_id,
      isAdmin: Boolean(session!.user.isAdmin),
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

export const getPaginatedQuotation = async (
  details: Omit<PaginatedQuotationsParameter, "userId"> & {
    filterParams?: QuotationFilters;
  }
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.checkIsUserSessionOk(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const res = await quotationsService.getPaginatedQuotations({
      ...details,
      userId: session!.user.co_user_id,
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

export const fetchSingleQuotation = async (
  quotationId: string
): Promise<ActionResponse> => {
  try {
    const session = await getAuthSession();

    if (!(await sessionService.checkIsUserSessionOk(session))) {
      return Promise.resolve({
        status: false,
        message: "Not Authorized",
      });
    }

    const userData: ActionResponse =
      await quotationsService.getSingleQuotationPageData(quotationId);

    return Promise.resolve(userData);
  } catch (err) {
    logger.error(err);
    return Promise.resolve({
      status: false,
      message: "Something went wrong",
    });
  }
};
