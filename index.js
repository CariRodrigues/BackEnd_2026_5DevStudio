import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { conectarDB } from "./config/db.js";

import productosRoutes from "./routes/productosRoutes.js";
import proveedoresRoutes from "./routes/proveedoresRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

conectarDB();
console.log(productosRoutes);
console.log(proveedoresRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);

app.use((req, res) => {
  res.redirect("/productos/vista");
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});