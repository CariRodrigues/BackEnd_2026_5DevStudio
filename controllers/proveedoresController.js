const fs = require("fs");
const path = require("path");
const Proveedor = require("../models/proveedor");
const rutaArchivo = path.join(__dirname, "../data/proveedores.json");

const leerProveedores = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

const guardarProveedores = (proveedores) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(proveedores, null, 2));
};

function getProveedores(req, res) {
  const proveedores = leerProveedores();
  res.json(proveedores);
}

function getProveedor(id) {
  const proveedores = leerProveedores();
  const proveedor = proveedores.find((p) => p.id === id);
  if (!proveedor) {
    return res.status(404).json({
      mensaje: "Proveedor inexistente",
    });
  }
  return proveedor;
}

function verProveedor(req, res) {
  const proveedores = leerProveedores();
  const id = parseInt(req.params.id);
  console.log(id);
  proveedor = getProveedor(id);
  console.log(proveedor);
  res.json(proveedor);
}

function crearProveedor(req, res) {
  const { cuit, nombre, domicilio, telefono, email, rubro, plazoEntrega, activo, observaciones } = req.body;

  if (!cuit || !nombre || !domicilio || !telefono || !email || !rubro || !plazoEntrega || activo === undefined) {
    return res.json({ error: "Faltan datos" });
  }

  const proveedores = leerProveedores();

  const nuevoProveedor = new Proveedor(
    proveedores.length + 1,
    cuit,
    nombre,
    domicilio,
    telefono,
    email,
    rubro,
    parseInt(plazoEntrega),
    activo === "true" || activo === true,
    observaciones || ""
  );

  proveedores.push(nuevoProveedor);

  guardarProveedores(proveedores);

  res.status(201).json({
    mensaje: "Proveedor creado correctamente",
    proveedor: nuevoProveedor,
  });
}

function eliminarProveedor(req, res) {
  const id = parseInt(req.params.id);
  const proveedores = leerProveedores();

  const nuevosProveedores = proveedores.filter((p) => p.id !== id);
  if (proveedores.length === nuevosProveedores.length) {
    return res.status(404).json({
      mensaje: "Proveedor inexistente",
    });
  }

  guardarProveedores(nuevosProveedores);

  res.json({
    mensaje: "Proveedor eliminado",
  });
}

function actualizarProveedor(req, res) {
  const id = parseInt(req.params.id);
  const { cuit, nombre, domicilio, telefono, email, rubro, plazoEntrega, activo, observaciones } = req.body;
  const proveedores = leerProveedores();

  const proveedor = proveedores.find((p) => p.id === id);

  if (!proveedor) {
    return res.status(404).json({
      mensaje: "Proveedor inexistente",
    });
  }

  if (cuit !== undefined) {
    proveedor.cuit = cuit;
  }

  if (nombre !== undefined) {
    proveedor.nombre = nombre;
  }

  if (domicilio !== undefined) {
    proveedor.domicilio = domicilio;
  }

  if (telefono !== undefined) {
    proveedor.telefono = telefono;
  }

  if (email !== undefined) {
    proveedor.email = email;
  }

  if (rubro !== undefined) {
    proveedor.rubro = rubro;
  }

  if (plazoEntrega !== undefined) {
    proveedor.plazoEntrega = parseInt(plazoEntrega);
  }

  if (activo !== undefined) {
    proveedor.activo = activo === "true" || activo === true;
  }

  if (observaciones !== undefined) {
    proveedor.observaciones = observaciones;
  }

  guardarProveedores(proveedores);

  res.json({
    mensaje: "Proveedor actualizado",
    proveedor: proveedor,
  });
}

function vistaProveedores(req, res) {
  const proveedores = leerProveedores();
  res.render("indexProveedores", { proveedores });
}

function vistaProveedor(req, res) {
  const proveedores = leerProveedores();
  const id = parseInt(req.params.id);
  proveedor = getProveedor(id);
  res.render("detailProveedor", { proveedor: proveedor });
}

function formularioNuevoProveedor(req, res) {
  res.render("nuevoProveedor");
}

module.exports = {
  getProveedores,
  verProveedor,
  crearProveedor,
  eliminarProveedor,
  actualizarProveedor,
  vistaProveedores,
  vistaProveedor,
  formularioNuevoProveedor
};
