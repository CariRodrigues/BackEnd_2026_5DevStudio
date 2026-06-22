import Usuario from "../models/usuarioModel.js";

async function crearDefaultUsers() {
  console.log("Intentando crear usuarios por defecto...");

  try {
    const admin = await Usuario.findOne({
      email: "admin@todostock.com"
    });

    console.log("Admin encontrado:", admin.email);

    if (!admin) {
      const { salt, passwordHash } = Usuario.crearPasswordSeguro("admin123");
      await Usuario.create({
        nombre: "Admin",
        email: "admin@todostock.com",
        passwordHash,
        salt,
        rol: "admin",
      });

      console.log("Admin creado: admin@todostock.com");
    }

    const user = await Usuario.findOne({
      email: "user@todostock.com",
    });

    console.log("User encontrado:", user.email);

    if (!user) {
      const { salt, passwordHash } = Usuario.crearPasswordSeguro("user123");
      await Usuario.create({
        nombre: "Usuario",
        email: "user@todostock.com",
        passwordHash: passwordHash,
        salt: salt,
        rol: "user",
      });

      console.log("Usuario creado: user@todostock.com");
    }
  } catch (error) {
    console.error("Error creando usuarios:", error);
  }
}

export default crearDefaultUsers;
