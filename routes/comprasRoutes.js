import express from "express";
import * as comprasController from "../controllers/comprasController.js";
import { protegerRuta, soloAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vista", protegerRuta, soloAdmin, comprasController.vistaCompras);
router.get("/nuevo", protegerRuta, soloAdmin, comprasController.formularioNuevaCompra);
router.get("/", protegerRuta, soloAdmin, comprasController.getCompras);
router.get("/:id", protegerRuta, soloAdmin, comprasController.getCompra);
router.post("/", protegerRuta, soloAdmin, comprasController.crearCompra);

export default router;
