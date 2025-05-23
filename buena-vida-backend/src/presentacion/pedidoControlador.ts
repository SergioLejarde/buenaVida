import { Request, Response } from "express";
import { CrearPedido } from "../aplicacion/pedido/crearPedido";
import { PedidoRepositorioSQL } from "../infraestructura/PedidoRepositorioSQL";
import { CarritoRepositorioSQL } from "../infraestructura/CarritoRepositorioSQL";

const pedidoRepositorio = new PedidoRepositorioSQL();
const carritoRepositorio = new CarritoRepositorioSQL();
const crearPedido = new CrearPedido(pedidoRepositorio, carritoRepositorio);

// POST: Usuario realiza pedido
export const realizarPedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario.id;
    const pedido = await crearPedido.ejecutar(usuarioId);
    res.status(201).json({ mensaje: "Pedido realizado con éxito", pedido });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

// GET: Pedidos de usuario autenticado
export const obtenerPedidos = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario.id;
    const pedidos = await pedidoRepositorio.obtenerPedidosPorUsuario(usuarioId);

    if (pedidos.length === 0) {
      res.status(404).json({ mensaje: "No hay pedidos registrados para este usuario." });
      return;
    }

    res.json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

// ✅ NUEVO: GET /api/admin/pedidos (solo admin)
export const obtenerTodosLosPedidos = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = (req as any).usuario;
    if (!usuario || usuario.rol !== "admin") {
      res.status(403).json({ error: "Acceso denegado. Solo administradores." });
      return;
    }

    const pedidos = await pedidoRepositorio.obtenerTodosLosPedidos(); // Asegúrate de implementarlo en el repositorio
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Error interno del servidor" });
  }
};