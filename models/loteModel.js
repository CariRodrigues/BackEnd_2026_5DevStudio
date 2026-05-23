import mongoose from "mongoose";

const loteSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor",
    required: true,
  },
  codigoLote: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  fechaVencimiento: {
    type: Date,
    required: true,
  },
  cantidadDisponible: {
    type: Number,
    required: true,
    min: [0, "Cantidad disponible no puede ser negativa"],
  },
  cantidadInicial: {
    type: Number,
    required: true,
    min: [0, "Cantidad inicial no puede ser negativa"],
  },
  estado: {
    type: String,
    enum: ["activo", "agotado", "vencido"],
    default: "activo",
  },
}, { timestamps: true });

loteSchema.pre("validate", function () {
  if (this.fechaVencimiento < new Date()) {
    throw new Error("La fecha de vencimiento no puede ser anterior a la fecha actual");
  }

  if (this.cantidadDisponible < 0 || this.cantidadInicial < 0) {
    throw new Error("No se permiten cantidades negativas");
  }

  if (this.cantidadDisponible > this.cantidadInicial) {
    this.cantidadInicial = this.cantidadDisponible;
  }
});

loteSchema.pre("save", function () {
  if (this.cantidadDisponible <= 0) {
    this.estado = "agotado";
  } else if (this.fechaVencimiento < new Date()) {
    this.estado = "vencido";
  } else {
    this.estado = "activo";
  }
});

const Lote = mongoose.model("Lote", loteSchema);

export default Lote;
