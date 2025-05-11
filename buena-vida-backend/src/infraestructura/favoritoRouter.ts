import express from "express";
import { FavoritoRepositorioSQL } from "./FavoritoRepositorioSQL";
import { ProductoRepositorioSQL } from "./ProductoRepositorioSQL";
import { ObtenerFavoritos } from "../aplicacion/favoritos/obtenerFavoritos";
import { AgregarFavorito } from "../aplicacion/favoritos/agregarFavorito";
import { EliminarFavorito } from "../aplicacion/favoritos/eliminarFavorito";

const favoritoRouter = express.Router();

const favoritoRepo = new FavoritoRepositorioSQL();
const productoRepo = new ProductoRepositorioSQL();

favoritoRouter.get("/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;
  const servicio = new ObtenerFavoritos(favoritoRepo, productoRepo);
  const favoritos = await servicio.ejecutar(Number(usuarioId));
  res.json(favoritos);
});

favoritoRouter.post("/", async (req, res) => {
  const { usuarioId, productoId } = req.body;
  const servicio = new AgregarFavorito(favoritoRepo);
  await servicio.ejecutar(usuarioId, productoId);
  res.status(201).json({ mensaje: "Producto agregado a favoritos" });
});

favoritoRouter.delete("/:usuarioId/:productoId", async (req, res) => {
  const { usuarioId, productoId } = req.params;
  const servicio = new EliminarFavorito(favoritoRepo);
  await servicio.ejecutar(Number(usuarioId), Number(productoId));
  res.json({ mensaje: "Producto eliminado de favoritos" });
});

export default favoritoRouter;
