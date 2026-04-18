const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

// FUNCIONES
function leerProductos() {
  try {
    const ruta = __dirname + '/data/productos.json';
    const data = fs.readFileSync(ruta, 'utf-8');

    console.log("RUTA:", ruta);
    console.log("CONTENIDO:", data);

    if (!data) return []; // por si está vacío

    return JSON.parse(data);
  } catch (error) {
    console.log("ERROR:", error.message);
    return [];
  }
}
function guardarProductos(productos){
    fs.writeFileSync('./data/productos.json', JSON.stringify(productos, null, 2));
}

//RUTAS
app.get('/productos', (req, res) => {
  const productos = leerProductos();
  res.json(productos);
});

app.post('/productos', (req, res)=>{
  if (!req.body.nombre || !req.body.precio || !req.body.stock) {
  return res.json({ error: "Faltan datos" });
  }
  const productos = leerProductos();

  const nuevoProducto = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock
  };
  productos.push(nuevoProducto);
  guardarProductos(productos);
  res.json(nuevoProducto);
});

app.delete('/productos/:id', (req, res)=>{
  const id = Number(req.params.id);  
  const productos = leerProductos();
  const nuevosproductos = productos.filter(n => n.id !== id);
  guardarProductos(nuevosproductos);
  res.json(nuevosproductos);
});

app.patch('/productos/:id', (req, res) =>{
  const id = Number(req.params.id);
  const productos = leerProductos();
  const producto = productos.find(n => n.id === id);
  if (!producto){
    return res.json({ error: "Producto no encontrado"});
  }
  if (req.body.nombre !== undefined) {
  producto.nombre = req.body.nombre;
  }

  if (req.body.precio !== undefined) {
    producto.precio = req.body.precio;
  }

  if (req.body.stock !== undefined) {
    producto.stock = req.body.stock;
  }
  guardarProductos(productos);
  res.json(producto);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});