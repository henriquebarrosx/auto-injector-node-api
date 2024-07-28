import { Cotacao } from "@entities/cotacao";
import { Service } from "@decorators/Service";
import { ContaService } from "@services/conta-service";
import { CotacoesRepositoryGatewat } from "@repositories/cotacoes-repository";

@Service()
export class CotacaoService {
  constructor(
    private readonly cotacaoRepository: CotacoesRepositoryGatewat,
    private readonly contaService: ContaService
  ) { }

  async getAll(): Promise<Cotacao[]> {
    const conta = await this.contaService.findById(1);
    const cotacoes = await this.cotacaoRepository.findByAccountId(conta.getId());
    return cotacoes;
  }
}