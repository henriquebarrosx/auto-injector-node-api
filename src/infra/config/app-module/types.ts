import { RequestType } from '@adapters/http-server/types';

export type HttpVerbDecoratorPayload = {
  method: RequestType;
  endpoint: string;
  callback: string;
}