import { Conta } from "@entities/conta";
import { Service } from "@decorators/Service";
import { ContaRepositoryGatewat } from "@repositories/conta-repository";

@Service()
export class ContaRepository implements ContaRepositoryGatewat {
  findAll(): Promise<Conta[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 200);
    })
  }
}