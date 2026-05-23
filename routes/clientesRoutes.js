import express from "express";
import * as clientesController from "../controllers/clientesController.js";

const router = express.Router();

router.get("/vista", clientesController.vistaClientes);
router.get("/vista/:id/movimientos", clientesController.vistaMovimientosCliente);
router.get("/vista/:id", clientesController.vistaCliente);
router.get("/nuevo", clientesController.formularioNuevoCliente);
router.get("/editar/:id", clientesController.formularioEditarCliente);
router.get("/", clientesController.getClientes);
router.get("/:id/movimientos", clientesController.getMovimientosCliente);
router.get("/:id", clientesController.getCliente);
router.post("/", clientesController.crearCliente);
router.post("/:id/editar", clientesController.actualizarCliente);
router.put("/:id", clientesController.actualizarCliente);
router.delete("/:id", clientesController.eliminarCliente);

export default router;
