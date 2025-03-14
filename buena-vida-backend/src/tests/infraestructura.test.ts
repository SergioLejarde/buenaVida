// Importamos la clase PedidoRepositorioSQL desde la infraestructura
import { PedidoRepositorioSQL } from "../infraestructura/PedidoRepositorioSQL";

/**
 * Función de prueba para verificar que si un usuario no tiene pedidos, la respuesta es un array vacío.
 */
async function pruebaObtenerPedidos() {
  // Creamos una instancia del repositorio de pedidos
  const pedidoRepositorio = new PedidoRepositorioSQL();

  // Consultamos los pedidos de un usuario que no tiene pedidos
  const pedidos = await pedidoRepositorio.obtenerPedidosPorUsuario(99);

  // Validamos que la respuesta sea un array vacío
  if (Array.isArray(pedidos) && pedidos.length === 0) {
    console.log("✅ Prueba obtener pedidos de usuario sin pedidos: PASÓ");
  } else {
    console.log("❌ Prueba obtener pedidos de usuario sin pedidos: FALLÓ");
  }
}

// Ejecutamos la prueba
pruebaObtenerPedidos();
