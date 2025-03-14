// Importamos la clase Pedido desde la capa de dominio
import { Pedido } from "../dominio/pedido";

/**
 * Función de prueba para verificar que un Pedido se crea correctamente.
 */
function pruebaCrearPedido() {
  // Creamos una instancia de Pedido con valores de prueba
  const pedido = new Pedido(1, 2, 50.00, new Date(), "pendiente", []);

  // Verificamos si los valores son los esperados
  if (pedido.usuarioId === 2 && pedido.total === 50.00 && pedido.estado === "pendiente") {
    console.log("✅ Prueba crear pedido: PASÓ");
  } else {
    console.log("❌ Prueba crear pedido: FALLÓ");
  }
}

// Ejecutamos la prueba
pruebaCrearPedido();
