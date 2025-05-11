import { ProductoRepositorio } from "../dominio/productoRepositorio";
import { Producto } from "../dominio/producto";

interface FiltrosProductos {
  q?: string;              // Búsqueda por nombre o descripción
  min?: number;            // Precio mínimo
  max?: number;            // Precio máximo
  promo?: boolean;         // Solo productos en promoción
  page?: number;           // Página
  limit?: number;          // Cantidad por página
}

export class ObtenerProductos {
  constructor(private productoRepositorio: ProductoRepositorio) {}

  async ejecutar(filtros: FiltrosProductos): Promise<Producto[]> {
    const {
      q = '',
      min = 0,
      max = Number.MAX_SAFE_INTEGER,
      promo,
      page = 1,
      limit = 12,
    } = filtros;

    const offset = (page - 1) * limit;

    return await this.productoRepositorio.filtrar({
      busqueda: q,
      precioMin: min,
      precioMax: max,
      promocion: promo,
      offset,
      limit,
    });
  }
}
