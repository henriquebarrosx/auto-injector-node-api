import { Cotacao } from "@entities/cotacao";
import { Service } from "@decorators/Service";
import { CotacoesRepositoryGatewat } from "@repositories/cotacoes-repository";

@Service()
export class CotacaoService {
  constructor(
    private readonly cotacaoRepository: CotacoesRepositoryGatewat,
  ) { }

  async getAll(): Promise<Cotacao[]> {
    const cotacoes = await this.cotacaoRepository.findAll();
    return cotacoes;
  }
}