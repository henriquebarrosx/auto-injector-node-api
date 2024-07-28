import { Cotacao } from "@entities/cotacao";
import { Service } from "@decorators/Service";
import { CotacoesRepositoryGatewat } from "@repositories/cotacoes-repository";

@Service()
export class CotacaoRepository implements CotacoesRepositoryGatewat {
  async findAll(): Promise<Cotacao[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 200);
    })
  }
}