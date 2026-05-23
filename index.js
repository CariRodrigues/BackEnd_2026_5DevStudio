import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { conectarDB } from "./config/db.js";

import productosRoutes from "./routes/productosRoutes.js";
import proveedoresRoutes from "./routes/proveedoresRoutes.js";
<<<<<<< HEAD
import usuariosRoutes from "./routes/usuariosRoutes.js"
=======
import usuariosRoutes from "./routes/usuariosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
>>>>>>> f234d1b66e6ef3b1db557268f192410ec5c79859

const app = express();

const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
conectarDB();
=======
try {
    await conectarDB();
} catch(error) {
    console.error("Error al iniciar:", error);
}

>>>>>>> f234d1b66e6ef3b1db557268f192410ec5c79859
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);
<<<<<<< HEAD
app.use("/usuarios", usuariosRoutes);

app.use((req, res) => {
  res.redirect("/productos/vista");
});
=======
app.use("/clientes", clientesRoutes);
app.use("/usuarios", usuariosRoutes);
>>>>>>> f234d1b66e6ef3b1db557268f192410ec5c79859

app.use((req, res) => {
  res.redirect("/productos/vista");
});
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});