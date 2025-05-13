import { UsuarioRepositorio } from "../dominio/usuarioRepositorio";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class IniciarSesion {
  constructor(private usuarioRepositorio: UsuarioRepositorio) {}

  async ejecutar(email: string, password: string): Promise<{ token: string; usuarioId: number; rol: string }> {
    const usuario = await this.usuarioRepositorio.obtenerPorEmail(email);
    if (!usuario) {
      throw new Error("Credenciales incorrectas");
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      throw new Error("Credenciales incorrectas");
    }

    // 🛡️ Incluir el rol en el token
    const token = jwt.sign(//se genera el JWT
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { token, usuarioId: usuario.id, rol: usuario.rol };
  }
}
