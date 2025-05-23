import { pool } from "./db";
import { ProductoRepositorio } from "../dominio/productoRepositorio";
import { Producto } from "../dominio/producto";

export class ProductoRepositorioSQL implements ProductoRepositorio {
  async obtenerTodos(): Promise<Producto[]> {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows.map(row =>
      new Producto(
        row.id,
        row.nombre,
        row.descripcion,
        row.precio,
        row.stock,
        row.categoria,
        row.imagen_url
      )
    );
  }

  async obtenerPorId(id: number): Promise<Producto | null> {
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Producto(
      row.id,
      row.nombre,
      row.descripcion,
      row.precio,
      row.stock,
      row.categoria,
      row.imagen_url
    );
  }

  async guardar(producto: Producto): Promise<void> {
    await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url, promocion) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.categoria,
        producto.imagenUrl,
        producto.promocion,
      ]
    );
  }

  async actualizar(id: number, producto: Producto): Promise<void> {
    await pool.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria = $5, imagen_url = $6, promocion = $7 WHERE id = $8",
      [
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.categoria,
        producto.imagenUrl,
        producto.promocion,
        id,
      ]
    );
  }

  async eliminar(id: number): Promise<void> {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
  }

  async filtrar(filtros: {
    busqueda?: string;
    precioMin?: number;
    precioMax?: number;
    promocion?: boolean;
    offset?: number;
    limit?: number;
  }): Promise<Producto[]> {
    const valores: any[] = [];
    const condiciones: string[] = [];
    let i = 1;

    if (filtros.busqueda?.trim()) {
      condiciones.push(`(LOWER(nombre) LIKE $${i} OR LOWER(descripcion) LIKE $${i})`);
      valores.push(`%${filtros.busqueda.toLowerCase()}%`);
      i++;
    }

    if (typeof filtros.precioMin === "number") {
      condiciones.push(`precio >= $${i}`);
      valores.push(filtros.precioMin);
      i++;
    }

    if (typeof filtros.precioMax === "number") {
      condiciones.push(`precio <= $${i}`);
      valores.push(filtros.precioMax);
      i++;
    }

    if (typeof filtros.promocion === "boolean") {
      condiciones.push(`promocion = $${i}`);
      valores.push(filtros.promocion);
      i++;
    }

    let query = `SELECT * FROM productos`;
    if (condiciones.length > 0) {
      query += ` WHERE ` + condiciones.join(" AND ");
    }

    query += ` ORDER BY id`;

    if (typeof filtros.limit === "number") {
      query += ` LIMIT $${i}`;
      valores.push(filtros.limit);
      i++;
    }

    if (typeof filtros.offset === "number") {
      query += ` OFFSET $${i}`;
      valores.push(filtros.offset);
    }

    console.log("🔄 QUERY FINAL:", query);
    console.log("📦 VALORES:", valores);

    const result = await pool.query(query, valores);

    console.log("🧾 IDs devueltos:", result.rows.map(p => p.id));

    return result.rows.map(row =>
      new Producto(
        row.id,
        row.nombre,
        row.descripcion,
        row.precio,
        row.stock,
        row.categoria,
        row.imagen_url,
        row.promocion
      )
    );
  }

  async contarFiltrados(filtros: {
    busqueda?: string;
    precioMin?: number;
    precioMax?: number;
    promocion?: boolean;
  }): Promise<number> {
    const valores: any[] = [];
    const condiciones: string[] = [];
    let i = 1;

    if (filtros.busqueda?.trim()) {
      condiciones.push(`(LOWER(nombre) LIKE $${i} OR LOWER(descripcion) LIKE $${i})`);
      valores.push(`%${filtros.busqueda.toLowerCase()}%`);
      i++;
    }

    if (typeof filtros.precioMin === "number") {
      condiciones.push(`precio >= $${i}`);
      valores.push(filtros.precioMin);
      i++;
    }

    if (typeof filtros.precioMax === "number") {
      condiciones.push(`precio <= $${i}`);
      valores.push(filtros.precioMax);
      i++;
    }

    if (typeof filtros.promocion === "boolean") {
      condiciones.push(`promocion = $${i}`);
      valores.push(filtros.promocion);
      i++;
    }

    let query = `SELECT COUNT(*) FROM productos`;
    if (condiciones.length > 0) {
      query += ` WHERE ` + condiciones.join(" AND ");
    }

    console.log("🧪 QUERY DE CONTEO:", query);
    console.log("📦 VALORES:", valores);

    const result = await pool.query(query, valores);
    return parseInt(result.rows[0].count);
  }
}
