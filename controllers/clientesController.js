import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rutaArchivo = path.join(__dirname, "../data/clientes.json");
import Cliente from "../models/clienteModel.js";

async function getClientes(req, res) {
  try {
    const clientes =  await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      error:"Error al obtener clientes"
    });
  }
}

async function getCliente(id) {
  return await Cliente.findById(id);
}

async function verCliente(req, res) {
  const id = req.params.id;
  try{
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar cliente"
    });
  }  
}

async function crearCliente(req, res) {
  const { cuit, nombre, domicilio, telefono, email, rubro, plazoEntrega, activo, observaciones } = req.body;

  if (!cuit || !nombre || !domicilio || !telefono || !email || !rubro || !plazoEntrega || activo === undefined) {
    return res.json({ error: "Faltan datos" });
  }
  const nuevoCliente = await Cliente.create({
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
    mensaje: "Cliente creado correctamente",
    cliente: nuevoCliente,
  });
}


async function eliminarCliente(req, res) {
  try{
    const {id} = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if(!clienteEliminado){
      return res.status(404).json({mensaje: "El cliente que intenta eliminar no existe."})
    };
    res.status(200).json(clienteEliminado);
  } catch(error){
    res.status(500).json({mensaje: "Error al eliminar", error});
  } 
}


async function actualizarCliente(req, res) {
  try{
    const {id} = req.params;
    const nuevosDatos = req.body;
    
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { $set: nuevosDatos },
      { new: true, runValidators: true }
    );
    if (!clienteActualizado) {
        return res.status(404).json({
        mensaje: "Cliente inexistente",
      });
    }
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({mensaje: "Error al actualizar", error});
  }
} 


async function vistaClientes(req, res) {
  const clientes = await Cliente.find()
  res.render("clientes/indexClientes", { clientes });
}

async function vistaCliente(req, res) {
  const id = req.params.id;
  try{
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.render("clientes/detailCliente", { cliente: cliente });
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar cliente"
    });
  }   
}

function formularioNuevoCliente(req, res) {
  res.render("clientes/nuevoCliente");
}

export {
  getClientes,
  verCliente,
  crearCliente,
  eliminarCliente,
  actualizarCliente,
  vistaClientes,
  vistaCliente,
  formularioNuevoCliente,
};
