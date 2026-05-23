# Tecnicatura Superior en Desarrollo de Software

## Descripción

Esta aplicación backend está desarrollada con Node.js y Express, siguiendo un patrón de arquitectura MVC (Modelo-Vista-Controlador) utilizando Pug como motor de plantillas para las vistas. 
El proyecto forma parte de un trabajo práctico para la materia de Desarrollo Web Backend.

## Estructura del Proyecto

- `controllers/` - Controladores para manejar la lógica de productos y proveedores
- `data/` - Archivos JSON con datos de productos y proveedores
- `models/` - Modelos de datos para productos y proveedores
- `public/` - Archivos estáticos (CSS, imágenes, etc.)
- `routes/` - Definición de rutas para productos y proveedores
- `views/` - Plantillas Pug para las vistas

## Prerrequisitos

- Node.js (versión 18 o superior)
- npm (viene incluido con Node.js)

## Instalación

1. Clona el repositorio o descarga los archivos del proyecto.

2. Navega al directorio del proyecto:
   ```
   cd BackEnd_2026_5DevStudio
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Configuración

La aplicación utiliza variables de entorno. Crea un archivo `.env` en la raíz del proyecto si deseas configurar el puerto:

```
PORT=3000
```

Si no se especifica, la aplicación usará el puerto 3000 por defecto.

## Ejecución

```
node index.js
```

O si agregas un script de inicio en `package.json`:
```
npm start
```

## Rutas Disponibles

Una vez que el servidor esté en funcionamiento, se puede acceder a las siguientes rutas:

### Tablas de Datos
- **Tabla de Productos**: `http://localhost:3000/productos/vista`
- **Tabla de Proveedores**: `http://localhost:3000/proveedores/vista`


### Productos
- `GET /productos` — devuelve todos los productos en JSON
- `GET /productos/:id` — devuelve un producto por ID en JSON
- `GET /productos/vista` — renderiza la tabla de productos
- `GET /productos/nuevo` — formulario para crear un producto
- `GET /productos/editar/:id` — formulario para editar un producto existente
- `POST /productos` — crea un nuevo producto
- `POST /productos/:id/editar` — actualiza un producto desde el formulario de edición


### Proveedores
- `GET /proveedores` — devuelve todos los proveedores en JSON
- `GET /proveedores/:id` — devuelve un proveedor por ID en JSON
- `GET /proveedores/vista` — renderiza la tabla de proveedores
- `GET /proveedores/nuevo` — formulario para crear un proveedor
- `GET /proveedores/editar/:id` — formulario para editar un proveedor existente
- `POST /proveedores` — crea un nuevo proveedor
- `POST /proveedores/:id/editar` — actualiza un proveedor desde el formulario de edición


### Comportamiento de edición
- Las tablas de productos y proveedores ahora tienen una columna `Editar` para abrir el formulario de edición.
- Al guardar los cambios desde los formularios de edición, el usuario es redirigido a la lista correspondiente.
- El mensaje de confirmación de actualización se muestra como un popup temporal en la vista.


## Dependencias

- **express**: Framework web para Node.js
- **pug**: Motor de plantillas
- **dotenv**: Gestión de variables de entorno

## Dependencias de desarrollo

- **nodemon**: Herramienta para recarga automática durante desarrollo

## Scripts disponibles

- `npm test`: Ejecuta las pruebas (actualmente no implementadas)


## Licencia

Este proyecto está bajo la Licencia ISC.
