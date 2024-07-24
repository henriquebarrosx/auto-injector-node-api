import { Cotacao } from "@entities/cotacao";
import { GetMapping } from "@decorators/GetMapping";
import { HttpRequest, ResponseEntity } from "@HttpServer";
import { RestController } from "@decorators/RestController";

@RestController()
export class CotacoesController {
  @GetMapping('/v1/cotacoes')
  getAll(): ResponseEntity<Cotacao[]> {
    return { status: 200, data: [] }
  }

  @GetMapping('/v1/cotacoes/:id')
  getById({ params }: HttpRequest) {
    return { status: 404 }
  }
}