import { render } from "pug";
import Usuario from "../models/usuarioModel.js";

const mostrarLogin = (req, res) => {
    res.render("login", {
        error: null
    });
};

const mostrarRegistro = (req, res) => {
    res.render("registro", {
        error: null
    });
};

const registrarUsuario = async (req, res) => {
    try {
        const {nombre, email, password} = req.body;

        if (!nombre || !email || !password) {
            return res.render("registro", {
                error: "Todos los campos son obligatorios"
            });
        }

        const usuarioExiste = await Usuario.findOne({email});

        if (usuarioExiste){
            return res.render("registro", {
                error: "El mail ingresado ya se encuentra registrado"
            });
        }

        const { salt, passwordHash } = Usuario.crearPasswordSeguro(password);

        await Usuario.create({
            nombre,
            email,
            passwordHash,
            salt
        });
        res.redirect("/login");
    } catch (error) {
      res.render("registro", {
        error: "Error al registrar usuario"
      });
    }
};

const iniciarSesion = async (req, res) => {
    try {
        const {email, password} = req.body;
        const usuario = await Usuario.findOne({email});

        if (!usuario || !usuario.validarPassword(password)){
            return res.render("login", {
                error: "Email o Contraseña incorrectos"
            });
        }

        res.render("userDashboard");
    } catch (error) {
        res.render("login", {
            error: "Error al iniciar sesión"
        });
    }
};

export {
    mostrarLogin,
    mostrarRegistro,
    registrarUsuario,
    iniciarSesion
};