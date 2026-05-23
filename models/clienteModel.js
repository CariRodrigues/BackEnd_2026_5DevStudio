import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.UUID,
      default: mongoose.Types.UUID,
      unique: true,
    },
    cuit: {
      type: String,
      required: true,
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
    observaciones: String,
  },
  {
    timestamps: true,
  },
);

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;
