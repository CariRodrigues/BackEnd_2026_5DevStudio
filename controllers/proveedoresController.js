import Proveedor from "../models/proveedorModel.js";

async function getProveedores(req, res) {
  try {
    const proveedores =  await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({
      error:"Error al obtener proveedores"
    });
  }
}

async function getProveedor(id) {
  return await Proveedor.findById(id);
}

async function verProveedor(req, res) {
  const id = req.params.id;
  try{
    const proveedor = await Proveedor.findById(id);

    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar proveedor"
    });
  }  
}

async function crearProveedor(req, res) {
  const { cuit, nombre, domicilio, telefono, email, rubro, plazoEntrega, activo, observaciones } = req.body;
  const activoBool = activo === "on" || activo === true || activo === "true";

  if (!cuit || !nombre || !domicilio || !telefono || !email || !rubro || !plazoEntrega || activo === undefined) {
    return res.json({ error: "Faltan datos" });
  }
  const nuevoProveedor = await Proveedor.create({
    cuit,
    nombre,
    domicilio,
    telefono,
    email,
    rubro,
    plazoEntrega,
    activo: activoBool,
    observaciones
  });
  
  res.status(201).json({
    mensaje: "Proveedor creado correctamente",
    proveedor: nuevoProveedor,
  });
}


async function eliminarProveedor(req, res) {
  try{
    const {id} = req.params;
    const proveedorEliminado = await Proveedor.findByIdAndDelete(id);
    if(!proveedorEliminado){
      return res.status(404).json({mensaje: "El proveedor que intenta eliminar no existe."})
    };
    res.status(200).json(proveedorEliminado);
  } catch(error){
    res.status(500).json({mensaje: "Error al eliminar", error});
  } 
}


async function actualizarProveedor(req, res) {
  try{
    const {id} = req.params;
    const nuevosDatos = req.body;
    // Si estamos actualizando desde el formulario de edición, el checkbox "activo"
    // se envía solo cuando está marcado. Si no viene en el body, significa que el
    // usuario lo desmarcó y debemos guardar `activo: false`.
    if (req.method === "POST" && req.originalUrl.includes("/editar")) {
      if (!Object.prototype.hasOwnProperty.call(req.body, "activo")) {
        nuevosDatos.activo = false;
      } else {
        nuevosDatos.activo = nuevosDatos.activo === "on" || nuevosDatos.activo === true || nuevosDatos.activo === "true";
      }
    } else if (nuevosDatos.activo !== undefined) {
      // En otras actualizaciones vía API convertimos el valor a booleano.
      nuevosDatos.activo = nuevosDatos.activo === "on" || nuevosDatos.activo === true || nuevosDatos.activo === "true";
    }
    
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      id,
      { $set: nuevosDatos },
      { new: true, runValidators: true }
    );
    if (!proveedorActualizado) {
        return res.status(404).json({
        mensaje: "Proveedor inexistente",
      });
    }

    if (req.method === "POST" && req.originalUrl.includes("/editar")) {
      return res.redirect(`/proveedores/vista?mensaje=Proveedor actualizado correctamente`);
    }

    res.status(200).json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({mensaje: "Error al actualizar", error});
  }
}  


async function vistaProveedores(req, res) {
  const proveedores = await Proveedor.find()
  const mensaje = req.query.mensaje;
  res.render("indexProveedores", { proveedores, mensaje });
}

async function vistaProveedor(req, res) {
  const id = req.params.id;
  try {
    const proveedor = await Proveedor.findById(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.render("detailProveedor", { proveedor });
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar proveedor"
    });
  }
}

async function formularioEditarProveedor(req, res) {
  const id = req.params.id;
  try {
    const proveedor = await Proveedor.findById(id);
    if (!proveedor) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    }
    res.render("editarProveedor", { proveedor });
  } catch (error) {
    res.status(500).json({
      error: "Error al cargar formulario de edición"
    });
  }
}

function formularioNuevoProveedor(req, res) {
  res.render("nuevoProveedor");
}

export {
  getProveedores,
  verProveedor,
  crearProveedor,
  eliminarProveedor,
  actualizarProveedor,
  vistaProveedores,
  vistaProveedor,
  formularioNuevoProveedor,
  formularioEditarProveedor,
};
