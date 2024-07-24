import { HttpRequestCallback, RequestType } from "./types";

export interface HttpServerGateway {
  init(): void;
  on(requestType: RequestType, endpoint: string, callback: HttpRequestCallback): void;
}