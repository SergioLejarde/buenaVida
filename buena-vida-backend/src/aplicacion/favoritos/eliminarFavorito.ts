import { FavoritoRepositorio } from "../../dominio/FavoritoRepositorio";

export class EliminarFavorito {
  constructor(private favoritoRepo: FavoritoRepositorio) {}

  async ejecutar(usuarioId: number, productoId: number): Promise<void> {
    await this.favoritoRepo.eliminar(usuarioId, productoId);
  }
}
