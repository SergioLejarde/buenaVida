import { Producto } from "./producto"; // 👈 Asegúrate de agregar esta línea

export interface ProductoRepositorio {
  obtenerTodos(): Promise<Producto[]>;
  obtenerPorId(id: number): Promise<Producto | null>;
  guardar(producto: Producto): Promise<void>;
  actualizar(id: number, producto: Producto): Promise<void>;
  eliminar(id: number): Promise<void>;
}
