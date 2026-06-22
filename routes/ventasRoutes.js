import express from "express";
import * as ventasController from "../controllers/ventasController.js";
import { protegerRuta, soloAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vista", protegerRuta, ventasController.vistaVentas);
router.get("/nuevo", protegerRuta, ventasController.formularioNuevaVenta);
router.get("/", protegerRuta, ventasController.getVentas);
router.get("/:id", protegerRuta, ventasController.getVenta);
router.post("/", protegerRuta, ventasController.crearVenta);

export default router;
