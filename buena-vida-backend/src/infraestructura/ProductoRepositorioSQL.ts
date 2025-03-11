import { pool } from "./db";
import { ProductoRepositorio } from "../dominio/productoRepositorio";
import { Producto } from "../dominio/producto";

export class ProductoRepositorioSQL implements ProductoRepositorio {
  async obtenerTodos(): Promise<Producto[]> {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows.map(row => new Producto(row.id, row.nombre, row.descripcion, row.precio, row.stock, row.categoria, row.imagen_url));
  }

  async obtenerPorId(id: number): Promise<Producto | null> {
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Producto(row.id, row.nombre, row.descripcion, row.precio, row.stock, row.categoria, row.imagen_url);
  }

  async guardar(producto: Producto): Promise<void> {
    await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES ($1, $2, $3, $4, $5, $6)",
      [producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.categoria, producto.imagenUrl]
    );
  }

  async actualizar(id: number, producto: Producto): Promise<void> {
    await pool.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria = $5, imagen_url = $6 WHERE id = $7",
      [producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.categoria, producto.imagenUrl, id]
    );
  }

  async eliminar(id: number): Promise<void> {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
  }
}
