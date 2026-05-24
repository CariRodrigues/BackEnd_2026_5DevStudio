import Cliente from "../models/clienteModel.js";
import Movimiento from "../models/movimientoModel.js";

async function getClientes(req, res) {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
}

async function getCliente(req, res) {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar cliente" });
  }
}

async function crearCliente(req, res) {
  const { nombre, email, telefono, direccion, notas } = req.body;
  if (!nombre || !email) return res.json({ error: "Faltan datos" });
  try {
    const cliente = await Cliente.create({ nombre, email, telefono, direccion, notas, saldoCuentaCorriente: 0 });
    res.redirect("/clientes/vista");
  } catch (error) {
    res.status(500).json({ error: "Error al crear cliente" });
  }
}

async function actualizarCliente(req, res) {
  try {
    const id = req.params.id;
    const nuevosDatos = req.body;
    if (nuevosDatos.activo === "on") {
      nuevosDatos.activo = true;
    } else {
      nuevosDatos.activo = false;
    }
    console.log("datos");
    console.log(nuevosDatos);
    const cliente = await Cliente.findByIdAndUpdate(
      id,
      { $set: nuevosDatos },
      { new: true, runValidators: true }
    );
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.redirect("/clientes/vista");
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
}

async function eliminarCliente(req, res) {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
}

async function getMovimientosCliente(req, res) {
  try {
    const movimientos = await Movimiento.find({ cliente: req.params.id }).populate("producto").populate("lote");
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener movimientos del cliente" });
  }
}

async function vistaClientes(req, res) {
  try {
    const clientes = await Cliente.find();
    res.render("indexClientes", { clientes });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar clientes" });
  }
}

async function vistaCliente(req, res) {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).render("404", { url: req.originalUrl });
    res.render("detailCliente", { cliente });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar cliente" });
  }
}

async function vistaMovimientosCliente(req, res) {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).render("404", { url: req.originalUrl });
    const movimientos = await Movimiento.find({ cliente: req.params.id }).populate("producto").populate("lote");
    res.render("clienteMovimientos", { cliente, movimientos });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar movimientos" });
  }
}

function formularioNuevoCliente(req, res) {
  res.render("nuevoCliente");
}

async function formularioEditarCliente(req, res) {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).render("404", { url: req.originalUrl });
    res.render("editarCliente", { cliente });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar cliente" });
  }
}

export {
  getClientes,
  getCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  getMovimientosCliente,
  vistaClientes,
  vistaCliente,
  vistaMovimientosCliente,
  formularioNuevoCliente,
  formularioEditarCliente,
};
