import { Conta } from "@entities/conta";
import { Service } from "@decorators/Service";
import { ContaRepositoryGateway } from "@repositories/conta-repository";

@Service()
export class ContaRepository implements ContaRepositoryGateway {
  async findById(id: number): Promise<Conta> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(new Conta(id));
        reject(new Error('Account not found'))
      }, 200);
    });
  }

  findAll(): Promise<Conta[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 200);
    });
  }
}