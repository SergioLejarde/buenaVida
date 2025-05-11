import { FavoritoRepositorio } from "../../dominio/FavoritoRepositorio";

export class AgregarFavorito {
  constructor(private favoritoRepo: FavoritoRepositorio) {}

  async ejecutar(usuarioId: number, productoId: number): Promise<void> {
    await this.favoritoRepo.agregar(usuarioId, productoId);
  }
}
