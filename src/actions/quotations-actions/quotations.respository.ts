import { logger } from "@/logger/default-logger";
import { Currency2 } from "@/types/currency.types";
import {
  FullQuotation,
  NewRawQuotation,
  PaginatedQuotations,
  PaginatedQuotationsParameter,
  QuotationFilters,
  QuotationInputClientData,
  QuotationOutputLineItem,
  QuotationStatusKeys,
  QuotationStatusCounts,
  SummarizedQuotation,
  TcsDto,
  Unit2,
} from "@/types/quotations.types";
import { convertDaysToMilliseconds } from "@/utils/converters";
import { userNameFormatter } from "@/utils/formatters.util";
import { getPaginationData } from "@/utils/pagination.utils";
import { isDateExpired } from "@/utils/time";
import {
  Prisma,
  PrismaClient,
  Quotation,
  Quotation_category,
  Quotation_client_data,
  Quotation_items,
  Quotation_type,
  Unit,
} from "@prisma/client";

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

  fetchQuotationCategories = async (): Promise<Quotation_category[]> => {
    try {
      const quotationCategories =
        await this.prisma.quotation_category.findMany();
      return Promise.resolve(quotationCategories);
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

  fetchCurrencies2 = async (): Promise<Currency2[]> => {
    try {
      const currencies = await this.prisma.currency.findMany();

      const formattedCurrencies: Currency2[] = [];

      for (const item of currencies) {
        const { updated_at, created_at, ...rest } = item;
        formattedCurrencies.push({
          ...rest,
        });
      }

      return Promise.resolve(formattedCurrencies);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fetchSingleFullQuotation = async (
    quotationId: string
  ): Promise<Omit<FullQuotation, "signature"> | null> => {
    try {
      const quotation = await this.prisma.quotation.findUnique({
        where: {
          quotation_id: quotationId,
        },
        include: {
          user: {
            select: {
              co_user_id: true,
              firstName: true,
              lastName: true,
              profile_picture: true,
            },
          },
          client_data: true,
          lineItems: true,
          currency: {
            select: {
              currency_id: true,
              currency_code: true,
              currency_name: true,
            },
          },
          quotationStatus: true,
          quotationType: true,
          quotationCategory: true,
          tcs: {
            include: { bank: true },
          },
        },
      });

      if (!quotation) return Promise.resolve(null);

      const quotationType = quotation.quotationType;
      const quotationCategory = quotation.quotationCategory;

      const {
        created_at: tcsCat,
        updated_at: tcsUat,
        ...tcsRest
      } = quotation.tcs;

      const tcs: TcsDto = {
        ...tcsRest,
        validity_days: quotation.validity_days,
        payment_grace_days: quotation.payment_grace_days,
        initial_payment_percentage: quotation.initial_payment_percentage,
        last_payment_percentage: quotation.last_payment_percentage,
        edited_delivery_days: tcsRest.delivery_days,
        edited_validity_days: quotation.validity_days,
        edited_payment_grace_days: quotation.payment_grace_days,
        edited_initial_payment_percentage: quotation.initial_payment_percentage,
        edited_last_payment_percentage: quotation.last_payment_percentage,
      };

      const currency: Currency2 = quotation.currency;

      const clientData: QuotationInputClientData = {
        name: quotation.client_data.name,
        ref: quotation.client_data.external_ref,
        contactPerson: quotation.client_data.contact_person,
        email: quotation.client_data.email,
        phone: quotation.client_data.phone,
        boxNumber: quotation.client_data.box_number,
        country: quotation.client_data.country,
        city: quotation.client_data.city,
        addressLine1: quotation.client_data.address_Line_1,
      };

      const lineItems: QuotationOutputLineItem[] = [];

      for (const item of quotation.lineItems) {
        lineItems.push({
          id: item.item_id,
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          units: item.units,
          unitPrice: item.unitPrice,
        });
      }

      const user = quotation.user;

      const createdAt = Number(quotation.time);
      const expiryTime =
        createdAt + convertDaysToMilliseconds(quotation.validity_days);
      const isExpired = isDateExpired(expiryTime);

      const fullQuotation: Omit<FullQuotation, "signature"> = {
        quotationId: quotation.quotation_id,
        time: createdAt,
        type: quotationType,
        category: quotationCategory,
        tcsEdited: quotation.tcs_edited === 1,
        vatExcluded: quotation.vat_excluded === 1,
        tcs: tcs,
        currency: currency,
        clientData: clientData,
        lineItems: lineItems,
        user: user,
        expiryTime: expiryTime,
        isExpired: isExpired,
        subTotal: quotation.sub_total,
        vat: quotation.vat,
        grandTotal: quotation.grand_total,
        status: quotation.quotationStatus,
      };

      return Promise.resolve(fullQuotation);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  countExistingMonthQuotations = async (startTime: number): Promise<number> => {
    try {
      const quotationsCount = await this.prisma.quotation.count({
        where: {
          time: {
            gte: BigInt(startTime),
          },
        },
      });

      return Promise.resolve(quotationsCount);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  recordNewQuotation = async ({
    clientData,
    quotationData,
    lineItems,
  }: NewRawQuotation): Promise<Quotation> => {
    try {
      const createdQuotation: Quotation = await this.prisma.$transaction(
        async (txn): Promise<Quotation> => {
          const client = await txn.quotation_client_data.create({
            data: clientData,
          });

          const quotation: Quotation = await txn.quotation.create({
            data: { ...quotationData, client_data_id: client.client_id },
          });

          const formattedItems = lineItems.map((item) => ({
            ...item,
            quot_id: quotation.id,
          }));

          const items = await txn.quotation_items.createMany({
            data: formattedItems,
          });

          return Promise.resolve(quotation);
        }
      );
      return Promise.resolve(createdQuotation);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fetchQuotationStatusCount = async ({
    isAdmin,
    userId,
  }: {
    isAdmin: boolean;
    userId: string;
  }): Promise<QuotationStatusCounts> => {
    try {
      const counts = await this.prisma.$queryRaw<
        {
          status: QuotationStatusKeys;
          count: number;
          sum: number;
        }[]
      >`
  SELECT quotation_status.status, COALESCE(COUNT(quotation.status_id), 0) AS count, COALESCE(SUM(quotation.grand_total), 0) AS sum 
  FROM quotation_status LEFT JOIN quotation ON quotation.status_id = quotation_status.status_id 
  WHERE quotation_status.status 
  IN ('sent', 'accepted', 'rejected', 'expired') 
  GROUP BY quotation_status.status 
  order by quotation_status.status asc;
      `;

      const blankCount = {
        count: 0,
        sum: 0,
      };

      const statusCount: QuotationStatusCounts = {
        accepted: blankCount,
        rejected: blankCount,
        expired: blankCount,
        sent: blankCount,
        all: blankCount,
      };

      counts.forEach(({ status, count, sum }) => {
        const _count = Number(count);
        const _sum = Number(sum);
        statusCount[status] = { count: _count, sum: _sum };
        statusCount["all"] = {
          count: statusCount.all.count + _count,
          sum: statusCount.all.sum + _sum,
        };
      });
      return Promise.resolve(statusCount);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  fetchPaginatedQuotations = async ({
    userId,
    limit,
    offset,
    filterParams,
  }: PaginatedQuotationsParameter): Promise<PaginatedQuotations> => {
    try {
      const rawQuotations = await this.prisma.quotation.findMany({
        take: limit,
        skip: offset,
        select: {
          id: true,
          time: true,
          quotation_id: true,
          grand_total: true,
          sub_total: true,
          vat: true,
          vat_excluded: true,
          validity_days: true,
          status_id: true,

          client_data: {
            select: {
              name: true,
              contact_person: true,
              external_ref: true,
            },
          },
          quotationStatus: {
            select: {
              status: true,
              status_id: true,
            },
          },
          currency: {
            select: {
              currency_code: true,
            },
          },
          user: {
            select: {
              co_user_id: true,
              firstName: true,
              lastName: true,
              profile_picture: true,
            },
          },
          quotationCategory: true,
        },
        orderBy: {
          id: "desc",
        },
        where:
          filterParams && this.checkQuotationFilterParams(filterParams)
            ? this.processQuotationFilterParams(filterParams)
            : {},
      });

      const count = await this.prisma.quotation.count({
        where:
          filterParams && this.checkQuotationFilterParams(filterParams)
            ? this.processQuotationFilterParams(filterParams)
            : {},
      });

      const formattedQuotations: SummarizedQuotation[] = [];

      for (const quot of rawQuotations) {
        const createdAt = Number(quot.time);
        const expiryTime =
          createdAt + convertDaysToMilliseconds(quot.validity_days);
        const isExpired = isDateExpired(expiryTime);

        const formatted: SummarizedQuotation = {
          id: quot.id,
          quotationId: quot.quotation_id,
          time: createdAt,
          status_id: quot.status_id,
          status: quot.quotationStatus.status,
          category: quot.quotationCategory.cat,
          external_ref: quot.client_data.external_ref,
          grandTotal: quot.grand_total,
          subtotal: quot.sub_total,
          vat: quot.vat,
          vatExcluded: quot.vat_excluded,
          validityDays: quot.validity_days,
          clientName: quot.client_data.name,
          contactPerson: quot.client_data.contact_person,
          currency: quot.currency.currency_code,
          userId: quot.user.co_user_id,
          userName: userNameFormatter(quot.user.firstName, quot.user.lastName),
          expiryTime: expiryTime,
          isExpired: isExpired,
          profilePic: quot.user.profile_picture,
        };

        formattedQuotations.push(formatted);
      }

      const paginationData = getPaginationData(offset, limit, count);

      return Promise.resolve({
        quotations: formattedQuotations,
        pagination: paginationData,
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  private processQuotationFilterParams = (
    params: QuotationFilters
  ): Prisma.QuotationWhereInput => {
    const searchObj: Prisma.QuotationWhereInput = {};
    if (params.id) {
      searchObj["quotation_id"] = {
        contains: params.id,
        // mode: "insensitive",
      };
    }
    if (params.user) {
      searchObj["user"] = {
        firstName: {
          contains: params.user,
        },
      };
    }
    if (params.client) {
      searchObj["OR"] = [
        {
          client_data: {
            name: {
              contains: params.client,
            },
          },
        },
        {
          client_data: {
            contact_person: {
              contains: params.client,
            },
          },
        },
      ];
    }
    if (params.status) {
      searchObj["quotationStatus"] = {
        status: {
          contains: params.status,
        },
      };
    }
    if (params.dataAltered) {
      const startTime = new Date(params.start).getTime();
      const endTime = new Date(params.end).getTime();
      searchObj["time"] = {
        gte: BigInt(startTime),
        lte: BigInt(endTime),
      };
    }

    return searchObj;
  };

  private checkQuotationFilterParams = (
    filterParams: QuotationFilters
  ): boolean => {
    const { start, end, ...rest } = filterParams;
    let someValueExists = false;
    const keys = Object.keys(rest);

    for (const _key of keys) {
      const key = _key as keyof Omit<QuotationFilters, "start" | "end">;
      const value = rest[key];

      if (key === "dataAltered" && value) {
        someValueExists = true;
        break;
      }

      if (typeof value !== "boolean" && value && value.length > 2) {
        someValueExists = true;
        break;
      }
    }

    return someValueExists;
  };
}
