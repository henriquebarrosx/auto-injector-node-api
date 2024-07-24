import express, { Express, Request, Response } from 'express';

import { logger } from '../logger';
import { HttpServerGateway } from "./gateway";
import { HttpRequestCallback, RequestType } from './types';

export class ExpressAdapter implements HttpServerGateway {
  instance: Express;

  private PORT: string = process.env.PORT ?? '3000';

  constructor() {
    this.instance = express();
    this.instance.use(express.json());
  }

  init(): void {
    this.instance.listen(this.PORT, () => {
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
          logger.error(exception.message);
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