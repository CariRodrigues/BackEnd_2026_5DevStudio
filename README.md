# Backend Todostock

## Descripción

Aplicación de gestión de stock, ventas y compras con autenticación y control de acceso. Está construido con Node.js, Express, Mongoose y Pug, usando una arquitectura MVC básica.

## Características principales

- Autenticación con usuarios y token de sesión en cookie
- Control de acceso con roles `admin` y `user`
- Gestión de productos, proveedores, clientes, lotes, compras, movimientos y ventas
- Vistas renderizadas con Pug
- Chat en tiempo real con Socket.IO
- Conexión a MongoDB Atlas mediante `MONGO_URI`

## Estructura del proyecto

- `config/` — configuración de la base de datos
- `controllers/` — lógica de cada entidad y vistas
- `models/` — esquemas y modelos de Mongoose
- `middlewares/` — protección de rutas y control de acceso
- `routes/` — definición de rutas de la aplicación
- `public/` — recursos estáticos (CSS y JS)
- `views/` — plantillas Pug
- `index.js` — punto de entrada del servidor

## Dependencias

- `dotenv` — carga variables de entorno
- `express` — servidor web
- `mongoose` — ORM de MongoDB
- `mongodb` — driver de MongoDB
- `pug` — motor de plantillas
- `socket.io` — comunicación en tiempo real
- `jsonwebtoken` — token JWT disponible como dependencia

Dev dependency:

- `nodemon` — reinicio automático en desarrollo

## Requisitos

- Node.js 18+ (recomendado)
- MongoDB Atlas o una base de datos MongoDB accesible

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
```

4. Inicia la aplicación:

```bash
npm run dev
```

5. Abre el navegador en:

```text
http://localhost:3000
```

## Variables de entorno

- `PORT` — puerto en el que corre la aplicación (por defecto `3000` si no se define)
- `MONGO_URI` — URI de conexión a MongoDB Atlas

## Uso y autenticación

- La aplicación redirige a `/auth/login` desde `/`.
- Solo usuarios autenticados pueden acceder a las rutas protegidas.
- Solo el rol `admin` puede crear y editar productos, proveedores, lotes y compras.
- La ruta de registro de usuarios (`/auth/registro`) está protegida y solo puede ser usada por un administrador existente.

> Importante: si no existe un usuario administrador en la base de datos, el primer usuario deberá crearse directamente en MongoDB porque el registro está limitado a administradores.

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
- `GET /proveedores`
- `GET /proveedores/vista`
- `GET /proveedores/vista/:id`
- `GET /proveedores/nuevo` — admin
- `GET /proveedores/editar/:id` — admin
- `GET /proveedores/:id`
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

## Credenciales de administrador

Usa estas credenciales de administrador existentes para acceder al panel completo:

- Email: `admin@todostock.com`
- Contraseña: `admin123`

## Comandos útiles

- `npm install` — instala dependencias
- `npm run dev` — inicia el servidor con `nodemon`

## Despliegue

Para desplegar, configura `MONGO_URI` en tu plataforma de hosting y establece `PORT` según el entorno. El servidor escuchará en el puerto definido o en `3000` si no se especifica.

