const productos = require("../data/productos");
const facturas = require("../data/facturas");

function crearFactura(req, res) {
    const { cliente, items } = req.body;

    let subtotal = 0;
    let stockOk = true;

    items.forEach(i => {
        const producto = productos.find(p => p.id === i.id);
        if (!producto || producto.stock < i.cantidad) stockOk = false;
        subtotal += producto.precio * i.cantidad;
    });

    if (!stockOk) return res.status(400).json({ mensaje: "Sin stock" });

    items.forEach(i => {
        const producto = productos.find(p => p.id === i.id);
        producto.stock -= i.cantidad;
    });

    const factura = {
        id: facturas.length + 1,
        cliente,
        items,
        subtotal,
        total: subtotal * 1.12
    };

    facturas.push(factura);

    res.json(factura);
}

module.exports = { crearFactura }; // <--- Esto ES OBLIGATORIO
