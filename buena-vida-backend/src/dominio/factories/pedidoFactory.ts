import { Pedido } from "../pedido";

export abstract class PedidoFactory {
  abstract crearPedido(
    id: number,
    usuarioId: number,
    total: number,
    fecha: Date,
    estado: string,
    productos: { productoId: number; cantidad: number; precio: number }[]
  ): Pedido;
}

export class PedidoOnlineFactory extends PedidoFactory {
  crearPedido(id: number, usuarioId: number, total: number, fecha: Date, estado: string, productos: { productoId: number; cantidad: number; precio: number }[]): Pedido {
    console.log("Creando pedido online...");
    return new Pedido(id, usuarioId, total, fecha, estado, productos);
  }
}

export class PedidoFisicoFactory extends PedidoFactory {
  crearPedido(id: number, usuarioId: number, total: number, fecha: Date, estado: string, productos: { productoId: number; cantidad: number; precio: number }[]): Pedido {
    console.log("Creando pedido en tienda física...");
    return new Pedido(id, usuarioId, total, fecha, estado, productos);
  }
}
