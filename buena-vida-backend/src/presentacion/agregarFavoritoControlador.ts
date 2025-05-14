import { Request, Response } from "express";
import { FavoritoRepositorioSQL } from "../infraestructura/FavoritoRepositorioSQL";
import { AgregarFavorito } from "../aplicacion/favoritos/agregarFavorito";

export const agregarFavorito = async (req: Request, res: Response): Promise<void> => {
  const { usuarioId, productoId } = req.body;

  if (!usuarioId || !productoId) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
  }

  try {
    const repo = new FavoritoRepositorioSQL();
    const servicio = new AgregarFavorito(repo);

    await servicio.ejecutar(usuarioId, productoId);

    res.status(201).json({ mensaje: "Producto agregado a favoritos" });
  } catch (error) {
    console.error("❌ Error al agregar favorito:", error);
    res.status(500).json({ error: "Error interno al agregar favorito" });
  }
};
