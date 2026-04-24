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

## Uso

Una vez que la aplicación esté corriendo, accede a:

- Productos: `http://localhost:3000/productos`
- Proveedores: `http://localhost:3000/proveedores`

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
