const express = require("express");
const router = express.Router();

const {
  getProductos,
  verProducto,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
} = require("../controllers/productosController");

router.get("/", getProductos);
router.get("/:id", verProducto);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
