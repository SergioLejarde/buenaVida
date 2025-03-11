import { ProductoRepositorio } from "../dominio/productoRepositorio";
import { Producto } from "../dominio/producto";

export class ObtenerProductos {
  constructor(private productoRepositorio: ProductoRepositorio) {}

  async ejecutar(): Promise<Producto[]> {
    return await this.productoRepositorio.obtenerTodos();
  }
}
