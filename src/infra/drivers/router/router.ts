import { HttpServerGateway } from "../../adapters/http-server/gateway";
import { controllers, HttpVerbDecoratorPayload } from "../../config/controller";

export class Router {
  constructor(private readonly httpServer: HttpServerGateway) { }

  setup(): void {
    controllers
      .filter((controller: any) => controller.prototype.isRestController)
      .forEach((controller: any) => {
        const routes = controller.routes as HttpVerbDecoratorPayload[];

        routes.forEach(({ method, endpoint, callback }: HttpVerbDecoratorPayload) => {
          this.httpServer.on(method, endpoint, callback);
        });
      });
  }
}