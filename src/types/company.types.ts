import { Bank, Company, Company_address } from "@prisma/client";

export type CompanyDto = Omit<Company, "created_at" | "updated_at"> & {
  address: Omit<Company_address, "created_at" | "updated_at">;
};

export type BankDto = Omit<Bank, "created_at" | "updated_at">;
