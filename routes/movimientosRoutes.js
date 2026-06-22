import express from "express";
import * as movimientosController from "../controllers/movimientosController.js";
import { protegerRuta, soloAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vista", protegerRuta, movimientosController.vistaMovimientos);
router.get("/", protegerRuta, movimientosController.getMovimientos);
router.get("/:id", protegerRuta, movimientosController.getMovimiento);

export default router;
