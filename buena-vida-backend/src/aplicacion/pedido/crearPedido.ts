import { PedidoRepositorio } from "../../dominio/pedidoRepositorio";
import { CarritoRepositorio } from "../../dominio/carritoRepositorio";
import { Pedido } from "../../dominio/pedido";
import { PedidoFactory, PedidoOnlineFactory } from "../../dominio/factories/pedidoFactory";

export class CrearPedido {
  private pedidoFactory: PedidoFactory;

  constructor(
    private pedidoRepositorio: PedidoRepositorio,
    private carritoRepositorio: CarritoRepositorio
  ) {
    this.pedidoFactory = new PedidoOnlineFactory(); // 🔹 Aquí podemos cambiar de fábrica fácilmente
  }

  async ejecutar(usuarioId: number): Promise<Pedido> {
    const carrito = await this.carritoRepositorio.obtenerPorUsuario(usuarioId);
    if (!carrito || carrito.productos.length === 0) {
      throw new Error("El carrito está vacío.");
    }

    const productosConPrecio = await Promise.all(carrito.productos.map(async (p) => {
      const precio = await this.pedidoRepositorio.obtenerPrecioProducto(p.productoId);
      if (!precio) {
        throw new Error(`El producto con ID ${p.productoId} no existe.`);
      }
      return { productoId: p.productoId, cantidad: p.cantidad, precio };
    }));

    const total = productosConPrecio.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
    const fecha = new Date();

    const pedido = this.pedidoFactory.crearPedido(0, usuarioId, total, fecha, "pendiente", productosConPrecio);
    await this.pedidoRepositorio.crearPedido(usuarioId, productosConPrecio, total);
    await this.carritoRepositorio.vaciarCarrito(usuarioId);

    return pedido;
  }
}
