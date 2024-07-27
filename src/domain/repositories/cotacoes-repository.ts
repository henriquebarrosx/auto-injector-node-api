import { Cotacao } from "@entities/cotacao";

export interface CotacoesRepositoryGatewat {
  findAll(): Promise<Cotacao[]>;
}