import express from "express";
import * as ventasController from "../controllers/ventasController.js";

const router = express.Router();

router.get("/vista", ventasController.vistaVentas);
router.get("/nuevo", ventasController.formularioNuevaVenta);
router.get("/", ventasController.getVentas);
router.get("/:id", ventasController.getVenta);
router.post("/", ventasController.crearVenta);

export default router;
