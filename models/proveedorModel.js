import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    cuit:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    domicilio: String,
    telefono: String,
    email: String,
    rubro: String,
    plazoEntrega: Number,
    activo: Boolean,
    observaciones: String
});

const Proveedor = mongoose.model("Proveedor", proveedorSchema);

export default Proveedor;