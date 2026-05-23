import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.UUID,
      default: () => new mongoose.Types.UUID(),
    },
    cuit: {
      type: String,
      required: true,
    },
    condicionIVA: {
      type: String,
      enum: [
        "Consumidor Final",
        "Responsable Inscripto",
        "Monotributista",
        "Exento",
      ],
      default: "Consumidor Final",
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    domicilio: String,
    telefono: String,
    email: String,
    condicionIVA: String,
    observaciones: String,
  },
  {
    timestamps: true,
  },
);

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;
