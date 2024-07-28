import { Conta } from "@entities/conta";

export interface ContaRepositoryGateway {
  findAll(): Promise<Conta[]>;
  findById(id: number): Promise<Conta>;
}