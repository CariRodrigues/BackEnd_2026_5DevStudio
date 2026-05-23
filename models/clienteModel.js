import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  telefono: String,
  direccion: String,
  activo: {
    type: Boolean,
    default: true,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  ultimaCompra: Date,
  saldoCuentaCorriente: {
    type: Number,
    default: 0,
    min: 0,
  },
  notas: String,
}, { timestamps: true });

clienteSchema.virtual("deudaActual").get(function () {
  return this.saldoCuentaCorriente;
});

clienteSchema.virtual("movimientos", {
  ref: "Movimiento",
  localField: "_id",
  foreignField: "cliente",
});

clienteSchema.set("toObject", { virtuals: true });
clienteSchema.set("toJSON", { virtuals: true });

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;
