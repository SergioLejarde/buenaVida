import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Acceso denegado, token requerido" });
    return; // 👈 Agregado para evitar continuar sin token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).usuario = decoded;
    next(); // 👈 Asegura que `next()` se llame al final
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
    return; // 👈 Importante para evitar ejecución de `next()` después de error
  }
};
