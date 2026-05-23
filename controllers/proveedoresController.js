import Proveedor from "../models/proveedorModel.js";

async function getProveedores(req, res) {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener proveedores" });
  }
}

async function verProveedor(req, res) {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).json({ error: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar proveedor" });
  }
}

async function crearProveedor(req, res) {
  const { cuit, nombre, domicilio, telefono, email, categoria, plazoEntrega, activo, observaciones } = req.body;
  if (!cuit || !nombre || !domicilio || !telefono || !email || !categoria || !plazoEntrega) {
    return res.json({ error: "Faltan datos" });
  }
  try {
    const nuevoProveedor = await Proveedor.create({
      cuit, nombre, categoria, domicilio, telefono, email, plazoEntrega,
      activo: activo === "on" || activo === "true" || activo === true,
      observaciones,
    });
    res.redirect("/proveedores/vista");
  } catch (error) {
    res.status(500).json({ error: "Error al crear proveedor" });
  }
}

async function eliminarProveedor(req, res) {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) return res.status(404).json({ mensaje: "El proveedor que intenta eliminar no existe." });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar", error });
  }
}

async function actualizarProveedor(req, res) {
  try {
    const nuevosDatos = req.body;
    if (nuevosDatos.activo !== undefined) {
      nuevosDatos.activo = nuevosDatos.activo === "on" || nuevosDatos.activo === true || nuevosDatos.activo === "true";
    } else {
      nuevosDatos.activo = false;
    }
    const proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      { $set: nuevosDatos },
      { new: true, runValidators: true }
    );
    if (!proveedor) return res.status(404).json({ mensaje: "Proveedor inexistente" });

    if (req.originalUrl.includes("/editar")) return res.redirect("/proveedores/vista");
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", error });
  }
}

async function vistaProveedores(req, res) {
  try {
    const proveedores = await Proveedor.find();
    res.render("indexProveedores", { proveedores });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar proveedores" });
  }
}

async function vistaProveedor(req, res) {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).render("404", { url: req.originalUrl });
    res.render("detailProveedor", { proveedor });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar proveedor" });
  }
}

function formularioNuevoProveedor(req, res) {
  res.render("nuevoProveedor");
}

async function formularioEditarProveedor(req, res) {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).render("404", { url: req.originalUrl });
    res.render("editarProveedor", { proveedor });
  } catch (error) {
    res.status(500).json({ error: "Error al cargar formulario" });
  }
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
  formularioEditarProveedor,
};
