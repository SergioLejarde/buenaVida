import { Pedido } from "./pedido";

export interface PedidoRepositorio {
  crearPedido(usuarioId: number, productos: { productoId: number; cantidad: number; precio: number }[], total: number): Promise<Pedido>;
  obtenerPedidosPorUsuario(usuarioId: number): Promise<Pedido[]>;

  // 🔹 Agregar este método para evitar el error
  obtenerPrecioProducto(productoId: number): Promise<number | null>;
}
