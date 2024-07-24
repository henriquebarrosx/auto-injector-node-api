import { DateFnsAdapter } from "./date-fns";
import { LocalDateGateway } from "./gateway";

export abstract class DateFnsAdapterSingleton {
  private static instance: LocalDateGateway;

  static getInstance() {
    if (!DateFnsAdapterSingleton.instance) {
      DateFnsAdapterSingleton.instance = new DateFnsAdapter();
    }

    return DateFnsAdapterSingleton.instance;
  }
}