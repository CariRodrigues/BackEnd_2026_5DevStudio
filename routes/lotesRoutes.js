import express from "express";
import * as lotesController from "../controllers/lotesController.js";
import { protegerRuta, soloAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vista", protegerRuta, lotesController.vistaLotes);
router.get("/vista/:id", protegerRuta, lotesController.vistaLote);
router.get("/", protegerRuta, lotesController.getLotes);
router.get("/:id", protegerRuta, lotesController.getLote);
router.post("/", protegerRuta, soloAdmin, lotesController.crearLote);
router.patch("/:id", protegerRuta, soloAdmin, lotesController.actualizarLote);
router.delete("/:id", protegerRuta, soloAdmin, lotesController.eliminarLote);

export default router;
