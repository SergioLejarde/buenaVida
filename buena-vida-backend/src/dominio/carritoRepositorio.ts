import { Carrito } from "./carrito";

export interface CarritoRepositorio {
  obtenerPorUsuario(usuarioId: number): Promise<Carrito | null>;
  agregarProducto(usuarioId: number, productoId: number, cantidad: number): Promise<void>;
  actualizarCantidad(usuarioId: number, productoId: number, cantidad: number): Promise<void>;
  eliminarProducto(usuarioId: number, productoId: number): Promise<void>;
  vaciarCarrito(usuarioId: number): Promise<void>;
}
