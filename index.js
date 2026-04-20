require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const productosRoutes = require("./routes/productosRoutes");

const productosRoutes = require('./routes/productosRoutes.js');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/productos", productosRoutes);

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
