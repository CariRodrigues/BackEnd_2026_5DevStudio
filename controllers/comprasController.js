import Compra from "../models/compraModel.js";
import Producto from "../models/productoModel.js";
import Proveedor from "../models/proveedorModel.js";
import Lote from "../models/loteModel.js";
import Movimiento from "../models/movimientoModel.js";

async function getCompras(req, res) {
  try {
    const compras = await Compra.find().populate(["proveedor", "producto", "lote"]);
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener compras" });
  }
}

async function getCompra(req, res) {
  try {
    const compra = await Compra.findById(req.params.id).populate(["proveedor", "producto", "lote"]);
    if (!compra) return res.status(404).json({ error: "Compra no encontrada" });
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar compra" });
  }
}

async function crearCompra(req, res) {
  const { proveedorId, productoId, cantidad, precioCompra, fecha, fechaVencimiento, observacion } = req.body;
  let codigoLote = req.body.codigoLote?.trim();

  if (!proveedorId || !productoId || !cantidad || !precioCompra || !fechaVencimiento) {
    return res.json({ error: "Faltan datos" });
  }

  try {
    if (!codigoLote) {
      do {
        codigoLote = `LT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      } while (await Lote.findOne({ codigoLote }));
    }

    const lote = await Lote.create({
      producto: productoId,
      proveedor: proveedorId,
      codigoLote,
      fechaIngreso: fecha ? new Date(fecha) : new Date(),
      fechaVencimiento: new Date(fechaVencimiento),
      cantidadDisponible: cantidad,
      cantidadInicial: cantidad,
    });

    const compra = await Compra.create({
      proveedor: proveedorId,
      producto: productoId,
      lote: lote.id,
      cantidad,
      precioCompra,
      fecha: fecha ? new Date(fecha) : new Date(),
      observacion,
    });

    await Movimiento.create({
      tipo: "entrada",
      producto: productoId,
      lote: lote.id,
      cantidad,
      observacion,
      detalles: { clienteNombre: "TodoStock S.A." },
    });

    res.status(201).redirect("/compras/vista");
  } catch (error) {
    res.status(500).json({ error: "Error al registrar compra" });
  }
}

async function vistaCompras(req, res) {
  try {
    const compras = await Compra.find().populate(["proveedor", "producto", "lote"]);
    res.render("indexCompras", { compras });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar compras" });
  }
}

async function formularioNuevaCompra(req, res) {
  try {
    const proveedores = await Proveedor.find();
    const productos = await Producto.find();
    res.render("nuevoCompra", { proveedores, productos });
  } catch (error) {
    res.status(500).json({ error: "Error al cargar formulario" });
  }
}

export { getCompras, getCompra, crearCompra, vistaCompras, formularioNuevaCompra };
