
<!-- markdownlint-disable MD012 MD010 -->

# Resumen de las Pruebas Unitarias

Cada prueba se enfoca en una parte específica del backend:
 ✔ dominio.test.ts → Prueba la creación de entidades como Pedido.
 ✔ aplicacion.test.ts → Prueba la lógica de negocio, como la creación de pedidos.
 ✔ infraestructura.test.ts → Verifica que las consultas a la base de datos funcionen bien.
 ✔ presentacion.test.ts → Valida que los endpoints de la API respondan correctamente.


Dominio (Entidades)	✅ Sí, Probamos la creación de Pedido.
Aplicación (Casos de uso)✅ Sí, Probamos CrearPedido y verificamos que no permite pedidos con carrito vacío.
Infraestructura (Base de datos)	✅ Sí, Probamos que obtenerPedidosPorUsuario(99) devuelva un array vacío.
Presentación (API / Rutas HTTP)	✅ Sí, Probamos GET /productos y POST /pedidos sin autenticación.
Manejo de errores	✅ Sí, Se validó que CrearPedido lance un error cuando el carrito está vacío.
