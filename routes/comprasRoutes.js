import express from "express";
import * as comprasController from "../controllers/comprasController.js";

const router = express.Router();

router.get("/vista", comprasController.vistaCompras);
router.get("/nuevo", comprasController.formularioNuevaCompra);
router.get("/", comprasController.getCompras);
router.get("/:id", comprasController.getCompra);
router.post("/", comprasController.crearCompra);

export default router;
