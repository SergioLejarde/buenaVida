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

  async ejecutar(filtros: FiltrosProductos): Promise<{
    productos: Producto[];
    total: number;
    totalPaginas: number;
  }> {
    const {
      q = '',
      promo,
      page = 1,
      limit = 12,
      min,
      max
    } = filtros;

    const offset = (page - 1) * limit;

    const filtrosBase: any = {
      busqueda: q,
      offset,
      limit,
    };

    if (typeof min === "number") filtrosBase.precioMin = min;
    if (typeof max === "number") filtrosBase.precioMax = max;
    if (typeof promo === "boolean") filtrosBase.promocion = promo;

    // 🔍 Ayuda temporal para depurar
    console.log("📩 Filtros enviados al repositorio:", filtrosBase);

    const productos = await this.productoRepositorio.filtrar(filtrosBase);
    const total = await this.productoRepositorio.contarFiltrados(filtrosBase);

    return {
      productos,
      total,
      totalPaginas: Math.ceil(total / limit),
    };
  }
}
