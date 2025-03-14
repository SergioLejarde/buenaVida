<!-- markdownlint-disable MD012 MD010 MD022 MD032 MD051 -->


# README General para el Backend de "Buena Vida"

Este README servirá como **guía principal** para la instalación, configuración y uso del backend de la tienda ecológica "Buena Vida".  

---

## 📌 **Índice**
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Uso del Backend](#uso-del-backend)
6. [Pruebas](#pruebas)
7. [Endpoints de la API](#endpoints-de-la-api)
8. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
9. [Licencia](#licencia)

---

## 📖 **Descripción del Proyecto**
El backend de **Buena Vida** es una API desarrollada con **Node.js, TypeScript y Express** siguiendo la **arquitectura hexagonal**. Su propósito es manejar los productos, usuarios, carrito de compras y pedidos de la tienda ecológica, garantizando modularidad, escalabilidad y buenas prácticas de desarrollo.

Este backend incluye:
- **Gestión de productos** (CRUD con paginación y filtros).
- **Registro y autenticación de usuarios** con JWT.
- **Carrito de compras** con operaciones como agregar, eliminar y actualizar productos.
- **Gestión de pedidos** con estrategias de pago y validaciones.
- **Persistencia en PostgreSQL**, con repositorios aplicando el **patrón Repositorio**.
- **Pruebas unitarias e integración** para validar la funcionalidad.

---

## 🔧 **Tecnologías Utilizadas**
- **Node.js** - Entorno de ejecución JavaScript.
- **TypeScript** - Tipado estático para JavaScript.
- **Express.js** - Framework para la API REST.
- **PostgreSQL** - Base de datos relacional.
- **JWT** - Autenticación segura.
- **bcrypt** - Hashing de contraseñas.
- **Dotenv** - Manejo de variables de entorno.
- **Fetch (para pruebas)** - Pruebas de endpoints HTTP.
- **Arquitectura Hexagonal** - Implementación de puertos y adaptadores.

---

## 📂 **Estructura del Proyecto**

buena-vida-backend/
│── src/
│   ├── aplicacion/      # Casos de uso
│   ├── dominio/         # Entidades y contratos (repositorios)
│   ├── infraestructura/ # Implementaciones concretas (BD, API)
│   ├── presentacion/    # Controladores y rutas de Express
│   ├── middleware/      # Autenticación y validaciones
│   ├── tests/           # Pruebas unitarias e integración
│   ├── config/          # Configuración de variables de entorno
│   ├── server.ts        # Archivo principal del servidor
│── package.json
│── tsconfig.json
│── .env.example         # Ejemplo de variables de entorno
│── README.md            # Documentación del backend

---

## ⚙️ **Instalación y Configuración**
### 🔹 **Requisitos Previos**
Antes de ejecutar el backend, asegúrate de tener instalado:
- **Node.js** (versión 18 o superior)
- **PostgreSQL** (base de datos configurada)
- **Un gestor de paquetes (npm o yarn)**

### 🔹 **1️⃣ Clonar el Repositorio**

git clone https://github.com/usuario/buena-vida-backend.git
cd buena-vida-backend


### 🔹 **2️⃣ Instalar Dependencias**

npm install


### 🔹 **3️⃣ Configurar Variables de Entorno**
Renombra el archivo `.env.example` a `.env` y configura los valores:

DATABASE_URL=postgres://usuario:contraseña@localhost:5432/buenavida
JWT_SECRET=clave_secreta
PORT=3000


### 🔹 **4️⃣ Ejecutar Migraciones de Base de Datos**

npx ts-node src/infraestructura/db.ts

Esto creará las tablas necesarias en la base de datos.

### 🔹 **5️⃣ Iniciar el Servidor**

npx ts-node src/server.ts

El servidor estará corriendo en **http://localhost:3000**.

---

## 🚀 **Uso del Backend**
### 🔹 **Ejecutar en Modo Desarrollo**

npm run dev

Esto activará Nodemon para recargar automáticamente en cambios.

### 🔹 **Ejecutar en Producción**

npm start


---

## 🛠 **Pruebas**
Se han implementado **pruebas unitarias e integración**.

### 🔹 **Ejecutar Pruebas**

npx ts-node src/tests/dominio.test.ts
npx ts-node src/tests/aplicacion.test.ts
npx ts-node src/tests/infraestructura.test.ts
npx ts-node src/tests/presentacion.test.ts


### 🔹 **Ejecutar Pruebas de API con Postman**
1. Importar la colección de Postman (`tests/postman_collection.json`).
2. Ejecutar los tests desde la interfaz de Postman.

---

## 📡 **Endpoints de la API**
Algunos de los principales endpoints disponibles:

### 🔹 **Autenticación**
- `POST /usuarios` - Registrar usuario
- `POST /auth/login` - Iniciar sesión (devuelve token JWT)

### 🔹 **Gestión de Productos**
- `GET /productos` - Listar productos con filtros
- `POST /productos` - Crear producto (requiere autenticación)
- `PUT /productos/:id` - Actualizar producto
- `DELETE /productos/:id` - Eliminar producto

### 🔹 **Carrito de Compras**
- `GET /carrito` - Ver carrito del usuario
- `POST /carrito` - Agregar producto al carrito
- `PUT /carrito` - Modificar cantidad de un producto en el carrito
- `DELETE /carrito/:id` - Eliminar producto del carrito

### 🔹 **Pedidos**
- `POST /pedidos` - Realizar pedido
- `GET /pedidos` - Ver pedidos del usuario

Para más detalles sobre los parámetros y respuestas, consulta la **documentación de la API**.

---

## 🔐 **Consideraciones de Seguridad**
- Se utiliza **bcrypt** para encriptar contraseñas.
- Se protege el acceso con **JWT** (Token Bearer en `Authorization`).
- Los endpoints sensibles requieren autenticación.
- Se implementaron validaciones en el backend.

---

## 📜 **Licencia**
Este proyecto es de uso académico y no debe ser utilizado para fines comerciales sin permiso.

---

## 📝 **Notas Finales**
Este backend está diseñado para ser **modular, escalable y seguro**, cumpliendo con los principios de **arquitectura hexagonal**. En el segundo parcial, se integrará con el frontend.
