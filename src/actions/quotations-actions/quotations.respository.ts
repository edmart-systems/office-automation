import { logger } from "@/logger/default-logger";
import { TcsDto } from "@/types/quotations.types";
import { PrismaClient, Quotation_type } from "@prisma/client";

export class QuotationsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  fetchQuotationTypes = async (): Promise<Quotation_type[]> => {
    try {
      const quotationTypes = await this.prisma.quotation_type.findMany();
      return Promise.resolve(quotationTypes);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fetchQuotationTcs = async (): Promise<TcsDto[]> => {
    try {
      const tcs = await this.prisma.quotation_tcs.findMany({
        include: {
          bank: true,
        },
      });

      const formattedTcs: TcsDto[] = [];

      for (const tc of tcs) {
        const { bank, created_at, updated_at, ...tcsRest } = tc;
        formattedTcs.push({
          ...tcsRest,
          bank,
        });
      }

      return Promise.resolve(formattedTcs);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };
}
