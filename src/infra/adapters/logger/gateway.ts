export interface LoggerGateway {
  info(description: string): void;
  error(description: string, options?: Partial<LoggerOptions>): void;
}

type LoggerOptions = {
  endpoint: string;
  cause: unknown;
}