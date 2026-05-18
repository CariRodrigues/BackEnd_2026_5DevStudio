import express from "express";
import * as productosController from "../controllers/productosController.js";
const router = express.Router();

router.get("/vista", productosController.vistaProductos);
router.get("/vista/:id", productosController.vistaProducto);
router.get("/nuevo", productosController.formularioNuevoProducto);
router.get("/", productosController.getProductos);
router.get("/:id", productosController.verProducto);
router.post("/", productosController.crearProducto);
router.put("/:id", productosController.actualizarProducto);
router.delete("/:id", productosController.eliminarProducto);

export default router;
