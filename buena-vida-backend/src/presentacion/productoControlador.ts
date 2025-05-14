import { Request, Response } from "express";
import { ObtenerProductos } from "../aplicacion/obtenerProductos";
import { ProductoRepositorioSQL } from "../infraestructura/ProductoRepositorioSQL";

const repo = new ProductoRepositorioSQL();

// ✅ Controlador principal con paginación total
export const productoControlador = async (req: Request, res: Response): Promise<void> => {
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

    const total = await repo.contarFiltrados({
      busqueda: filtros.q,
      precioMin: filtros.min,
      precioMax: filtros.max,
      promocion: filtros.promo,
    });

    const totalPaginas = Math.ceil(total / filtros.limit);

    res.json({ productos, totalPaginas });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// ✅ Nuevo controlador para GET /productos/:id
export const obtenerProductoPorId = async (req: Request, res: Response): Promise<void> => {
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
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};
