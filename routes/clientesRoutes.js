import express from "express";
import * as clientesController from "../controllers/clientesController.js";
const router = express.Router();


router.get("/", clientesController.getClientes);
router.get("/vista", clientesController.vistaClientes);
router.get("/vista/:id", clientesController.vistaCliente);
router.get("/nuevo", clientesController.formularioNuevoCliente);
router.get("/:id", clientesController.verCliente);
router.post("/", clientesController.crearCliente);
router.put("/:id", clientesController.actualizarCliente);
router.delete("/:id", clientesController.eliminarCliente);

export default router;
