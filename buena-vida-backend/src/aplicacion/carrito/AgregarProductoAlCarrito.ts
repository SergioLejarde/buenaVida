import { CarritoRepositorio } from "../../dominio/carritoRepositorio";

export class AgregarProductoAlCarrito {
  constructor(private carritoRepositorio: CarritoRepositorio) {}

  async ejecutar(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    await this.carritoRepositorio.agregarProducto(usuarioId, productoId, cantidad);
  }
}
