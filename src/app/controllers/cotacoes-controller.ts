import { logger } from "@adapters/logger";
import { Cotacao } from "@entities/cotacao";
import { ResponseEntity } from "@HttpServer";
import { GetMapping } from "@decorators/GetMapping";
import { CotacaoService } from "@services/cotacao-service";
import { RestController } from "@decorators/RestController";

@RestController()
export class CotacoesController {
  constructor(
    private readonly cotacaoService: CotacaoService,
  ) { }

  @GetMapping('/v1/cotacoes')
  async getAll(): Promise<ResponseEntity<Cotacao[]>> {
    logger.info('CotacoesController.getAll - Getting all quotes');
    const cotacoes = await this.cotacaoService.getAll();
    return { status: 200, data: cotacoes }
  }
}