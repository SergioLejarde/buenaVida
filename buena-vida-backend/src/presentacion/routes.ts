import express from "express";
import { listarProductos } from "./productoControlador";
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

const router = express.Router();

// 🔹 Rutas de Autenticación y Usuarios
router.post("/usuarios/registrar", registrar);
router.post("/usuarios/login", login);

// 🔹 Rutas de Productos
router.get("/productos", listarProductos);

// 🔹 Rutas de Carrito de Compras (Protegidas con Token)
router.post("/carrito/agregar", verificarToken, agregarAlCarrito);
router.get("/carrito", verificarToken, obtenerCarrito);
router.put("/carrito/actualizar", verificarToken, actualizarCantidadCarrito); // ✅ Esta es la ruta que faltaba
router.delete("/carrito/eliminar", verificarToken, eliminarProductoCarrito);
router.delete("/carrito/vaciar", verificarToken, vaciarCarrito);

// 🔹 Rutas de Pedidos (Protegidas con Token)
router.post("/pedidos", verificarToken, realizarPedido);
router.get("/pedidos", verificarToken, obtenerPedidos);

export default router;
