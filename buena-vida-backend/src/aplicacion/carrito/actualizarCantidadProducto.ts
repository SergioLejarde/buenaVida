import { CarritoRepositorio } from "../../dominio/carritoRepositorio";

export class ActualizarCantidadProducto {
  constructor(private carritoRepositorio: CarritoRepositorio) {}

  async ejecutar(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    await this.carritoRepositorio.actualizarCantidad(usuarioId, productoId, cantidad);
  }
}
