import { Request, Response } from "express";
import { ObtenerProductos } from "../aplicacion/obtenerProductos";
import { ProductoRepositorioSQL } from "../infraestructura/ProductoRepositorioSQL";

// Controlador para listar productos con filtros y paginación
export const productoControlador = async (req: Request, res: Response): Promise<void> => {
  const repo = new ProductoRepositorioSQL();
  const servicio = new ObtenerProductos(repo);

  const page = Number.isInteger(Number(req.query.page)) ? parseInt(req.query.page as string) : 1;
  const limit = Number.isInteger(Number(req.query.limit)) ? parseInt(req.query.limit as string) : 12;

  const filtros = {
    q: req.query.q?.toString() ?? "",
    min: isNaN(Number(req.query.min)) ? undefined : parseFloat(req.query.min as string),
    max: isNaN(Number(req.query.max)) ? undefined : parseFloat(req.query.max as string),
    promo: typeof req.query.promo === "string" && (req.query.promo === "true" || req.query.promo === "false")
      ? req.query.promo === "true"
      : undefined,
    page,
    limit
  };

  console.log("📥 Query params:", req.query);
  console.log("📦 Filtros calculados:", filtros);

  try {
    const { productos, total, totalPaginas } = await servicio.ejecutar(filtros);
    res.json({ productos, total, totalPaginas });
  } catch (error) {
    console.error("❌ Error en productoControlador:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Controlador para obtener un producto por su ID
export const obtenerProductoPorId = async (req: Request, res: Response): Promise<void> => {
  const repo = new ProductoRepositorioSQL();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const producto = await repo.obtenerPorId(id);
    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    res.json(producto);
  } catch (error) {
    console.error("❌ Error en obtenerProductoPorId:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};
