import { pool } from "./db";
import { UsuarioRepositorio } from "../dominio/usuarioRepositorio";
import { Usuario } from "../dominio/usuario";

export class UsuarioRepositorioSQL implements UsuarioRepositorio {
  obtenerPorId(id: number): Promise<Usuario | null> {
    throw new Error("Method not implemented.");
  }
  async obtenerPorEmail(email: string): Promise<Usuario | null> {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Usuario(row.id, row.nombre, row.email, row.password);
  }

  async registrar(usuario: Usuario): Promise<void> {
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)",
      [usuario.nombre, usuario.email, usuario.password]
    );
  }
}
