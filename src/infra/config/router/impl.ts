import { appModule } from "@configs/app-module";
import { HttpServerGateway } from "@adapters/http-server/gateway";
import { HttpVerbDecoratorPayload } from "@configs/app-module/types";

export class Router {
  constructor(private readonly httpServer: HttpServerGateway) { }

  async setup(): Promise<void> {
    await appModule.loadContext();

    appModule.controllers.forEach((controller: any) => {
      const routes = Reflect.getMetadata('routes', controller) || [];

      routes.forEach(({ method, endpoint, callback }: HttpVerbDecoratorPayload) => {
        this.httpServer.on(method, endpoint, () => controller[callback]());
      });
    });
  }
}