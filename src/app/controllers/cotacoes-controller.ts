import { logger } from "@adapters/logger";
import { Cotacao } from "@entities/cotacao";
import { Exception } from "@exceptions/type";
import { GetMapping } from "@decorators/GetMapping";
import { HttpRequest, ResponseEntity } from "@HttpServer";
import { CotacaoService } from "@services/cotacao-service";
import { HttpStatus } from "@adapters/http-server/gateway";
import { RestController } from "@decorators/RestController";

@RestController()
export class CotacoesController {
  constructor(
    private readonly cotacaoService: CotacaoService,
  ) { }

  @GetMapping('/v1/cotacoes')
  async getByAccount({ headers }: HttpRequest): Promise<ResponseEntity<Cotacao[] | Exception>> {
    const accountId = headers.account;

    if (!accountId) {
      logger.error('CotacoesController.getByAccount - Missing accountId from headers');
      return { status: HttpStatus.BAD_REQUEST, data: { message: 'Missing accountId from headers' } }
    }

    logger.info(`CotacoesController.getByAccount - Getting all quotes by account ${accountId}`);
    const cotacoes = await this.cotacaoService.getByAccountId(accountId);
    return { status: HttpStatus.OK, data: cotacoes }
  }
}