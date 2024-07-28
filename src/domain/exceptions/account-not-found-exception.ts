export class AccountNotFoundException extends Error {
  readonly code = 404;

  constructor(message: string) {
    super(message);
  }
}