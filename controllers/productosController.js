const fs = require("fs");
const path = require("path");
const Producto = require("../models/Producto");
const rutaArchivo = path.join(__dirname, "../data/productos.json");

const leerProductos = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

const guardarProductos = (productos) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2));
};

function getProductos(req, res) {
  const productos = leerProductos();
  res.json(productos);
}

function getProducto(id) {
  const productos = leerProductos();
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return res.status(404).json({
      mensaje: "Producto inexistente",
    });
  }
  return producto;
}

function verProducto(req, res) {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  console.log(id)
  producto = getProducto(id);
  console.log(producto);
  res.json(producto);
}

function crearProducto(req, res) {
  const { nombre, precio, stock } = req.body;

  if (!nombre || !precio || !stock) {
    return res.json({ error: "Faltan datos" });
  }

  const productos = leerProductos();

  const nuevoProducto = new Producto(
    productos.length + 1,
    nombre,
    precio,
    stock,
  );

  productos.push(nuevoProducto);

  guardarProductos(productos);

  res.status(201).json({
    mensaje: "Producto creado correctamente",
    producto: nuevoProducto,
  });
}

function eliminarProducto(req, res) {
  const id = parseInt(req.params.id);
  const productos = leerProductos();

  const nuevosProductos = productos.filter((p) => p.id !== id);
  if (productos.length === nuevosProductos.length) {
    return res.status(404).json({
      mensaje: "Producto inexistente",
    });
  }

  guardarProductos(nuevosProductos);

  res.json({
    mensaje: "Producto eliminado",
  });
}

function actualizarProducto(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, precio, stock } = req.body;
  const productos = leerProductos();

  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({
      mensaje: "Producto inexistente",
    });
  }

  if (nombre !== undefined) {
    producto.nombre = nombre;
  }

  if (precio !== undefined) {
    producto.precio = precio;
  }

  if (stock !== undefined) {
    producto.stock = stock;
  }

  guardarProductos(productos);

  res.json({
    mensaje: "Producto actualizado",
    producto: producto,
  });
}


function vistaProductos(req,res) {
  const productos = leerProductos();
  res.render("indexProductos", { productos });
}

function vistaProducto(req,res) {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  producto = getProducto(id);
  res.render("detailProducto", { producto: producto });

}

function formularioNuevoProducto(req, res) {
  res.render("nuevoProducto");
}

module.exports = {
  getProductos,
  verProducto,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
  vistaProductos,
  vistaProducto,
  formularioNuevoProducto
};
