import crypto from "crypto";
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
        const usuario = await Usuario.findOne({email}); //busca el usuario por email

        if (!usuario || !usuario.validarPassword(password)){
            return res.render("login", {
                error: "Email o Contraseña incorrectos" //verifica que las credenciales sean válidas
            });
        }

        const sesionToken = crypto.randomBytes(32).toString("hex");
        usuario.sesionToken = sesionToken; // asocia el token al usuario
        await Usuario.findByIdAndUpdate(
            usuario._id,
            { sesionToken }
        );
        const actualizado = await Usuario.findById(usuario._id);
        console.log("DB REAL:", actualizado);
        res.cookie("sesion", sesionToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60
        });

        return res.redirect("/productos/vista");
        
    } catch (error) {
        res.render("login", {
            error: "Error al iniciar sesión"
        });
    }
};

const cerrarSesion = async (req, res) => {
  if (req.usuario) { // Verifica que exista un usuario autenticado.

    req.usuario.sesionToken = null; // Invalida la sesión en la base de datos.
    await req.usuario.save(); // Guarda el cambio.
  }

  res.clearCookie("sesion"); // Elimina la cookie del navegador.
  res.redirect("/login"); // Redirige al formulario de login.
};

export {
    mostrarLogin,
    mostrarRegistro,
    registrarUsuario,
    iniciarSesion,
    cerrarSesion
};