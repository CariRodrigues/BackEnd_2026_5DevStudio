import Lote from "../models/loteModel.js";

async function getLotes(req, res) {
  try {
    const lotes = await Lote.find().populate(["producto", "proveedor"]);
    res.json(lotes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lotes" });
  }
}

async function getLote(req, res) {
  try {
    const lote = await Lote.findById(req.params.id).populate(["producto", "proveedor"]);
    if (!lote) return res.status(404).json({ error: "Lote no encontrado" });
    res.json(lote);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar lote" });
  }
}

async function crearLote(req, res) {
  const { producto, proveedor, codigoLote, fechaIngreso, fechaVencimiento, cantidadDisponible, cantidadInicial } = req.body;
  if (!producto || !proveedor || !codigoLote || !fechaVencimiento || !cantidadDisponible) {
    return res.json({ error: "Faltan datos" });
  }
  try {
    const lote = await Lote.create({ producto, proveedor, codigoLote, fechaIngreso, fechaVencimiento, cantidadDisponible, cantidadInicial: cantidadInicial ?? cantidadDisponible });
    res.status(201).json({ mensaje: "Lote creado correctamente", lote });
  } catch (error) {
    res.status(500).json({ error: "Error al crear lote" });
  }
}

async function actualizarLote(req, res) {
  try {
    const lote = await Lote.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!lote) return res.status(404).json({ error: "Lote no encontrado" });
    res.json(lote);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar lote" });
  }
}

async function eliminarLote(req, res) {
  try {
    const lote = await Lote.findByIdAndDelete(req.params.id);
    if (!lote) return res.status(404).json({ error: "Lote no encontrado" });
    res.json(lote);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar lote" });
  }
}

async function vistaLotes(req, res) {
  try {
    const lotes = await Lote.find().populate(["producto", "proveedor"]);
    res.render("indexLotes", { lotes });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar lotes" });
  }
}

async function vistaLote(req, res) {
  try {
    const lote = await Lote.findById(req.params.id).populate(["producto", "proveedor"]);
    if (!lote) return res.status(404).render("404", { url: req.originalUrl });
    res.render("detailLote", { lote });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar lote" });
  }
}

export { getLotes, getLote, crearLote, actualizarLote, eliminarLote, vistaLotes, vistaLote };
