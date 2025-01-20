import {
  CreateQuotationPageData,
  NewQuotation,
  PaginatedQuotationsParameter,
  QuotationStatusCounts,
  RawClientQuotationData,
  RawQuotationData,
  RawQuotationLineItem,
  TcsDto,
  Unit2,
  PaginatedQuotations,
  FullQuotation,
  SingleQuotationPageData,
} from "@/types/quotations.types";
import prisma from "../../../db/db";
import { QuotationsRepository } from "./quotations.respository";
import { ActionResponse } from "@/types/actions-response.types";
import { logger } from "@/logger/default-logger";
import { Quotation_type } from "@prisma/client";
import { CompanyService } from "../company-actions/company.service";
import { CompanyDto } from "@/types/company.types";
import { Currency2 } from "@/types/currency.types";
import {
  processQuotationLineItems,
  verifyClientInfo,
  verifyLineItems,
  verifyTcs,
} from "./create-quotation";
import { SessionUser } from "../auth-actions/auth.actions";
import { verifyQuotationId } from "@/utils/verification-validation.utils";

export class QuotationsService {
  private readonly quotationsRepo = new QuotationsRepository(prisma);
  private readonly companyService = new CompanyService();

  constructor() {}

  getCreateQuotationPageData = async (): Promise<ActionResponse> => {
    try {
      const quotationTypes: Quotation_type[] =
        await this.quotationsRepo.fetchQuotationTypes();

      const company: CompanyDto = await this.companyService.getCompanyDetails();

      const tcs: TcsDto[] = await this.quotationsRepo.fetchQuotationTcs();

      const units: Unit2[] = await this.quotationsRepo.fetchUnits2();

      const currencies: Currency2[] =
        await this.quotationsRepo.fetchCurrencies2();

      const pageData: CreateQuotationPageData = {
        quotationTypes: quotationTypes,
        company: company,
        tcs: tcs,
        units: units,
        currencies: currencies,
      };

      return Promise.resolve({
        status: true,
        message: "Successful",
        data: pageData,
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  createNewQuotation = async (
    user: SessionUser,
    newQuotation: NewQuotation
  ): Promise<ActionResponse> => {
    try {
      const {
        clientData,
        lineItems,
        tcs,
        currency,
        tcsEdited,
        vatExcluded,
        time,
        type,
      } = newQuotation;

      const tcsCheck = verifyTcs({
        selectedTcs: tcs,
        quotationType: type,
        editTcs: tcsEdited,
      });

      const clientCheck = verifyClientInfo(clientData);

      const itemsCheck = verifyLineItems(lineItems);

      if (!tcsCheck.valid || !clientCheck.valid || !itemsCheck.valid) {
        const errsArr: string[] = [];
        tcsCheck.errors && errsArr.push(...tcsCheck.errors);
        clientCheck.errors && errsArr.push(...clientCheck.errors);
        itemsCheck.errors && errsArr.push(...itemsCheck.errors);

        const res: ActionResponse = {
          status: false,
          message: "Bad Request",
          data: errsArr.join(" & "),
        };
        return Promise.resolve(res);
      }

      const _clientData: RawClientQuotationData = {
        name: clientData.name,
        contact_person: clientData.contactPerson,
        external_ref: clientData.ref,
        email: clientData.email,
        phone: clientData.phone,
        country: clientData.city,
        address_Line_1: clientData.addressLine1,
        city: clientData.city,
        box_number: clientData.boxNumber,
      };

      const _lineItems: RawQuotationLineItem[] = lineItems.map((item) => {
        return {
          name: item.name!,
          description: item.description ? item.description : null,
          quantity: item.quantity!,
          unitPrice: item.unitPrice!,
          units: item.units!,
        };
      });

      const lineItemsResult = processQuotationLineItems(
        lineItems,
        vatExcluded,
        tcs
      );

      const quotationId = await this.generateQuotationId();

      const _quotationData: RawQuotationData = {
        co_user_id: user.co_user_id,
        time: BigInt(time),
        quotation_type_id: type.type_id,
        tcs_edited: tcsEdited ? 1 : 0,
        vat_excluded: vatExcluded ? 1 : 0,
        tcs_id: tcs.tc_id,
        currency_id: currency.currency_id,
        quotation_id: quotationId,
        validity_days:
          tcsEdited && tcs.edited_validity_days
            ? tcs.edited_validity_days
            : tcs.validity_days,
        payment_grace_days:
          tcsEdited && tcs.edited_payment_grace_days
            ? tcs.edited_payment_grace_days
            : tcs.payment_grace_days,
        initial_payment_percentage:
          tcsEdited && tcs.edited_initial_payment_percentage
            ? tcs.edited_initial_payment_percentage
            : tcs.initial_payment_percentage,
        last_payment_percentage:
          tcsEdited && tcs.edited_last_payment_percentage
            ? tcs.edited_last_payment_percentage
            : tcs.last_payment_percentage,
        sub_total: lineItemsResult.sub_total,
        vat: lineItemsResult.vat,
        grand_total: lineItemsResult.grand_total,
      };

      const createdQuotation = await this.quotationsRepo.recordNewQuotation({
        clientData: _clientData,
        lineItems: lineItemsResult.lineItems,
        quotationData: _quotationData,
      });

      const res: ActionResponse = {
        status: true,
        message: "Success",
        data: createdQuotation.quotation_id,
      };
      return Promise.resolve(res);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  getSingleQuotationPageData = async (
    quotationId: string
  ): Promise<ActionResponse> => {
    try {
      if (!verifyQuotationId(quotationId)) {
        return Promise.resolve({
          status: false,
          message: "Bad request",
        });
      }

      const company: CompanyDto = await this.companyService.getCompanyDetails();

      const quotation: FullQuotation | null =
        await this.quotationsRepo.fetchSingleFullQuotation(quotationId);

      if (!quotation) {
        return Promise.resolve({
          status: false,
          message: "Not Found",
        });
      }

      const pageData: SingleQuotationPageData = {
        quotation: quotation,
        company: company,
      };

      return Promise.resolve({
        status: true,
        message: "Successful",
        data: pageData,
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  getQuotationsSumSummary = async (userData: {
    isAdmin: boolean;
    userId: string;
  }): Promise<ActionResponse> => {
    try {
      const sums: QuotationStatusCounts =
        await this.quotationsRepo.fetchQuotationStatusCount(userData);

      return Promise.resolve({
        status: true,
        message: "success",
        data: sums,
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  getPaginatedQuotations = async (
    args: PaginatedQuotationsParameter
  ): Promise<ActionResponse> => {
    try {
      const paginatedQuotations: PaginatedQuotations =
        await this.quotationsRepo.fetchPaginatedQuotations(args);

      return Promise.resolve({
        status: true,
        message: "success",
        data: paginatedQuotations,
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  private generateQuotationId = async (): Promise<string> => {
    const maxMonthlyQuotations = 1000;
    const date = new Date();
    const ddStr = String(date.getDate()).padStart(2, "0");
    const mmStr = String(date.getMonth() + 1).padStart(2, "0");
    const yy = `${date.getFullYear()}`.substring(2);

    const firstPart = `Q${yy}${mmStr}${ddStr}`;

    const startOfMonthTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getTime();

    let currentMonthQuotationCount = 1;

    try {
      currentMonthQuotationCount +=
        await this.quotationsRepo.countExistingMonthQuotations(
          startOfMonthTime
        );
    } catch (err) {
      logger.error(err);
      throw new Error("Unable to generate quotation ID");
    }

    const reverseNum = maxMonthlyQuotations - currentMonthQuotationCount;
    const lastPart = (
      reverseNum > 0
        ? String(reverseNum)
        : String(maxMonthlyQuotations + currentMonthQuotationCount)
    ).padStart(3, "0");

    return firstPart + lastPart;
  };
}
