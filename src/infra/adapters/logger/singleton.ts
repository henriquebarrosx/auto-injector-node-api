import { LoggerGateway } from "./gateway";
import { LoggerAdapter } from "./logger";

export abstract class LoggerSigleton {
  private static instance: LoggerGateway;

  static getInstance() {
    if (!LoggerSigleton.instance) {
      LoggerSigleton.instance = new LoggerAdapter();
    }

    return LoggerSigleton.instance;
  }
}