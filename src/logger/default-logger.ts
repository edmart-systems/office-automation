import { config } from "@/logger/config";
import { createLogger } from "@/logger/logger";

export const logger = createLogger({ level: config.logLevel });
