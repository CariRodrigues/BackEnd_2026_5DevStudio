import express from "express";
import * as usuariosController from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/", usuariosController.crearUsuario);
router.get("/login", usuariosController.formularioLogin);
router.post("/login", usuariosController.buscarUsuario);


export default router;