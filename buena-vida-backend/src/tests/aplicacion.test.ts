// Importamos las clases necesarias de la capa de aplicación e infraestructura
import { CrearPedido } from "../aplicacion/pedido/crearPedido";
import { PedidoRepositorioSQL } from "../infraestructura/PedidoRepositorioSQL";
import { CarritoRepositorioSQL } from "../infraestructura/CarritoRepositorioSQL";

/**
 * Función de prueba para verificar que no se puede crear un pedido si el carrito está vacío.
 */
async function pruebaCrearPedidoCarritoVacio() {
  // Creamos instancias de los repositorios
  const pedidoRepositorio = new PedidoRepositorioSQL();
  const carritoRepositorio = new CarritoRepositorioSQL();

  // Instanciamos el caso de uso "CrearPedido"
  const crearPedido = new CrearPedido(pedidoRepositorio, carritoRepositorio);

  try {
    // Intentamos crear un pedido con un usuario que tiene el carrito vacío
    await crearPedido.ejecutar(99);
    console.log("❌ Prueba crear pedido con carrito vacío: FALLÓ (Debería haber fallado)");
  } catch (error) {
    console.log("✅ Prueba crear pedido con carrito vacío: PASÓ (Capturó el error correctamente)");
  }
}

// Ejecutamos la prueba
pruebaCrearPedidoCarritoVacio();
