import jwt from "jsonwebtoken";

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      email: usuario.email,
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generarToken, verificarToken };