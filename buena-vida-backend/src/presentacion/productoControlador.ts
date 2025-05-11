import { Request, Response } from "express";
import { ObtenerProductos } from "../aplicacion/obtenerProductos";
import { ProductoRepositorioSQL } from "../infraestructura/ProductoRepositorioSQL";

export const productoControlador = async (req: Request, res: Response) => {
  const repo = new ProductoRepositorioSQL();
  const servicio = new ObtenerProductos(repo);

  const filtros = {
    q: req.query.q?.toString() || "",
    min: parseFloat(req.query.min as string) || 0,
    max: parseFloat(req.query.max as string) || Number.MAX_SAFE_INTEGER,
    promo: req.query.promo === "true",
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 12,
  };

  try {
    const productos = await servicio.ejecutar(filtros);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
