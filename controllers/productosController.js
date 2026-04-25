const fs = require("fs");
const path = require("path");
const Producto = require("../models/Producto");
const rutaArchivoProductos = path.join(__dirname, "../data/productos.json");
const Proveedor = require("../models/Proveedor");
const proveedores = require("./proveedoresController");


const leerProductos = () => {
  const data = fs.readFileSync(rutaArchivoProductos, "utf-8");
  return JSON.parse(data);
};

const guardarProductos = (productos) => {
  fs.writeFileSync(rutaArchivoProductos, JSON.stringify(productos, null, 2));
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
  producto = getProducto(id);
  res.json(producto);
}

function crearProducto(req, res) {
  const { nombre, precio, stock, marca, proveedorId } = req.body;

  if (!nombre || !precio || !stock || !marca || !proveedorId) {
    return res.json({ error: "Faltan datos" });
  }

  const productos = leerProductos();

  const nuevoProducto = new Producto(
    productos.length + 1,
    nombre,
    precio,
    stock,
    marca,
    parseInt(proveedorId)
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
  const { nombre, precio, stock, marca, proveedorId } = req.body;
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

  if (marca !== undefined) {
    producto.marca = marca;
  }

  if (proveedorId !== undefined) {
    producto.proveedorId = parseInt(proveedorId);
  }

  guardarProductos(productos);

  res.json({
    mensaje: "Producto actualizado",
    producto: producto,
  });
}


function obtenerNombreProveedor(proveedorId) {
  const listaProveedores = proveedores.leerProveedores();
  const proveedor = listaProveedores.find((p) => p.id === proveedorId);
  return proveedor ? proveedor.nombre : "Proveedor no encontrado";
}

function vistaProductos(req,res) {
  const productos = leerProductos();
  const productosConProveedor = productos.map((producto) => ({
    ...producto,
    nombreProveedor: obtenerNombreProveedor(producto.proveedorId)
  }));
  res.render("indexProductos", { productos: productosConProveedor });
}

function vistaProducto(req,res) {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  producto = getProducto(id);
  const nombreProveedor = obtenerNombreProveedor(producto.proveedorId);
  res.render("detailProducto", { producto: producto, nombreProveedor: nombreProveedor });

}

function formularioNuevoProducto(req, res) {
  const listaProveedores = proveedores.leerProveedores();
  res.render("nuevoProducto", { proveedores: listaProveedores });
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
