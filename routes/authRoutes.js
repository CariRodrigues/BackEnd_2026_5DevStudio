import express from "express";
import {
    iniciarSesion,
    mostrarLogin,
    mostrarRegistro,
    registrarUsuario,
    cerrarSesion
} from "../controllers/authController.js";
import {protegerRuta, soloAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/login", mostrarLogin);
router.post("/login", iniciarSesion);

router.get("/registro", protegerRuta, soloAdmin, mostrarRegistro);
router.post("/registro", protegerRuta, soloAdmin, registrarUsuario);

router.post("/logout", protegerRuta, cerrarSesion);

export default router;