import { HttpStatus } from "@adapters/http-server/gateway";

export class AccountNotFoundException extends Error {
  readonly code = HttpStatus.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}