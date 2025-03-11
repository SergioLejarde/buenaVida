import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Ejecutar creación de tablas al iniciar la app
export async function inicializarBaseDeDatos() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL,
      categoria VARCHAR(100),
      imagen_url TEXT
    );
  `);
  console.log("✅ Base de datos inicializada correctamente.");
}

// Ejecutar la inicialización solo cuando el archivo se importe
inicializarBaseDeDatos();
