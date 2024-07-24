import { HttpServerGateway } from "../../adapters/http-server/gateway";

export class RouterConfig {
  constructor(private readonly httpServer: HttpServerGateway) { }

  setup(): void {
    this.httpServer.on('get', '/v1/cotacoes', () => {
      return { status: 200, data: { message: 'hello, world' } };
    });
  }
}