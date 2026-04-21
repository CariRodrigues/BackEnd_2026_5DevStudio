const express = require("express");
const router = express.Router();

const {
  getProveedores,
  verProveedor,
  crearProveedor,
  eliminarProveedor,
  actualizarProveedor,
  vistaProveedores,
  vistaProveedor,
  formularioNuevoProveedor
} = require("../controllers/proveedoresController");

router.get("/", getProveedores);
router.get("/vista", vistaProveedores);
router.get("/vista/:id", vistaProveedor);
router.get("/nuevo", formularioNuevoProveedor);
router.get("/:id", verProveedor);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", eliminarProveedor);

module.exports = router;
