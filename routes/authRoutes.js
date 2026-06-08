import express from "express";
import {
    iniciarSesion,
    mostrarLogin,
    mostrarRegistro,
    registrarUsuario
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", mostrarLogin);
router.post("/login", iniciarSesion);

router.get("/registro", mostrarRegistro);
router.post("/registro", registrarUsuario);

export default router;