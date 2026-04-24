class Producto {
  constructor(id, nombre, precio, stock, marca, proveedorId) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.marca = marca;
    this.proveedorId = proveedorId;
  }
}
module.exports = Producto;
