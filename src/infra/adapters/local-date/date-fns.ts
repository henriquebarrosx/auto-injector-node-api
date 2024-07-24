import * as DateFns from "date-fns";

import { LocalDateGateway } from "./gateway";
import { Period, LocalDateFormatEnum } from "./types";

export class DateFnsAdapter implements LocalDateGateway {
  format(date: Period, format: LocalDateFormatEnum): string {
    return DateFns.format(date, format);
  }
}