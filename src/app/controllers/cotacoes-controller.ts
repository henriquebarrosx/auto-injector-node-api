import { logger } from "@adapters/logger";
import { Cotacao } from "@entities/cotacao";
import { ResponseEntity } from "@HttpServer";
import { GetMapping } from "@decorators/GetMapping";
import { RestController } from "@decorators/RestController";
import { CotacoesService } from "@services/cotacoes-service";

@RestController()
export class CotacoesController {
  constructor(
    private readonly cotacoesService: CotacoesService,
  ) { }

  @GetMapping('/v1/cotacoes')
  async getAll(): Promise<ResponseEntity<Cotacao[]>> {
    logger.info('CotacoesController.getAll - Getting all quotes');
    const cotacoes = await this.cotacoesService.getAll();
    return { status: 200, data: cotacoes }
  }
}