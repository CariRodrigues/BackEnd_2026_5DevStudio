import express from "express";
import * as clientesController from "../controllers/clientesController.js";
import { protegerRuta, soloAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vista", protegerRuta, clientesController.vistaClientes);
router.get("/vista/:id/movimientos", protegerRuta, clientesController.vistaMovimientosCliente);
router.get("/vista/:id", protegerRuta, clientesController.vistaCliente);
router.get("/nuevo", protegerRuta, clientesController.formularioNuevoCliente);
router.get("/editar/:id", protegerRuta, clientesController.formularioEditarCliente);
router.get("/", protegerRuta, clientesController.getClientes);
router.get("/:id/movimientos", protegerRuta, clientesController.getMovimientosCliente);
router.get("/:id", protegerRuta, clientesController.getCliente);
router.post("/", protegerRuta, clientesController.crearCliente);
router.post("/:id/editar", protegerRuta, clientesController.actualizarCliente);
router.put("/:id", protegerRuta, clientesController.actualizarCliente);
router.delete("/:id", protegerRuta, soloAdmin, clientesController.eliminarCliente);

export default router;
