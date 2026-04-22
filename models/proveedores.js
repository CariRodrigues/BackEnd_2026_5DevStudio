const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../data/proveedores.json');

function leerProveedores() {
  try {
    const data = fs.readFileSync(ruta, 'utf-8');
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function guardarProveedores(proveedores) {
  fs.writeFileSync(ruta, JSON.stringify(proveedores, null, 2));
}

module.exports = {
  leerProveedores,
  guardarProveedores
};