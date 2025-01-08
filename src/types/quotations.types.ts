import { Bank, Quotation_tcs, Quotation_type } from "@prisma/client";
import { ReactElement } from "react";
import { BankDto, CompanyDto } from "./company.types";

export type QuotationStatus = "sent" | "accepted" | "rejected" | "expired";

export type QuotationFilterKeys = "id" | "status" | "user" | "start" | "end";

export type QuotationFilters = {
  [key in QuotationFilterKeys]: string | null;
};

export type Quotation_Status = QuotationStatus | "all";

export const compareFilters = (
  prev: QuotationFilters,
  current: QuotationFilters
): boolean => {
  let isMatching = true;
  const entries = Object.entries(prev);

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const _key = key as QuotationFilterKeys;

    if (current[_key] !== value) {
      isMatching = false;
      break;
    }
  }

  return isMatching;
};

export type QuotationsAnalyticSummary = {
  [key in QuotationStatus]: {
    count: number;
    total: number;
  };
};

export type QuotationStatusActionType = "setAccepted" | "setRejected";

export type QuotationStatusAction = {
  [key in QuotationStatus]: {
    name: QuotationStatusActionType;
    label: string;
    desc: string;
    color:
      | "error"
      | "info"
      | "success"
      | "warning"
      | "primary"
      | "inherit"
      | "secondary"
      | undefined;
    icon: ReactElement;
  }[];
};

export type TcsDto = Omit<Quotation_tcs, "created_at" | "updated_at"> & {
  bank: BankDto;
};

export type CreateQuotationPageData = {
  company: CompanyDto;
  quotationTypes: Quotation_type[];
  tcs: TcsDto[];
};
