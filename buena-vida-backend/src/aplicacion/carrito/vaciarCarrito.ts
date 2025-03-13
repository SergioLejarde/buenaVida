import { CarritoRepositorio } from "../../dominio/carritoRepositorio";

export class VaciarCarrito {
  constructor(private carritoRepositorio: CarritoRepositorio) {}

  async ejecutar(usuarioId: number): Promise<void> {
    await this.carritoRepositorio.vaciarCarrito(usuarioId);
  }
}
