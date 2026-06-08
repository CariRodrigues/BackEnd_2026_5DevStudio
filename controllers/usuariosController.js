import Usuario from "../models/usuarioModel.js";
import Proveedor from "../models/proveedorModel.js";

async function crearUsuario(req, res) {
    const {username, password, rol} = req.body;
    if(!username || !password || !rol){
        return res.render("nuevoUsuario", {
            mensaje: "Faltan datos"
        });
    }
    try{
        await Usuario.create({
            username,
            password,
            rol
        });
        res.render("nuevoUsuario", {
            mensaje: "Usuario creado correctamente"
        });
    }catch(error){
        res.render("nuevoUsuario", {
            mensaje: "Error al crear usuario"
        });
    }
}
/* APARENTEMENTE SIN USO
async function buscarUsuario(req, res) {
    const {username, password} = req.body;
    try{
        const usuario = await Usuario.findOne({username});
        if(!usuario){
            return res.status(404).json({ error: "Usuario no encontrado" });
        }if(usuario.password !== password){
            return res.status(401).json({error: "Contraseña incorrecta"});
        }if(usuario.rol === 'admin'){
                return res.redirect('/usuarios/admin'); 
        }if(usuario.rol === 'user'){
                return res.redirect('/usuarios/user'); 
        }
    }catch(error){
        res.status(500).json({
        error: "Error al loguearse"
        });
    }
}

function formularioLogin(req, res){
    res.render("login");
}*/
function vistaAdmin(req, res){
    res.render("adminDashboard", {esAdmin : true});
}
function vistaUsuario(req, res){
    res.render("userDashboard", {esAdmin: false});
}

function formularioNuevoUsuario(req,res){
    res.render("nuevoUsuario")
}

export {
    crearUsuario,
   // buscarUsuario, 
   // formularioLogin,
    formularioNuevoUsuario,
    vistaAdmin,
    vistaUsuario
}