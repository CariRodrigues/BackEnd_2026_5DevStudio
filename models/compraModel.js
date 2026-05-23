import mongoose from "mongoose";

const compraSchema = new mongoose.Schema({
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor",
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  lote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lote",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: [1, "La cantidad debe ser mayor a cero"],
  },
  precioCompra: {
    type: Number,
    required: true,
    min: [0, "El precio de compra no puede ser negativo"],
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  observacion: String,
}, { timestamps: true });

const Compra = mongoose.model("Compra", compraSchema);

export default Compra;
