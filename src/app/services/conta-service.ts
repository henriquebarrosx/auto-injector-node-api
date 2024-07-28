import { Conta } from "@entities/conta";
import { Service } from "@decorators/Service";
import { promiseResolver } from "@utils/promise-resolver";
import { ContaRepositoryGateway } from "@repositories/conta-repository";
import { AccountNotFoundException } from "../../domain/exceptions/account-not-found-exception";

@Service()
export class ContaService {
  constructor(
    private readonly contaRepository: ContaRepositoryGateway,
  ) { }

  async findById(id: number): Promise<Conta> {
    const [error, conta] = await promiseResolver(this.contaRepository.findById(id));
    if (error) throw new AccountNotFoundException(`Account ${id} not found`);
    return conta;
  }
}