const Productos = require("../models/productos.js");

function getProductos(req, res) { 
    const productos = Productos.leerProductos();
    res.json(productos);
 }

 function crearProducto(req, res) {
    const productos = Productos.leerProductos();
    const nuevoProducto = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock
    };
    productos.push(nuevoProducto);
    Productos.guardarProductos(productos);

    res.json(nuevoProducto);
 }

 function eliminarProducto(req, res) {
  const id = Number(req.params.id);
  const productos = Productos.leerProductos();

  const nuevosProductos = productos.filter(p => p.id !== id);

  Productos.guardarProductos(nuevosProductos);

  res.json(nuevosProductos);
}

function actualizarProducto(req, res) {
  const id = Number(req.params.id);
  const productos = Productos.leerProductos();

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.json({ error: "Producto no encontrado" });
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

  Productos.guardarProductos(productos);

  res.json(producto);
}

 module.exports = {
  getProductos,
  crearProducto,
  eliminarProducto,
  actualizarProducto
};