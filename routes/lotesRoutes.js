import express from "express";
import * as lotesController from "../controllers/lotesController.js";

const router = express.Router();

router.get("/vista", lotesController.vistaLotes);
router.get("/vista/:id", lotesController.vistaLote);
router.get("/", lotesController.getLotes);
router.get("/:id", lotesController.getLote);
router.post("/", lotesController.crearLote);
router.patch("/:id", lotesController.actualizarLote);
router.delete("/:id", lotesController.eliminarLote);

export default router;
