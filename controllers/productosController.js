import Producto from "../models/productoModel.js";
import Proveedor from "../models/proveedorModel.js";
import * as proveedores from "../controllers/proveedoresController.js";


async function getProductos(req, res) {
  try{
    const productos = await Producto.find();
    res.json(productos);
  }catch(error){
    res.status(500).json({
      error: "Error al obtener Productos"
    });
  }
}

async function getProducto(id) {
  return await Producto.findById(id);
}
 
async function verProducto(req, res) {
  const id = req.params.id;
  try{
    const producto = await Producto.findById(id);
    if(!producto){
      return res.status(404).json({error: "Producto no encontrado"})
    }
    res.json(producto);
  }catch(error){
    res.status(500).json({
        error: "Error al buscar Producto"
    });
  }
}

async function crearProducto(req, res) {
  const { nombre, precio, stock, marca, proveedorId } = req.body;

  if (!nombre || !precio || !stock || !marca || !proveedorId) {
    return res.json({ error: "Faltan datos" });
  }

  const nuevoProducto = await Producto.create({
    nombre,
    precio,
    stock,
    marca,
    proveedorId
  });


  res.redirect("/productos/vista");
}

async function eliminarProducto(req, res) {
  try{
    const id = req.params.id;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if(!productoEliminado){
      return res.status(404).json({mensaje: "El producto que intenta eliminar no existe"})
    };
    res.status(200).json(productoEliminado);
  }catch(error){
    res.status(500).json({mensaje: "Error al eliminar", error});
  }
}

async function actualizarProducto(req, res) {
  try{
    const id = req.params.id;
    const nuevosDatos = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { $set: nuevosDatos },
      { new: true, runValidators: true}
    );
    if(!productoActualizado){
      return res.status(404).json({
        mensaje: "Producto inexistente",
      });
    }

    if (req.method === "POST" && req.originalUrl.includes("/editar")) {
      return res.redirect(`/productos/vista?mensaje=Producto actualizado correctamente`);
    }

    res.status(200).json(productoActualizado);
  }catch(error){
    res.status(500).json({mensaje: "Error al actualizar producto", error});
  }
}

async function vistaProductos(req,res) {
  try{
    const productos = await Producto.find().populate('proveedorId');    
    const mensaje = req.query.mensaje;
    res.render("indexProductos", { productos, mensaje });
  }catch(error){
    res.status(500).json({
      error: "Error al buscar productos"
    });
  }
}

async function vistaProducto(req,res) {
  const id = req.params.id;
  try{
    const producto = await Producto.findById(id).populate('proveedorId');
    if(!producto){
      return res.status(404).json({mensaje: "Producto no encontrado"})
    };
    const nombreProveedor = producto.proveedorId ? producto.proveedorId.nombre : "Proveedor no encontrado";
    res.render("detailProducto", { producto: producto, nombreProveedor });
  }catch(error){
    res.status(500).json({
      error: "Error al buscar producto"
    });
  }
}

async function formularioNuevoProducto(req, res) {
  const listaProveedores = await Proveedor.find();
  res.render("nuevoProducto", { proveedores: listaProveedores });
}

async function formularioEditarProducto(req, res) {
  const id = req.params.id;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    const listaProveedores = await Proveedor.find();
    res.render("editarProducto", { producto, proveedores: listaProveedores });
  } catch (error) {
    res.status(500).json({
      error: "Error al cargar formulario de edición"
    });
  }
}

export {
  getProductos,
  verProducto,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
  vistaProductos,
  vistaProducto,
  formularioNuevoProducto,
  formularioEditarProducto
};
