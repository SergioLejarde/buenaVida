import { pool } from "./db";
import { CarritoRepositorio } from "../dominio/carritoRepositorio";
import { Carrito } from "../dominio/carrito";

export class CarritoRepositorioSQL implements CarritoRepositorio {
  async obtenerPorUsuario(usuarioId: number): Promise<Carrito | null> {
    const result = await pool.query(
      "SELECT id FROM carritos WHERE usuario_id = $1",
      [usuarioId]
    );

    if (result.rows.length === 0) return null;

    const carritoId = result.rows[0].id;

    const productosResult = await pool.query(
      "SELECT producto_id AS \"productoId\", cantidad FROM carrito_productos WHERE carrito_id = $1",
      [carritoId]
    );

    console.log("Productos obtenidos desde carrito_productos:", productosResult.rows);

    if (productosResult.rows.length === 0) {
      return new Carrito(carritoId, usuarioId, []);
    }

    return new Carrito(carritoId, usuarioId, productosResult.rows);
  }

  async agregarProducto(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    const carrito = await this.obtenerPorUsuario(usuarioId);

    if (!carrito) {
      const nuevoCarrito = await pool.query(
        "INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING id",
        [usuarioId]
      );

      const carritoId = nuevoCarrito.rows[0].id;

      await pool.query(
        "INSERT INTO carrito_productos (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3)",
        [carritoId, productoId, cantidad]
      );
    } else {
      await pool.query(
        "INSERT INTO carrito_productos (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3) ON CONFLICT (carrito_id, producto_id) DO UPDATE SET cantidad = carrito_productos.cantidad + $3",
        [carrito.id, productoId, cantidad]
      );
    }
  }

  async actualizarCantidad(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    const carrito = await this.obtenerPorUsuario(usuarioId);
    if (!carrito) throw new Error("Carrito no encontrado");

    await pool.query(
      "UPDATE carrito_productos SET cantidad = $3 WHERE carrito_id = $1 AND producto_id = $2",
      [carrito.id, productoId, cantidad]
    );
  }

  async eliminarProducto(usuarioId: number, productoId: number): Promise<void> {
    const carrito = await this.obtenerPorUsuario(usuarioId);
    if (!carrito) throw new Error("Carrito no encontrado");

    await pool.query(
      "DELETE FROM carrito_productos WHERE carrito_id = $1 AND producto_id = $2",
      [carrito.id, productoId]
    );
  }

  async vaciarCarrito(usuarioId: number): Promise<void> {
    const carrito = await this.obtenerPorUsuario(usuarioId);
    if (!carrito) throw new Error("Carrito no encontrado");

    await pool.query("DELETE FROM carrito_productos WHERE carrito_id = $1", [carrito.id]);
  }
}
