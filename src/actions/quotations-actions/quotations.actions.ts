"use server";

import { logger } from "@/logger/default-logger";
import { ActionResponse } from "@/types/actions-response.types";
import { getAuthSession } from "../auth-actions/auth.actions";
import { SessionService } from "../auth-actions/session.service";
import { CreateQuotationPageData } from "@/types/quotations.types";

const sessionService = new SessionService();

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

      //TODO: All Login Here
      const pageData: CreateQuotationPageData = null;

      return Promise.resolve({
        status: true,
        message: "Success",
        data: pageData,
      });
    } catch (err) {
      logger.error(err);
      return Promise.resolve({
        status: false,
        message: "Something went wrong",
      });
    }
  };
