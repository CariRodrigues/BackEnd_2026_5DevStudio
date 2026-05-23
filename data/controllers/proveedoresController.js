import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rutaArchivo = path.join(__dirname, "../data/proveedores.json");
import Proveedor from "../models/proveedorModel.js";

async function getProveedores(req, res) {
  try {
    const proveedores =  await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({
      error:"Error al obtener proveedores"
    });
  }
}

async function getProveedor(id) {
  return await Proveedor.findById(id);
}

async function verProveedor(req, res) {
  const id = req.params.id;
  try{
    const proveedor = await Proveedor.findById(id);

    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar proveedor"
    });
  }  
}

async function crearProveedor(req, res) {
  const { cuit, nombre, domicilio, telefono, email, rubro, plazoEntrega, activo, observaciones } = req.body;

  if (!cuit || !nombre || !domicilio || !telefono || !email || !rubro || !plazoEntrega || activo === undefined) {
    return res.json({ error: "Faltan datos" });
  }
  const nuevoProveedor = await Proveedor.create({
    cuit,
    nombre,
    domicilio,
    telefono,
    email,
    rubro,
    plazoEntrega,
    activo,
    observaciones
  });
  
  res.status(201).json({
    mensaje: "Proveedor creado correctamente",
    proveedor: nuevoProveedor,
  });
}


async function eliminarProveedor(req, res) {
  try{
    const {id} = req.params;
    const proveedorEliminado = await Proveedor.findByIdAndDelete(id);
    if(!proveedorEliminado){
      return res.status(404).json({mensaje: "El proveedor que intenta eliminar no existe."})
    };
    res.status(200).json(proveedorEliminado);
  } catch(error){
    res.status(500).json({mensaje: "Error al eliminar", error});
  } 
}


async function actualizarProveedor(req, res) {
  try{
    const {id} = req.params;
    const nuevosDatos = req.body;
    
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      id,
      { $set: nuevosDatos },
      { new: true, runValidators: true }
    );
    if (!proveedorActualizado) {
        return res.status(404).json({
        mensaje: "Proveedor inexistente",
      });
    }
    res.status(200).json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({mensaje: "Error al actualizar", error});
  }
} 


async function vistaProveedores(req, res) {
  const proveedores = await Proveedor.find()
  res.render("indexProveedores", { proveedores });
}

async function vistaProveedor(req, res) {
  const id = req.params.id;
  try{
    const proveedor = await Proveedor.findById(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.render("detailProveedor", { proveedor: proveedor });
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar proveedor"
    });
  }   
}

function formularioNuevoProveedor(req, res) {
  res.render("nuevoProveedor");
}

export {
  getProveedores,
  verProveedor,
  crearProveedor,
  eliminarProveedor,
  actualizarProveedor,
  vistaProveedores,
  vistaProveedor,
  formularioNuevoProveedor,
};
