import Usuario from "../models/usuarioModel.js";
import jwt from "jsonwebtoken";
import { verificarToken } from "../utils/jwt.js";

const leerCookies = (req) => {
    const header = req.headers.cookie; //obtiene todas las cookies enviadas por el navegador

    if (!header) {
        return {}; //si no hay cookies devuelve un objeto vacío
    }
    // las cookies llegan como un texto y necesitamos convertirlas a objeto Javascript
    // para poder acceder facil a ellas
    return header.split(";").reduce((cookies, cookie) =>{
        const [nombre, valor] = cookie.trim().split("="); //separa nombre y valor de cada cookie
        cookies[nombre] = decodeURIComponent(valor); //guarda la cookie dentro del objeto
        return cookies;
    }, {});
};

const protegerRuta = async (req, res, next) => { //middleware que protege rutas privadas
    const cookies = leerCookies(req);
    const token = cookies.token;

    if(!token){
        return res.redirect("/auth/login"); //si no hay token, redirige al login
    }

    let datosToken;

    try {
        datosToken = verificarToken(token);
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/auth/login");
    }

    const usuario = await Usuario.findById(datosToken.id);

    if (!usuario) {
        res.clearCookie("token");
        return res.redirect("/auth/login");
    }

    req.usuario = usuario; //guarda el usuario autenticado en la petición
    res.locals.usuario = usuario;
    next(); //permite continuar hacia la ruta solicitada
};

const soloAdmin = (req, res, next) => {
    if (req.usuario.rol !== "admin"){
        return res.status(403).render("accesoDenegado");
    }
    
    next();
}

export {protegerRuta, soloAdmin};