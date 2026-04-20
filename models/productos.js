const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../data/productos.json');

function leerProductos() {
  try {
    const data = fs.readFileSync(ruta, 'utf-8');
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function guardarProductos(productos) {
  fs.writeFileSync(ruta, JSON.stringify(productos, null, 2));
}

module.exports = {
  leerProductos,
  guardarProductos
};
