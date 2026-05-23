import mongoose from "mongoose";

const usuarioScheema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type:String,
        enum: ['admin', 'user'], //valores permitidos
        required: true
    }
});

const Usuario = mongoose.model("Usuario", usuarioScheema);

export default Usuario;