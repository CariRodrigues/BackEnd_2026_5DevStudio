import express from "express";
import * as proveedoresController from "../controllers/proveedoresController.js";
import { protegerRuta, soloAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.get("/", protegerRuta, proveedoresController.getProveedores);
router.get("/vista", protegerRuta, proveedoresController.vistaProveedores);
router.get("/vista/:id", protegerRuta, proveedoresController.vistaProveedor);
router.get("/nuevo", protegerRuta, soloAdmin, proveedoresController.formularioNuevoProveedor);
router.get("/editar/:id", protegerRuta, soloAdmin, proveedoresController.formularioEditarProveedor);
router.get("/:id", protegerRuta, proveedoresController.verProveedor);
router.post("/", protegerRuta, soloAdmin, proveedoresController.crearProveedor);
router.post("/:id/editar", protegerRuta, soloAdmin, proveedoresController.actualizarProveedor);
router.put("/:id", protegerRuta, soloAdmin, proveedoresController.actualizarProveedor);
router.delete("/:id", protegerRuta, soloAdmin, proveedoresController.eliminarProveedor);

export default router;
