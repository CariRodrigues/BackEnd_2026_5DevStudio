import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { conectarDB } from "./config/db.js";

import productosRoutes from "./routes/productosRoutes.js";
import proveedoresRoutes from "./routes/proveedoresRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js"
import clientesRoutes from "./routes/clientesRoutes.js";


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

app.use((req, res) => {
  res.redirect("/usuarios/login");
});


app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});