import Venta from "../models/ventaModel.js";
import Producto from "../models/productoModel.js";
import Cliente from "../models/clienteModel.js";
import Lote from "../models/loteModel.js";
import Movimiento from "../models/movimientoModel.js";

async function getVentas(req, res) {
  try {
    const ventas = await Venta.find().populate(["cliente", "producto"]);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ventas" });
  }
}

async function getVenta(req, res) {
  try {
    const venta = await Venta.findById(req.params.id).populate(["cliente", "producto"]);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar venta" });
  }
}

async function crearVenta(req, res) {
  const { clienteId, productoId, cantidad, precioVenta, fecha, observacion } = req.body;
  if (!clienteId || !productoId || !cantidad || !precioVenta) {
    return res.json({ error: "Faltan datos" });
  }

  try {
    const lotes = await Lote.find({ producto: productoId, cantidadDisponible: { $gt: 0 } }).sort({ fechaVencimiento: 1 });
    const totalDisponible = lotes.reduce((sum, l) => sum + l.cantidadDisponible, 0);
    if (cantidad > totalDisponible) return res.status(400).json({ error: "Stock insuficiente" });

    let restante = cantidad;
    let primerLoteId = null;
    let primerCodigoLote = null;
    for (const lote of lotes) {
      if (restante <= 0) break;
      if (!primerLoteId) { primerLoteId = lote.id; primerCodigoLote = lote.codigoLote; }
      const consumido = Math.min(lote.cantidadDisponible, restante);
      lote.cantidadDisponible -= consumido;
      await lote.save();
      restante -= consumido;
    }

    await Cliente.findByIdAndUpdate(clienteId, {
      $inc: { saldoCuentaCorriente: precioVenta * cantidad },
      ultimaCompra: fecha ? new Date(fecha) : new Date(),
    });

    const venta = await Venta.create({
      cliente: clienteId,
      producto: productoId,
      cantidad,
      precioVenta,
      fecha: fecha ? new Date(fecha) : new Date(),
      observacion,
    });

    await Movimiento.create({ tipo: "salida", producto: productoId, lote: primerLoteId, cantidad, cliente: clienteId, observacion, detalles: { codigoLote: primerCodigoLote } });

    res.status(201).redirect("/ventas/vista");
  } catch (error) {
    res.status(500).json({ error: "Error al registrar venta" });
  }
}

async function vistaVentas(req, res) {
  try {
    const ventas = await Venta.find().populate(["cliente", "producto"]);
    res.render("indexVentas", { ventas });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar ventas" });
  }
}

async function formularioNuevaVenta(req, res) {
  try {
    const clientes = await Cliente.find();
    const productos = await Producto.find();
    const lotes = await Lote.find({ cantidadDisponible: { $gt: 0 } });
    const stockPorProducto = lotes.reduce((map, lote) => {
      const id = lote.producto.toString();
      map[id] = (map[id] || 0) + lote.cantidadDisponible;
      return map;
    }, {});
    const productosConStock = productos.map((p) => ({ ...p.toObject(), stock: stockPorProducto[p.id] || 0 }));
    res.render("nuevoVenta", { clientes, productos: productosConStock });
  } catch (error) {
    res.status(500).json({ error: "Error al cargar formulario" });
  }
}

export { getVentas, getVenta, crearVenta, vistaVentas, formularioNuevaVenta };
