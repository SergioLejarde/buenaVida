import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class DatabaseSingleton {
  private static instance: Pool;

  private constructor() {} // 

  public static getInstance(): Pool {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
      });
      console.log("Nueva conexión a la base de datos creada.");
    }
    return DatabaseSingleton.instance;
  }
}

export default DatabaseSingleton;
