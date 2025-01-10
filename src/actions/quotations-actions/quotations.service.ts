import {
  CreateQuotationPageData,
  TcsDto,
  Unit2,
} from "@/types/quotations.types";
import prisma from "../../../db/db";
import { QuotationsRepository } from "./quotations.respository";
import { ActionResponse } from "@/types/actions-response.types";
import { logger } from "@/logger/default-logger";
import { Quotation_type } from "@prisma/client";
import { CompanyService } from "../company-actions/company.service";
import { CompanyDto } from "@/types/company.types";
import { Currency2 } from "@/types/currency.types";

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
}
