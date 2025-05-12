import { Usuario } from "./usuario";

export interface UsuarioRepositorio {
  obtenerPorEmail(email: string): Promise<Usuario | null>;
  registrar(usuario: Usuario): Promise<void>;
  obtenerPorId(id: number): Promise<Usuario | null>;
  obtenerTodos(): Promise<Usuario[]>; // ✅ método requerido por la ruta /usuarios
}
