import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion: String,
    precio:{
        type: Number,
        required:true
    },
    marca: String,
    proveedorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proveedor",
    }
    ,
    eliminado: {
        type: Boolean,
        default: false
    }
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;