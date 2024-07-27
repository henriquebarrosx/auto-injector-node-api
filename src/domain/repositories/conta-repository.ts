import { Conta } from "@entities/conta";

export interface ContaRepositoryGatewat {
  findAll(): Promise<Conta[]>;
}