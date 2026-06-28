import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";

import { conectarDB } from "./config/db.js";

import productosRoutes from "./routes/productosRoutes.js";
import proveedoresRoutes from "./routes/proveedoresRoutes.js";
import lotesRoutes from "./routes/lotesRoutes.js";
import movimientosRoutes from "./routes/movimientosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import comprasRoutes from "./routes/comprasRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protegerRuta } from "./middlewares/authMiddleware.js";
import dns from "node:dns";
import { consultarIA } from "./services/geminiService.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();

const server = http.createServer(app); // Se crea el servidor HTTP utilizando Express.
const io = new Server(server); // Socket.IO se conecta al mismo servidor HTTP.

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
app.use("/auth", authRoutes);
app.get("/chat", protegerRuta, (req, res) => {
  res.render("chat");
});
app.use("/lotes", lotesRoutes);
app.use("/movimientos", movimientosRoutes);
app.use("/compras", comprasRoutes);
app.use("/ventas", ventasRoutes);

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.use((req, res) => {
  res.redirect("/auth/login");
});

// =======================
// WebSocket
// =======================

// Se ejecuta cada vez que un cliente se conecta mediante Socket.IO.
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("mensaje", async (mensaje) => {
    if (
      !mensaje ||
      typeof mensaje.texto !== "string" ||
      mensaje.texto.trim() === "" ||
      mensaje.texto.trim().length > 500
    ) {
      return;
    }

    io.emit("mensaje", mensaje);

    const texto = mensaje.texto.trim();
    if (texto.toLowerCase().startsWith("@gemini")) {
      const respuesta = await consultarIA(texto);
      io.emit("mensaje", {
        usuario: "Gemini",
        texto: respuesta,
      });
    }
  });
  // Se ejecuta cuando el usuario cierra la conexión.
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
