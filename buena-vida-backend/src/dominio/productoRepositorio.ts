import { Producto } from "./producto";

export interface ProductoRepositorio {
  obtenerTodos(): Promise<Producto[]>;
  obtenerPorId(id: number): Promise<Producto | null>;
  guardar(producto: Producto): Promise<void>;
  actualizar(id: number, producto: Producto): Promise<void>;
  eliminar(id: number): Promise<void>;

  // 👇 Nuevo método requerido por el parcial
  filtrar(filtros: {
    busqueda?: string;
    precioMin?: number;
    precioMax?: number;
    promocion?: boolean;
    offset?: number;
    limit?: number;
  }): Promise<Producto[]>;
}
