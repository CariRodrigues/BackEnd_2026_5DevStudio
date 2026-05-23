import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: [1, "La cantidad debe ser mayor a cero"],
  },
  precioVenta: {
    type: Number,
    required: true,
    min: [0, "El precio de venta no puede ser negativo"],
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  observacion: String,
  detalles: Object,
}, { timestamps: true });

const Venta = mongoose.model("Venta", ventaSchema);

export default Venta;
