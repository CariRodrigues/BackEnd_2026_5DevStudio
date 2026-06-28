import { jest } from '@jest/globals';
import Compra from '../../models/compraModel.js';
import Lote from '../../models/loteModel.js';
import Movimiento from '../../models/movimientoModel.js';
import Producto from '../../models/productoModel.js';
import Proveedor from '../../models/proveedorModel.js';
import {
  crearCompra,
  getCompra,
  getCompras,
  vistaCompras,
} from "../../controllers/comprasController.js";

beforeEach(() => {
  Compra.find = jest.fn();
  Compra.findById = jest.fn();
  Compra.create = jest.fn();

  Lote.findOne = jest.fn();
  Lote.create = jest.fn();

  Movimiento.create = jest.fn();

  Producto.find = jest.fn();
  Proveedor.find = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});




describe("comprasController - crearCompra", () => {
  test("crea lote, compra y movimiento y redirige con 201", async () => {
    Lote.findOne.mockResolvedValue(null);
    Lote.create.mockResolvedValue({ id: "loteId", _id: "loteId" });
    Compra.create.mockResolvedValue({ id: "compraId" });
    Movimiento.create.mockResolvedValue({});

    const req = {
      body: {
        proveedorId: "prov1",
        productoId: "prod1",
        cantidad: 5,
        precioCompra: 10,
        fechaVencimiento: "2030-01-01",
      },
    };

    const redirect = jest.fn();
    const status = jest.fn().mockReturnValue({ redirect });
    const res = { status };

    await crearCompra(req, res);

    expect(Lote.create).toHaveBeenCalled();

    expect(Lote.create).toHaveBeenCalledWith(
      expect.objectContaining({
        producto: "prod1",
        proveedor: "prov1",
        cantidadDisponible: 5,
        cantidadInicial: 5,
        codigoLote: expect.stringMatching(/^LT-\d+-\d+$/),
      }),
    );

    expect(Compra.create).toHaveBeenCalledWith(
      expect.objectContaining({
        proveedor: "prov1",
        producto: "prod1",
        cantidad: 5,
        precioCompra: 10,
      }),
    );

    expect(Movimiento.create).toHaveBeenCalledWith(
      expect.objectContaining({
        tipo: "entrada",
        producto: "prod1",
        lote: "loteId",
        cantidad: 5,
        detalles: {
          clienteNombre: "TodoStock S.A.",
        },
      }),
    );
    expect(status).toHaveBeenCalledWith(201);
    expect(redirect).toHaveBeenCalledWith("/compras/vista");
  });

  // Tests Negativos
  test("retorna error si faltan datos", async () => {
    const req = { body: {} };
    const json = jest.fn();
    const res = { json, status: jest.fn().mockReturnThis() };

    await crearCompra(req, res);

    expect(json).toHaveBeenCalledWith({ error: "Faltan datos" });
  });

  test("retorna 500 cuando ocurre error en Lote.findOne", async () => {
    Lote.findOne.mockRejectedValue(new Error("Error de BD"));

    const req = {
      body: {
        proveedorId: "prov1",
        productoId: "prod1",
        cantidad: 5,
        precioCompra: 10,
        fechaVencimiento: "2030-01-01",
      },
    };

    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json };

    await crearCompra(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: "Error al registrar compra" });
  });

  test("retorna 500 cuando ocurre error en Lote.create", async () => {
    Lote.findOne.mockResolvedValue(null);
    Lote.create.mockRejectedValue(new Error("Error al crear lote"));

    const req = {
      body: {
        proveedorId: "prov1",
        productoId: "prod1",
        cantidad: 5,
        precioCompra: 10,
        fechaVencimiento: "2030-01-01",
      },
    };

    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json };

    await crearCompra(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: "Error al registrar compra" });
  });

  test("retorna 500 cuando ocurre error en Compra.create", async () => {
    Lote.findOne.mockResolvedValue(null);
    Lote.create.mockResolvedValue({ id: "loteId" });
    Compra.create.mockRejectedValue(new Error("Error al crear compra"));

    const req = {
      body: {
        proveedorId: "prov1",
        productoId: "prod1",
        cantidad: 5,
        precioCompra: 10,
        fechaVencimiento: "2030-01-01",
      },
    };

    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json };

    await crearCompra(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: "Error al registrar compra" });
  });

  test("retorna 500 cuando ocurre error en Movimiento.create", async () => {
    // Arrange
    Lote.findOne.mockResolvedValue(null);
    Lote.create.mockResolvedValue({ id: "loteId" });
    Compra.create.mockResolvedValue({ id: "compraId" });
    Movimiento.create.mockRejectedValue(
      new Error("Error al registrar movimiento"),
    );

    const req = {
      body: {
        proveedorId: "prov1",
        productoId: "prod1",
        cantidad: 5,
        precioCompra: 10,
        fechaVencimiento: "2030-01-01",
      },
    };

    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json };

    // Act
    await crearCompra(req, res);

    // Assert
    expect(Lote.create).toHaveBeenCalled();
    expect(Compra.create).toHaveBeenCalled();
    expect(Movimiento.create).toHaveBeenCalled();

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      error: "Error al registrar compra",
    });
  });
});

describe("comprasController - getCompra", () => {
  test("getCompras devuelve lista de compras", async () => {
    const comprasMock = [{ id: "1" }];

    Compra.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(comprasMock),
    });

    const req = {};
    const json = jest.fn();
    const res = { json, status: jest.fn().mockReturnThis() };

    await getCompras(req, res);

    expect(json).toHaveBeenCalledWith(comprasMock);
  });

  test("vistaCompras renderiza compras", async () => {
    const comprasMock = [{ id: "1" }];

    Compra.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(comprasMock),
    });

    const render = jest.fn();
    const req = {};
    const res = { render, status: jest.fn().mockReturnThis() };

    await vistaCompras(req, res);

    expect(render).toHaveBeenCalledWith("indexCompras", {
      compras: comprasMock,
    });
  });

  test("devuelve 404 si no existe la compra", async () => {
    // Simula la cadena populate de Mongoose
    Compra.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    const req = { params: { id: "noexiste" } };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = { status, json };

    await getCompra(req, res);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: "Compra no encontrada" });
  });

  test("retorna 500 cuando ocurre error en búsqueda", async () => {
    Compra.findById.mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error("Error de BD")),
    });

    const req = {
      params: {
        id: "c1",
      },
    };

    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json };

    await getCompra(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      error: "Error al buscar compra",
    });
  });

  test("getCompras retorna 500 si falla BD", async () => {
    Compra.find.mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error("DB error")),
    });

    const req = {};
    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json };

    await getCompras(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      error: "Error al obtener compras",
    });
  });
});
