import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verificarRol(rolRequerido: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token requerido" });
      return;
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      if (decoded.rol !== rolRequerido) {
        res.status(403).json({ error: "Acceso denegado: rol insuficiente" });
        return;
      }

      (req as any).usuario = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }
  };
}
