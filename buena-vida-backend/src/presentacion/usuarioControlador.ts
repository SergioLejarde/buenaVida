import { Request, Response } from "express";
import { RegistrarUsuario } from "../aplicacion/registrarUsuario";
import { IniciarSesion } from "../aplicacion/iniciarSesion";
import { UsuarioRepositorioSQL } from "../infraestructura/usuarioRepositorioSQL";
import { Usuario } from "../dominio/usuario";

const usuarioRepositorio = new UsuarioRepositorioSQL();
const registrarUsuario = new RegistrarUsuario(usuarioRepositorio);
const iniciarSesion = new IniciarSesion(usuarioRepositorio);

export const registrar = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;
    const usuario = await registrarUsuario.ejecutar(nombre, email, password);
    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, usuarioId } = await iniciarSesion.ejecutar(email, password);
    res.json({ token, usuarioId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: "Unknown error" });
    }
  }
};
