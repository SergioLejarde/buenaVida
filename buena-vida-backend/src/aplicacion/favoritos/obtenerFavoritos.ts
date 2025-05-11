import { FavoritoRepositorio } from "../../dominio/FavoritoRepositorio";
import { ProductoRepositorio } from "../../dominio/productoRepositorio";
import { Producto } from "../../dominio/producto";

export class ObtenerFavoritos {
  constructor(
    private favoritoRepo: FavoritoRepositorio,
    private productoRepo: ProductoRepositorio
  ) {}

  async ejecutar(usuarioId: number): Promise<Producto[]> {
    const ids = await this.favoritoRepo.obtenerPorUsuario(usuarioId);
    const productos: Producto[] = [];

    for (const id of ids) {
      const producto = await this.productoRepo.obtenerPorId(id);
      if (producto) {
        productos.push(producto);
      }
    }

    return productos;
  }
}
