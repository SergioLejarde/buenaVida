import express from "express";
import { productoControlador, obtenerProductoPorId } from "./productoControlador";
import { registrar, login } from "./usuarioControlador";
import {
  agregarAlCarrito,
  obtenerCarrito,
  actualizarCantidadCarrito,
  eliminarProductoCarrito,
  vaciarCarrito
} from "./carritoControlador";
import { realizarPedido, obtenerPedidos } from "./pedidoControlador";
import { verificarToken } from "../middleware/auth";
import { verificarRol } from "../middleware/verificarRol";
import { UsuarioRepositorioSQL } from "../infraestructura/usuarioRepositorioSQL";

const router = express.Router();

// 🔹 Rutas de Autenticación y Usuarios
router.post("/usuarios/registrar", registrar);
router.post("/usuarios/login", login);

// 🔹 Ruta solo para admin: ver todos los usuarios registrados
const usuarioRepositorio = new UsuarioRepositorioSQL();
router.get("/usuarios", verificarToken, verificarRol("admin"), async (req, res) => {
  try {
    const usuarios = await usuarioRepositorio.obtenerTodos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// 🔹 Rutas de Productos
router.get("/productos", productoControlador);         // paginación lista
router.get("/productos/:id", obtenerProductoPorId);    // modal funcional

// 🔹 Rutas de Carrito de Compras
router.post("/carrito/agregar", verificarToken, agregarAlCarrito);
router.get("/carrito", verificarToken, obtenerCarrito);
router.put("/carrito/actualizar", verificarToken, actualizarCantidadCarrito);
router.delete("/carrito/eliminar", verificarToken, eliminarProductoCarrito);
router.delete("/carrito/vaciar", verificarToken, vaciarCarrito);

// 🔹 Rutas de Pedidos
router.post("/pedidos", verificarToken, realizarPedido);
router.get("/pedidos", verificarToken, obtenerPedidos);

export default router;
