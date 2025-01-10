import { logger } from "@/logger/default-logger";
import { TcsDto, Unit2 } from "@/types/quotations.types";
import { PrismaClient, Quotation_type, Unit } from "@prisma/client";

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
          edited_delivery_days: tcsRest.delivery_days,
          edited_validity_days: tcsRest.validity_days,
          edited_payment_grace_days: tcsRest.payment_grace_days,
          edited_initial_payment_percentage: tcsRest.initial_payment_percentage,
          edited_last_payment_percentage: tcsRest.last_payment_percentage,
          bank,
        });
      }

      return Promise.resolve(formattedTcs);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fetchUnits2 = async (): Promise<Unit2[]> => {
    try {
      const units = await this.prisma.unit.findMany();

      const formattedUnits: Unit2[] = [];

      for (const unit of units) {
        const { updated_at, created_at, unit_desc, ...unitRest } = unit;
        formattedUnits.push({
          ...unitRest,
        });
      }

      return Promise.resolve(formattedUnits);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };
}
