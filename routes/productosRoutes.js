import express from "express";
import * as productosController from "../controllers/productosController.js";
import { protegerRuta, soloAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/vista", protegerRuta, productosController.vistaProductos);
router.get("/vista/:id", protegerRuta, productosController.vistaProducto);
router.get("/nuevo", protegerRuta, soloAdmin, productosController.formularioNuevoProducto);
router.get("/editar/:id", protegerRuta, soloAdmin, productosController.formularioEditarProducto);
router.get("/", protegerRuta, productosController.getProductos);
router.get("/:id", protegerRuta, productosController.verProducto);
router.post("/", protegerRuta, soloAdmin, productosController.crearProducto);
router.post("/:id/editar", protegerRuta, soloAdmin, productosController.actualizarProducto);
router.put("/:id", protegerRuta, soloAdmin, productosController.actualizarProducto);
router.delete("/:id", protegerRuta, soloAdmin, productosController.eliminarProducto);

export default router;
