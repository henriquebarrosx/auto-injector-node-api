import { LocalDateFormatEnum, Period } from "./types"

export interface LocalDateGateway {
  format(date: Period, format: LocalDateFormatEnum): string
}