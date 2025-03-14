# Capa aplicacion

 Descripción:

Esta capa contiene la lógica de negocio y los casos de uso de la aplicación. Aquí se definen las reglas de negocio sin depender de la infraestructura o de la presentación.

## Archivos y su funcionalidad

📁 pedido/

CrearPedido.ts → Caso de uso para crear un pedido a partir del contenido del carrito de compras. Se asegura de que el carrito no esté vacío y calcula el total del pedido.

VerPedidos.ts → Caso de uso para obtener la lista de pedidos de un usuario autenticado.

📁 carrito/

AgregarProducto.ts → Agrega un producto al carrito de un usuario y aumenta la cantidad si ya existe en el carrito.

EliminarProducto.ts → Permite eliminar un producto específico del carrito.

VerCarrito.ts → Obtiene el contenido del carrito de un usuario para mostrarlo en la interfaz.

ActualizarCantidadProducto.ts → Permite modificar la cantidad de un producto en el carrito.

VaciarCarrito.ts → Vacía el carrito de un usuario, eliminando todos los productos.

## Flujo de trabajo en esta carpeta

1️⃣ Un usuario agrega productos al carrito (AgregarProducto.ts)
2️⃣ Consulta su carrito (VerCarrito.ts)
3️⃣ Actualiza o elimina productos (ActualizarCantidadProducto.ts, EliminarProducto.ts)
4️⃣ Finaliza la compra (CrearPedido.ts), donde se valida y crea el pedido en la base de datos
5️⃣ Consulta sus pedidos (VerPedidos.ts)