# Backend Todostock

## Descripción

Aplicación de gestión de inventario, clientes, proveedores, lotes, compras, movimientos y ventas con autenticación JWT, MVC y vistas Pug.

## Características principales

- Autenticación con JWT almacenado en cookie
- Control de acceso por roles `admin` y `user`
- Gestión de productos, proveedores, clientes, lotes, compras, movimientos y ventas
- Vistas renderizadas con Pug
- Chat en tiempo real con Socket.IO
- Integración opcional con Gemini IA usando `@google/generative-ai`
- Conexión a MongoDB mediante `MONGO_URI`

## Estructura del proyecto

- `config/` — configuración de la base de datos
- `controllers/` — lógica de negocio y renderizado de vistas
- `models/` — esquemas y modelos de Mongoose
- `middlewares/` — protección de rutas y control de acceso
- `routes/` — definición de rutas de la aplicación
- `services/` — integración con servicios externos (Gemini IA)
- `public/` — recursos estáticos (CSS y JS)
- `views/` — plantillas Pug
- `index.js` — punto de entrada del servidor

## Dependencias

- `dotenv` — carga variables de entorno
- `express` — servidor web
- `mongoose` — ORM de MongoDB
- `mongodb` — driver oficial de MongoDB
- `pug` — motor de plantillas
- `socket.io` — comunicación en tiempo real
- `jsonwebtoken` — manejo de tokens JWT
- `@google/generative-ai` — acceso a Gemini IA

Dev dependencies:

- `nodemon` — reinicio automático en desarrollo
- `jest` — framework de pruebas
- `allure-commandline` — generación de reportes Allure
- `jest-allure2-reporter` — reporteador de pruebas

## Requisitos

- Node.js 18+
- MongoDB Atlas o instancia MongoDB accesible
- Archivo `.env` con variables de entorno

## Instalación local

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd BackEnd_2026_5DevStudio
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con al menos estas variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.uh00vio.mongodb.net/todostock?retryWrites=true&w=majority
GEMINI_API_KEY=<tu_api_key_de_gemini>
```

4. Inicia la aplicación en desarrollo:

```bash
npm run dev
```

5. Abre el navegador en:

```text
http://localhost:3000
```

## Scripts disponibles

- `npm run dev` — inicia el servidor con `nodemon`
- `npm test` — ejecuta las pruebas con Jest
- `npm run test:coverage` — ejecuta pruebas con cobertura
- `npm run allure:generate` — genera reportes Allure
- `npm run allure:open` — abre el reporte Allure generado

## Variables de entorno

- `PORT` — puerto en el que corre la aplicación (por defecto `3000`)
- `MONGO_URI` — URI de conexión a MongoDB
- `GEMINI_API_KEY` — clave de API para Gemini IA (opcional, necesaria para el chat con `@gemini`)

## Uso y autenticación

- La aplicación redirige desde `/` a `/auth/login`.
- Solo usuarios autenticados pueden acceder a las rutas protegidas.
- Solo el rol `admin` puede crear y editar productos, proveedores, lotes y compras.
- La ruta de registro de usuarios (`/auth/registro`) está protegida y solo puede ser usada por un administrador autenticado.

> Importante: el proyecto no crea credenciales administradores automáticamente. Si no existe ningún admin, crea el primer usuario manualmente en la colección `usuarios` de MongoDB con rol `admin`.

## Rutas principales

### Autenticación
- `GET /auth/login` — formulario de login
- `POST /auth/login` — iniciar sesión
- `GET /auth/registro` — formulario de registro de usuario (solo admin)
- `POST /auth/registro` — crear usuario nuevo (solo admin)
- `POST /auth/logout` — cerrar sesión

### Productos
- `GET /productos/vista`
- `GET /productos/vista/:id`
- `GET /productos/nuevo` — admin
- `GET /productos/editar/:id` — admin
- `GET /productos`
- `GET /productos/:id`
- `POST /productos` — admin
- `POST /productos/:id/editar` — admin
- `PUT /productos/:id` — admin
- `DELETE /productos/:id` — admin

### Proveedores
- `GET /proveedores/vista`
- `GET /proveedores/vista/:id`
- `GET /proveedores`
- `GET /proveedores/:id`
- `GET /proveedores/nuevo` — admin
- `GET /proveedores/editar/:id` — admin
- `POST /proveedores` — admin
- `POST /proveedores/:id/editar` — admin
- `PUT /proveedores/:id` — admin
- `DELETE /proveedores/:id` — admin

### Clientes
- `GET /clientes/vista`
- `GET /clientes/vista/:id`
- `GET /clientes/vista/:id/movimientos`
- `GET /clientes/nuevo`
- `GET /clientes/editar/:id`
- `GET /clientes`
- `GET /clientes/:id`
- `GET /clientes/:id/movimientos`
- `POST /clientes`
- `POST /clientes/:id/editar`
- `PUT /clientes/:id`
- `DELETE /clientes/:id` — admin

### Compras
- `GET /compras/vista` — admin
- `GET /compras/nuevo` — admin
- `GET /compras` — admin
- `GET /compras/:id` — admin
- `POST /compras` — admin

### Lotes
- `GET /lotes/vista`
- `GET /lotes/vista/:id`
- `GET /lotes`
- `GET /lotes/:id`
- `POST /lotes` — admin
- `PATCH /lotes/:id` — admin
- `DELETE /lotes/:id` — admin

### Movimientos
- `GET /movimientos/vista`
- `GET /movimientos`
- `GET /movimientos/:id`

### Ventas
- `GET /ventas/vista`
- `GET /ventas/nuevo`
- `GET /ventas`
- `GET /ventas/:id`
- `POST /ventas`

### Chat
- `GET /chat` — requiere usuario autenticado

## Notas adicionales

- Las cookies se usan para conservar la sesión del usuario.
- Si usas MongoDB Atlas, asegúrate de que tu IP local esté permitida o utiliza `0.0.0.0/0` sólo para pruebas.
- La base de datos utiliza usuarios almacenados en MongoDB Atlas.
- El chat puede responder con Gemini IA si se envía un mensaje que comienza con `@gemini`.
- Las rutas no encontradas redirigen al login.

## Credenciales de administrador

Usa estas credenciales de administrador existentes para acceder al panel completo:

- Email: `admin@todostock.com`
- Contraseña: `admin123`

## Comandos útiles

- `npm install` — instala dependencias
- `npm run dev` — inicia el servidor con `nodemon`

## Despliegue

Para desplegar, configura `MONGO_URI` y `GEMINI_API_KEY` en tu plataforma de hosting y ajusta `PORT` según el entorno. El servidor escuchará en el puerto definido o en `3000` si no se especifica.

