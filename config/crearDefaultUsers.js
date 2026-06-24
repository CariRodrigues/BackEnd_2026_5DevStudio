import Usuario from "../models/usuarioModel.js";

async function crearDefaultUsers() {
  console.log("Intentando crear usuarios por defecto...");

  try {
    const admin = await Usuario.findOne({
      email: "admin@todostock.com",
    });

    console.log("Admin encontrado:", admin);

    if (!admin) {
      const { salt, passwordHash } =
        Usuario.crearPasswordSeguro("1234");

      await Usuario.create({
        nombre: "Administrador",
        email: "admin@todostock.com",
        passwordHash,
        salt,
        rol: "admin"
      });

      console.log("Admin creado");
    }

    const user = await Usuario.findOne({
      email: "user@todostock.com",
    });

    console.log("User encontrado:", user);

    if (!user) {
      const { salt, passwordHash } =
        Usuario.crearPasswordSeguro("1234");

      await Usuario.create({
        nombre: "Usuario",
        email: "user@todostock.com",
        passwordHash,
        salt,
        rol: "user"
      });

      console.log("Usuario creado");
    }
  } catch (error) {
    console.error("Error creando usuarios:", error);
  }
}

export default crearDefaultUsers;
