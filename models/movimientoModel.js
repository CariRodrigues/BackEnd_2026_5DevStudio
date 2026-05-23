import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ["entrada", "salida", "ajuste"],
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  lote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lote",
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
  },
  cantidad: {
    type: Number,
    required: true,
    min: [1, "La cantidad debe ser mayor a cero"],
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  observacion: String,
  detalles: Object,
}, { timestamps: true });

const Movimiento = mongoose.model("Movimiento", movimientoSchema);

export default Movimiento;
