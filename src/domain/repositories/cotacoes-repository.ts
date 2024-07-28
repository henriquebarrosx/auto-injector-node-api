import { Cotacao } from "@entities/cotacao";

export interface CotacoesRepositoryGatewat {
  findAll(): Promise<Cotacao[]>;
  findByAccountId(accountId: number): Promise<Cotacao[]>;
}