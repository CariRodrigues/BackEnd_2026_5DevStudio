import Movimiento from "../models/movimientoModel.js";

async function getMovimientos(req, res) {
  try {
    const movimientos = await Movimiento.find().populate(["producto", "lote", "cliente"]);
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener movimientos" });
  }
}

async function getMovimiento(req, res) {
  try {
    const movimiento = await Movimiento.findById(req.params.id).populate(["producto", "lote", "cliente"]);
    if (!movimiento) return res.status(404).json({ error: "Movimiento no encontrado" });
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar movimiento" });
  }
}

async function vistaMovimientos(req, res) {
  try {
    const movimientos = await Movimiento.find().populate(["producto", "lote", "cliente"]);
    res.render("indexMovimientos", { movimientos });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar movimientos" });
  }
}

export { getMovimientos, getMovimiento, vistaMovimientos };
