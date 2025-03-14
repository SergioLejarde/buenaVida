import DatabaseSingleton from "./databaseSingleton"; // 🔹 Corregí la importación para coincidir con el nombre del archivo
import { PedidoRepositorio } from "../dominio/pedidoRepositorio";
import { Pedido } from "../dominio/pedido";

const pool = DatabaseSingleton.getInstance();

export class PedidoRepositorioSQL implements PedidoRepositorio {
  async crearPedido(usuarioId: number, productos: { productoId: number; cantidad: number; precio: number }[], total: number): Promise<Pedido> {
    const pedidoResult = await pool.query(
      "INSERT INTO pedidos (usuario_id, total, estado, fecha) VALUES ($1, $2, 'pendiente', NOW()) RETURNING id, fecha, estado",
      [usuarioId, total]
    );

    const pedidoId = pedidoResult.rows[0].id;
    const fecha = pedidoResult.rows[0].fecha;
    const estado = pedidoResult.rows[0].estado;

    for (const producto of productos) {
      await pool.query(
        "INSERT INTO pedido_productos (pedido_id, producto_id, cantidad, precio) VALUES ($1, $2, $3, $4)",
        [pedidoId, producto.productoId, producto.cantidad, producto.precio]
      );
    }

    return new Pedido(pedidoId, usuarioId, total, fecha, estado, productos);
  }

  async obtenerPedidosPorUsuario(usuarioId: number): Promise<Pedido[]> {
    const pedidosResult = await pool.query(
      "SELECT * FROM pedidos WHERE usuario_id = $1 ORDER BY fecha DESC",
      [usuarioId]
    );

    if (pedidosResult.rows.length === 0) {
      return []; // 🔹 Ahora devuelve un array vacío en lugar de un error.
    }

    const pedidos: Pedido[] = [];

    for (const pedidoRow of pedidosResult.rows) {
      const productosResult = await pool.query(
        "SELECT producto_id, cantidad, precio FROM pedido_productos WHERE pedido_id = $1",
        [pedidoRow.id]
      );

      pedidos.push(new Pedido(
        pedidoRow.id,
        usuarioId,
        pedidoRow.total,
        pedidoRow.fecha,
        pedidoRow.estado,
        productosResult.rows
      ));
    }

    return pedidos;
  }

  async obtenerPrecioProducto(productoId: number): Promise<number | null> {
    const result = await pool.query(
      "SELECT precio FROM productos WHERE id = $1",
      [productoId]
    );
    return result.rows.length > 0 ? result.rows[0].precio : null;
  }
}
