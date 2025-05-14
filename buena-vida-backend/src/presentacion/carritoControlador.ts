import { Request, Response } from "express";
import { AgregarProductoAlCarrito } from "../aplicacion/carrito/AgregarProductoAlCarrito";
import { VerCarrito } from "../aplicacion/carrito/verCarrito";
import { ActualizarCantidadProducto } from "../aplicacion/carrito/actualizarCantidadProducto";
import { EliminarProductoCarrito } from "../aplicacion/carrito/eliminarProductoCarrito";
import { VaciarCarrito } from "../aplicacion/carrito/vaciarCarrito";
import { CarritoRepositorioSQL } from "../infraestructura/CarritoRepositorioSQL";
import { ProductoRepositorioSQL } from "../infraestructura/ProductoRepositorioSQL";

const carritoRepositorio = new CarritoRepositorioSQL();
const productoRepositorio = new ProductoRepositorioSQL();
const agregarProducto = new AgregarProductoAlCarrito(carritoRepositorio);
const verCarrito = new VerCarrito(carritoRepositorio);
const actualizarCantidad = new ActualizarCantidadProducto(carritoRepositorio);
const eliminarProducto = new EliminarProductoCarrito(carritoRepositorio);
const vaciarCarritoUseCase = new VaciarCarrito(carritoRepositorio);

export const agregarAlCarrito = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario.id;
    const { productoId, cantidad } = req.body;
    await agregarProducto.ejecutar(usuarioId, productoId, cantidad);
    res.json({ mensaje: "Producto agregado al carrito" });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

export const obtenerCarrito = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario.id;
    const carrito = await verCarrito.ejecutar(usuarioId);

    const productosDetallados = await Promise.all(
      (carrito?.productos || []).map(async (item) => {
        const producto = await productoRepositorio.obtenerPorId(item.productoId);
        return {
          ...item,
          producto: producto || null
        };
      })
    );

    res.json({ ...carrito, productos: productosDetallados });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

export const actualizarCantidadCarrito = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario.id;
    const { productoId, cantidad } = req.body;

    if (!productoId || cantidad <= 0) {
      throw new Error("Debe proporcionar un productoId y una cantidad válida.");
    }

    await actualizarCantidad.ejecutar(usuarioId, productoId, cantidad);
    res.json({ mensaje: "Cantidad actualizada en el carrito" });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

export const eliminarProductoCarrito = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario.id;
    const { productoId } = req.body;

    if (!productoId) {
      throw new Error("Debe proporcionar un productoId válido.");
    }

    await eliminarProducto.ejecutar(usuarioId, productoId);
    res.json({ mensaje: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

export const vaciarCarrito = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario.id;
    await vaciarCarritoUseCase.ejecutar(usuarioId);
    res.json({ mensaje: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
};
