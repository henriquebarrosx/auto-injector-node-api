import { logger } from "@adapters/logger";
import { Cotacao } from "@entities/cotacao";
import { ResponseEntity } from "@HttpServer";
import { GetMapping } from "@decorators/GetMapping";
import { RestController } from "@decorators/RestController";
import { CotacoesRepositoryGatewat } from "@repositories/cotacoes-repository";

@RestController()
export class CotacoesController {
  constructor(
    private readonly cotacaoRepository: CotacoesRepositoryGatewat,
  ) { }

  @GetMapping('/v1/cotacoes')
  async getAll(): Promise<ResponseEntity<Cotacao[]>> {
    logger.info('CotacoesController.getAll - Getting all quotes');
    const cotacoes = await this.cotacaoRepository.findAll();
    return { status: 200, data: cotacoes }
  }
}