import { Producto } from "./producto";

export interface ProductoRepositorio {
  obtenerTodos(): Promise<Producto[]>;
  obtenerPorId(id: number): Promise<Producto | null>;
  guardar(producto: Producto): Promise<void>;
  actualizar(id: number, producto: Producto): Promise<void>;
  eliminar(id: number): Promise<void>;

  // Filtros con paginación
  filtrar(filtros: {
    busqueda?: string;
    precioMin?: number;
    precioMax?: number;
    promocion?: boolean;
    offset?: number;
    limit?: number;
  }): Promise<Producto[]>;

  // 👇 AÑADIDO: total para paginación
  contarFiltrados(filtros: {
    busqueda?: string;
    precioMin?: number;
    precioMax?: number;
    promocion?: boolean;
  }): Promise<number>;
}
