import express from "express";
import { listarProductos } from "./productoControlador";
import { registrar, login } from "./usuarioControlador";
import { verificarToken } from "../middleware/auth"; // 👈 Importamos el middleware

const router = express.Router();

router.get("/productos", listarProductos);
router.post("/usuarios/registrar", registrar);
router.post("/usuarios/login", login);
router.get("/perfil", verificarToken, (req, res) => {
  res.json({ mensaje: "Accediste al perfil", usuario: (req as any).usuario });
});

export default router;
