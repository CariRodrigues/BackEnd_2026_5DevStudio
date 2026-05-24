import mongoose from "mongoose";
import crearDefaultUsers from "./crearDefaultUsers.js";

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado");

    // Crear usuarios por defecto
    await crearDefaultUsers();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};