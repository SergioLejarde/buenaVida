import { FavoritoRepositorio } from "../../dominio/FavoritoRepositorio";

/**
 * Caso de uso para agregar un producto a favoritos
 */
export class AgregarFavorito {
  constructor(private favoritoRepo: FavoritoRepositorio) {}

  async ejecutar(usuarioId: number, productoId: number): Promise<void> {
    await this.favoritoRepo.agregar(usuarioId, productoId);
  }
}
