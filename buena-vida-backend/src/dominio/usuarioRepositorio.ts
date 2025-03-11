import { Usuario } from "./usuario"; // 👈 Agrega esta línea para importar la entidad

export interface UsuarioRepositorio {
  obtenerPorEmail(email: string): Promise<Usuario | null>;
  registrar(usuario: Usuario): Promise<void>;
  obtenerPorId(id: number): Promise<Usuario | null>;
}
