import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  return await Cliente.findById(new mongoose.Types.UUID(id));
}

async function verCliente(req, res) {
  const id = req.params.id;
  try{
    const cliente = await Cliente.findById(new mongoose.Types.UUID(id));

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
  const { cuit, nombre, apellido, domicilio, telefono, email, observaciones, condicionIVA } = req.body;

  if (!cuit || !nombre || !apellido || !domicilio || !telefono || !email || !observaciones) {
    return res.json({ error: "Faltan datos" });
  }
  const nuevoCliente = await Cliente.create({
    cuit,
    nombre,
    apellido,
    domicilio,
    telefono,
    email,
    observaciones,
    condicionIVA,
  });
  
  res.redirect("/clientes/vista");
}


async function eliminarCliente(req, res) {
  try{
    const {id} = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(new mongoose.Types.UUID(id));
    if(!clienteEliminado){
      return res.status(404).json({mensaje: "El cliente que intenta eliminar no existe."})
    };
    res.status(200).json(clienteEliminado);
    
    res.redirect("/clientes/vista");  
  } catch(error){
    res.status(500).json({mensaje: "Error al eliminar", error});
  } 
}


async function actualizarCliente(req, res) {
  try{
    const {id} = req.params;
    const nuevosDatos = req.body;
    
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      new mongoose.Types.UUID(id),
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
  console.log("ID recibido:", id); // Agregado para depuración
  try{
    const cliente = await Cliente.findById(new mongoose.Types.UUID(id));
    console.log("Cliente encontrado:", cliente); // Agregado para depuración
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
