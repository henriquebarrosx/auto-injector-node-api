import { localDate } from "../local-date";
import { LoggerGateway } from "./gateway";
import { LocalDateFormatEnum } from "../local-date/types";

export class LoggerAdapter implements LoggerGateway {
  info(description: string): void {
    const zonedTime = localDate.format(new Date(), LocalDateFormatEnum.datetime)
    const message = `[${zonedTime}] - ${description}`
    console.log(message);
  }
  error(description: string, options: Partial<{ endpoint: string; cause: unknown; }>): void {
    const zonedTime = localDate.format(new Date(), LocalDateFormatEnum.datetime)
    const message = `[${zonedTime}] - ${description}`
    console.error(message, options);
  }
}