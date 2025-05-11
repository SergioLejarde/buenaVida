import { pool } from "./db";
import { FavoritoRepositorio } from "../dominio/FavoritoRepositorio";

export class FavoritoRepositorioSQL implements FavoritoRepositorio {
  async obtenerPorUsuario(usuarioId: number): Promise<number[]> {
    const result = await pool.query(
      "SELECT producto_id FROM favoritos WHERE usuario_id = $1",
      [usuarioId]
    );
    return result.rows.map(row => row.producto_id);
  }

  async agregar(usuarioId: number, productoId: number): Promise<void> {
    await pool.query(
      "INSERT INTO favoritos (usuario_id, producto_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [usuarioId, productoId]
    );
  }

  async eliminar(usuarioId: number, productoId: number): Promise<void> {
    await pool.query(
      "DELETE FROM favoritos WHERE usuario_id = $1 AND producto_id = $2",
      [usuarioId, productoId]
    );
  }
}
