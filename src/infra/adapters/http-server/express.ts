import express, { Express, Request, Response } from 'express';

import { logger } from '../logger';
import { HttpServerGateway } from "./gateway";
import { HttpRequestCallback, RequestType } from './types';

export class ExpressAdapter implements HttpServerGateway {
  instance: Express;

  private PORT: number = parseInt(process.env.PORT ?? '3000');
  private HOSTNAME: string = process.env.HOST ?? '127.0.0.1'

  constructor() {
    this.instance = express();
    this.instance.use(express.json());
  }

  init(): void {
    this.instance.listen(this.PORT, this.HOSTNAME, () => {
      logger.info(`Server running at port ${this.PORT}`);
    });
  }

  on(requestType: RequestType, endpoint: string, callback: HttpRequestCallback): void {
    this.instance[requestType](endpoint, async (request: Request, response: Response) => {
      try {
        const { headers, body, params } = request;
        const output = await callback({ headers, body, params });
        response.status(output.status).send(output.data);
        return;
      }

      catch (exception: any) {
        if (exception.code && exception.message) {
          response.status(exception.code).send({ message: exception.message });
          return
        }

        logger.error(exception.message);
        response.status(500).send({ message: "Internal Server Error" });
        return;
      }
    })
  }
}