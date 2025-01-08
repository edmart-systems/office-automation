import prisma from "../../../db/db";
import { QuotationsRepository } from "./quotations.respository";

export class QuotationsService {
  private readonly quotationsRepo = new QuotationsRepository(prisma);
  constructor() {}
}
