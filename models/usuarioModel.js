import crypto from "crypto";
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type:String,
        required: true
    },
    rol: {
        type: String,
        default: "user"
    },
}, {
    timestamps: true
});
//método para validar contraseña al iniciar sesión
usuarioSchema.methods.validarPassword = function(password) {
   //genera nuevamente el hash usando
   // contraseña ingresada + salt guardado
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
        .toString("hex");
        //compara el hash generado con el hash guardado en la base de datos
    return this.passwordHash === hash; 
};

usuarioSchema.statics.crearPasswordSeguro = function(password){
     //genera un salt aleatorio de 16 bytes
    const salt = crypto.randomBytes(16).toString("hex");
    //genera el hash seguro de la contraseña
    const passwordHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex")
    //devuelve ambos valores para guardar en Mongo
    return {salt, passwordHash};
};

export default mongoose.model("Usuario", usuarioSchema);