import Usuario from "../models/usuarioModel.js";

async function crearDefaultUsers() {
  console.log("Intentando crear usuarios por defecto...");

  try {
    const admin = await Usuario.findOne({
      username: "admin",
    });

    console.log("Admin encontrado:", admin);

    if (!admin) {
      await Usuario.create({
        username: "admin",
        password: "1234",
        rol: "admin",
      });

      console.log("Admin creado");
    }

    const user = await Usuario.findOne({
      username: "user",
    });

    console.log("User encontrado:", user);

    if (!user) {
      await Usuario.create({
        username: "user",
        password: "1234",
        rol: "user",
      });

      console.log("Usuario creado");
    }
  } catch (error) {
    console.error("Error creando usuarios:", error);
  }
}

export default crearDefaultUsers;
