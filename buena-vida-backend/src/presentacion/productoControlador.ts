import { Request, Response } from "express";
import { ObtenerProductos } from "../aplicacion/obtenerProductos";
import { ProductoRepositorioSQL } from "../infraestructura/ProductoRepositorioSQL";

const productoRepositorio = new ProductoRepositorioSQL();
const obtenerProductos = new ObtenerProductos(productoRepositorio);

export const listarProductos = async (req: Request, res: Response) => {
  const productos = await obtenerProductos.ejecutar();
  res.json(productos);
};
