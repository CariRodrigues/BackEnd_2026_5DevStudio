import express from "express";
import * as proveedoresController from "../controllers/proveedoresController.js";
const router = express.Router();


router.get("/", proveedoresController.getProveedores);
router.get("/vista", proveedoresController.vistaProveedores);
router.get("/vista/:id", proveedoresController.vistaProveedor);
router.get("/nuevo", proveedoresController.formularioNuevoProveedor);
router.get("/:id", proveedoresController.verProveedor);
router.post("/", proveedoresController.crearProveedor);
router.put("/:id", proveedoresController.actualizarProveedor);
router.delete("/:id", proveedoresController.eliminarProveedor);

export default router;
