import { CarritoRepositorio } from "../../dominio/carritoRepositorio";
import { Carrito } from "../../dominio/carrito";

export class VerCarrito {
  constructor(private carritoRepositorio: CarritoRepositorio) {}

  async ejecutar(usuarioId: number): Promise<Carrito | null> {
    return await this.carritoRepositorio.obtenerPorUsuario(usuarioId);
  }
}
