import { HttpServerGateway } from "../../adapters/http-server/gateway";
import { appModule, HttpVerbDecoratorPayload } from "../../config/controller";

export class Router {
  constructor(private readonly httpServer: HttpServerGateway) { }

  setup(): void {
    appModule.controllers.forEach((controller: any) => {
      const routes = Reflect.getMetadata('routes', controller) || [];

      routes.forEach(({ method, endpoint, callback }: HttpVerbDecoratorPayload) => {
        this.httpServer.on(method, endpoint, () => controller[callback]());
      });
    });
  }
}