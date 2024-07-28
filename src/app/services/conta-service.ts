import { Conta } from "@entities/conta";
import { Service } from "@decorators/Service";
import { ContaRepositoryGateway } from "@repositories/conta-repository";

@Service()
export class ContaService {
  constructor(
    private readonly contaRepository: ContaRepositoryGateway,
  ) { }

  async findById(id: number): Promise<Conta> {
    const conta = await this.contaRepository.findById(id);
    return conta;
  }
}