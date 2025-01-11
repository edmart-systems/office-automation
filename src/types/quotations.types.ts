import { Bank, Quotation_tcs, Quotation_type, Unit } from "@prisma/client";
import { ReactElement } from "react";
import { BankDto, CompanyDto } from "./company.types";
import { Currency2 } from "./currency.types";

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
  edited_validity_days: number | null;
  edited_delivery_days: number | null;
  edited_payment_grace_days: number | null;
  edited_initial_payment_percentage: number | null;
  edited_last_payment_percentage: number | null;

  bank: BankDto;
};

export type Unit2 = Omit<Unit, "unit_desc" | "updated_at" | "created_at">;

export type CreateQuotationPageData = {
  company: CompanyDto;
  quotationTypes: Quotation_type[];
  tcs: TcsDto[];
  units: Unit2[];
  currencies: Currency2[];
};

export type QuotationInputClientData = {
  name: string | null;
  ref: string | null;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  boxNumber: number | null;
  country: string | null;
  city: string | null;
  addressLine1: string | null;
};

export type QuotationClientData = {
  name: string;
  ref: string | null;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  boxNumber: number | null;
  country: string | null;
  city: string | null;
  addressLine1: string | null;
};

export type QuotationLineItem = {
  id: number;
  name?: string | null;
  description?: string | null;
  quantity?: number | null;
  units?: string | null;
  unitPrice?: number | null;
};

export type QuotationPriceSummary = {
  subtotal: number;
  vat: number;
  finalTotal: number;
};

export type QuotationError = {
  id?: number;
  message: string;
  origin: "TCs" | "Client Info" | "Line Items";
};

export type QuotationTcsItemRange = {
  min: number;
  max: number;
};
