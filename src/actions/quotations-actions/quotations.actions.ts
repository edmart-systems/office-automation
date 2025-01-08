"use server";

import { logger } from "@/logger/default-logger";
import { ActionResponse } from "@/types/actions-response.types";
import { getAuthSession } from "../auth-actions/auth.actions";
import { SessionService } from "../auth-actions/session.service";
import { CreateQuotationPageData } from "@/types/quotations.types";
import { QuotationsService } from "./quotations.service";

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
        await quotationsService.getCreateQuotationPageData();

      return Promise.resolve(pageDataRes);
    } catch (err) {
      logger.error(err);
      return Promise.resolve({
        status: false,
        message: "Something went wrong",
      });
    }
  };
