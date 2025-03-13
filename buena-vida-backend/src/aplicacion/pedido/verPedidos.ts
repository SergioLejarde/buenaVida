import { PedidoRepositorio } from "../../dominio/pedidoRepositorio";
import { Pedido } from "../../dominio/pedido";

export class VerPedidos {
  constructor(private pedidoRepositorio: PedidoRepositorio) {}

  async ejecutar(usuarioId: number): Promise<Pedido[]> {
    return await this.pedidoRepositorio.obtenerPedidosPorUsuario(usuarioId);
  }
}
