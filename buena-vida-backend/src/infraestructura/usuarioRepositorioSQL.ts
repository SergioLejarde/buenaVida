import { pool } from "./db";
import { UsuarioRepositorio } from "../dominio/usuarioRepositorio";
import { Usuario } from "../dominio/usuario";

export class UsuarioRepositorioSQL implements UsuarioRepositorio {
  async obtenerPorEmail(email: string): Promise<Usuario | null> {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Usuario(row.id, row.nombre, row.email, row.password, row.rol);
  }

  async registrar(usuario: Usuario): Promise<void> {
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)",
      [usuario.nombre, usuario.email, usuario.password, usuario.rol]
    );
  }

  async obtenerTodos(): Promise<Usuario[]> {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows.map(
      (row) => new Usuario(row.id, row.nombre, row.email, row.password, row.rol)
    );
  }

  // Puedes implementar esto si más adelante se necesita
  async obtenerPorId(id: number): Promise<Usuario | null> {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Usuario(row.id, row.nombre, row.email, row.password, row.rol);
  }
}
