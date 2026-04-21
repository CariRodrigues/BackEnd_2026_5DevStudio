class Proveedor {
  constructor(id, cuit, nombre, domicilio, telefono, email, rubro, plazoEntrega, activo, observaciones) {
    this.id = id;
    this.cuit = cuit;
    this.nombre = nombre;
    this.domicilio = domicilio;
    this.telefono = telefono;
    this.email = email;
    this.rubro = rubro;
    this.plazoEntrega = plazoEntrega;
    this.activo = activo;
    this.observaciones = observaciones;
  }
}

module.exports = Proveedor;