import { HttpRequestCallback, RequestType } from "./types";

export interface HttpServerGateway {
  init(): void;
  on(requestType: RequestType, endpoint: string, callback: HttpRequestCallback): void;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NOT_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}