import { Request, Response } from "express";
import { FavoritoRepositorioSQL } from "../infraestructura/FavoritoRepositorioSQL";
import { ProductoRepositorioSQL } from "../infraestructura/ProductoRepositorioSQL";
import { ObtenerFavoritos } from "../aplicacion/favoritos/obtenerFavoritos";

export const obtenerFavoritos = async (req: Request, res: Response): Promise<void> => {
  const usuarioId = parseInt(req.params.usuarioId);

  if (isNaN(usuarioId)) {
    res.status(400).json({ error: "ID de usuario inválido" });
    return;
  }

  try {
    const repoFavorito = new FavoritoRepositorioSQL();
    const repoProducto = new ProductoRepositorioSQL();

    const servicio = new ObtenerFavoritos(repoFavorito, repoProducto);
    const productos = await servicio.ejecutar(usuarioId);

    res.json(productos);
  } catch (error) {
    console.error("❌ Error en controlador favoritos:", error);
    res.status(500).json({ error: "Error al obtener favoritos" });
  }
};
