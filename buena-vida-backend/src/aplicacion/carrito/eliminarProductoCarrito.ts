import { CarritoRepositorio } from "../../dominio/carritoRepositorio";

export class EliminarProductoCarrito {
  constructor(private carritoRepositorio: CarritoRepositorio) {}

  async ejecutar(usuarioId: number, productoId: number): Promise<void> {
    await this.carritoRepositorio.eliminarProducto(usuarioId, productoId);
  }
}
