import { logger } from "@adapters/logger";
import { Cotacao } from "@entities/cotacao";
import { GetMapping } from "@decorators/GetMapping";
import { HttpRequest, ResponseEntity } from "@HttpServer";
import { CotacaoService } from "@services/cotacao-service";
import { RestController } from "@decorators/RestController";
import { Exception } from "../../domain/types/exception";

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
      return { status: 400, data: { message: 'Missing accountId from headers' } }
    }

    logger.info(`CotacoesController.getByAccount - Getting all quotes by account ${accountId}`);
    const cotacoes = await this.cotacaoService.getByAccountId(accountId);
    return { status: 200, data: cotacoes }
  }
}