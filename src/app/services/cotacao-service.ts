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

  async getByAccountId(accountId: number): Promise<Cotacao[]> {
    const conta = await this.contaService.findById(accountId);
    const cotacoes = await this.cotacaoRepository.findByAccountId(conta.getId());
    return cotacoes;
  }
}