import { pool } from "../infraestructura/db";
import fs from "fs";
import path from "path";

interface ProductoData {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen_url: string;
  promocion: boolean;
}

function parsearPrecio(texto: string): number {
  return parseFloat(texto.replace("€", "").replace(",", ".").trim());
}

// Ahora promoción se asigna aleatoriamente a ~20% de los productos
function determinarPromocion(): boolean {
  return Math.random() < 0.2;
}

async function cargarProductos() {
  const raw = fs.readFileSync(path.join(__dirname, "../../products-description.txt"), "utf-8");
  const lineas = raw.split("\n");

  const productos: ProductoData[] = [];
  let buffer: string[] = [];

  const guardarProducto = (bloque: string[]) => {
    try {
      if (bloque.length < 5) return;

      const nombre = bloque[1]?.trim() || "";
      const contenido = bloque[2]?.trim() || "";
      const precioLinea = bloque[3]?.trim() || "";

      const descIndex = bloque.findIndex(line =>
        line.toLowerCase().startsWith("el ") ||
        line.toLowerCase().startsWith("aceite") ||
        line.toLowerCase().startsWith("parche") ||
        line.toLowerCase().startsWith("este") ||
        line.toLowerCase().startsWith("pequeñas") ||
        line.toLowerCase().startsWith("oil") ||
        line.toLowerCase().startsWith("hidrata")
      );

      const descripcion = descIndex >= 0
        ? bloque.slice(descIndex).join(" ").replace(/\s+/g, " ").trim()
        : bloque.slice(5).join(" ").replace(/\s+/g, " ").trim();

      if (!nombre || !precioLinea || !descripcion) return;

      productos.push({
        nombre: `${nombre} ${contenido}`.trim(),
        descripcion,
        precio: parsearPrecio(precioLinea),
        stock: Math.floor(Math.random() * 30) + 10,
        categoria: "General",
        imagen_url: "",
        promocion: determinarPromocion(),
      });
    } catch (err) {
      console.error("❌ Producto malformado. Se omitió:", err);
    }
  };

  for (let linea of lineas) {
    if (linea.trim() === "") {
      if (buffer.length > 0) {
        guardarProducto(buffer);
        buffer = [];
      }
    } else {
      buffer.push(linea.trim());
    }
  }

  if (buffer.length > 0) {
    guardarProducto(buffer);
  }

  for (const producto of productos) {
    await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url, promocion) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.categoria,
        producto.imagen_url,
        producto.promocion,
      ]
    );
    console.log(`✅ Producto insertado: ${producto.nombre}`);
  }

  console.log(`✅ Todos los productos fueron insertados (${productos.length})`);
}

cargarProductos().catch(err => {
  console.error("❌ Error al insertar productos:", err);
});
