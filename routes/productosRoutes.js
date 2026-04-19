const express = require("express");
const router = express.Router();

const {
  getProductos,
  verProducto,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
  vistaProductos,
  vistaProducto,
  formularioNuevoProducto
} = require("../controllers/productosController");

router.get("/", getProductos);
router.get("/vista", vistaProductos);
router.get("/vista/:id", vistaProducto);
router.get("/nuevo", formularioNuevoProducto);
router.get("/:id", verProducto);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
