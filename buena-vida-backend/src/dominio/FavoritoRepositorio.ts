export interface FavoritoRepositorio {
    obtenerPorUsuario(usuarioId: number): Promise<number[]>;
    agregar(usuarioId: number, productoId: number): Promise<void>;
    eliminar(usuarioId: number, productoId: number): Promise<void>;
  }
  