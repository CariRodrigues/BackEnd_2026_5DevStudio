import express from "express";
import * as movimientosController from "../controllers/movimientosController.js";

const router = express.Router();

router.get("/vista", movimientosController.vistaMovimientos);
router.get("/", movimientosController.getMovimientos);
router.get("/:id", movimientosController.getMovimiento);

export default router;
