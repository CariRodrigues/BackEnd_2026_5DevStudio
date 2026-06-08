import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { conectarDB } from "./config/db.js";

import productosRoutes from "./routes/productosRoutes.js";
import proveedoresRoutes from "./routes/proveedoresRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import lotesRoutes from "./routes/lotesRoutes.js";
import movimientosRoutes from "./routes/movimientosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import comprasRoutes from "./routes/comprasRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

try {
    await conectarDB();
} catch(error) {
    console.error("Error al iniciar:", error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/clientes", clientesRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/auth", authRoutes);
app.use("/lotes", lotesRoutes);
app.use("/movimientos", movimientosRoutes);
app.use("/compras", comprasRoutes);
app.use("/ventas", ventasRoutes);

app.use((req, res) => {
  res.redirect("/auth/login");
});


app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});