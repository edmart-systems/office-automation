import { PrismaClient } from "@prisma/client";

export class QuotationsRepository {
  constructor(private readonly prisma: PrismaClient) {}
}
