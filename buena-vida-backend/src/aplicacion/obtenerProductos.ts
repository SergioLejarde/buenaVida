import { ProductoRepositorio } from "../dominio/productoRepositorio";
import { Producto } from "../dominio/producto";

interface FiltrosProductos {
  q?: string;
  min?: number;
  max?: number;
  promo?: boolean;
  page?: number;
  limit?: number;
}

export class ObtenerProductos {
  constructor(private productoRepositorio: ProductoRepositorio) {}

  async ejecutar(filtros: FiltrosProductos): Promise<{ productos: Producto[], total: number }> {
    const {
      q = '',
      min = 0,
      max = Number.MAX_SAFE_INTEGER,
      promo,
      page = 1,
      limit = 12,
    } = filtros;

    const offset = (page - 1) * limit;

    const productos = await this.productoRepositorio.filtrar({
      busqueda: q,
      precioMin: min,
      precioMax: max,
      promocion: promo,
      offset,
      limit,
    });

    const total = await this.productoRepositorio.contarFiltrados({
      busqueda: q,
      precioMin: min,
      precioMax: max,
      promocion: promo,
    });

    return { productos, total };
  }
}
