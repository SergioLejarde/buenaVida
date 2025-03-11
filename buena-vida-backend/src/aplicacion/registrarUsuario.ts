import { Usuario } from "../dominio/usuario";
import { UsuarioRepositorio } from "../dominio/usuarioRepositorio";
import bcrypt from "bcryptjs";

export class RegistrarUsuario {
  constructor(private usuarioRepositorio: UsuarioRepositorio) {}

  async ejecutar(nombre: string, email: string, password: string): Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepositorio.obtenerPorEmail(email);
    if (usuarioExistente) {
      throw new Error("El usuario ya está registrado.");
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario(0, nombre, email, passwordHash);
    await this.usuarioRepositorio.registrar(nuevoUsuario);

    return nuevoUsuario;
  }
}
