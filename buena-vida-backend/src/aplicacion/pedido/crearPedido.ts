import { PedidoRepositorio } from "../../dominio/pedidoRepositorio";
import { CarritoRepositorio } from "../../dominio/carritoRepositorio";
import { Pedido } from "../../dominio/pedido";

export class CrearPedido {
  constructor(
    private pedidoRepositorio: PedidoRepositorio,
    private carritoRepositorio: CarritoRepositorio
  ) {}

  async ejecutar(usuarioId: number): Promise<Pedido> {
    const carrito = await this.carritoRepositorio.obtenerPorUsuario(usuarioId);

    if (!carrito || !carrito.productos || carrito.productos.length === 0) {
      throw new Error("El carrito está vacío.");
    }

    console.log("Productos en el carrito antes de procesar el pedido:", carrito.productos);

    // Verificar si algún producto no tiene un ID válido
    carrito.productos.forEach((producto) => {
      if (!producto.productoId) {  // 🔹 Cambiado de producto_id a productoId
        throw new Error(`Error: Producto sin ID detectado en el carrito: ${JSON.stringify(producto)}`);
      }
    });

    // Obtener los precios de los productos antes de procesar el pedido
    const productosConPrecio = await Promise.all(
      carrito.productos.map(async (p) => {
        const result = await this.pedidoRepositorio.obtenerPrecioProducto(p.productoId); // 🔹 Cambiado producto_id a productoId
        if (!result) {
          throw new Error(`Error: El producto con ID ${p.productoId} no existe en la base de datos.`); // 🔹 Cambiado producto_id a productoId
        }
        return { productoId: p.productoId, cantidad: p.cantidad, precio: result }; // 🔹 Cambiado producto_id a productoId
      })
    );

    const total = productosConPrecio.reduce((acc, p) => acc + p.cantidad * p.precio, 0);

    const pedido = await this.pedidoRepositorio.crearPedido(usuarioId, productosConPrecio, total);

    await this.carritoRepositorio.vaciarCarrito(usuarioId);

    return pedido;
  }
}
