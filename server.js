const express = require("express");
const cors = require("cors");
const path = require("path");

const facturaRoutes = require("./routes/factura.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // sirve HTML, CSS, JS

// Ruta raíz
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "factura.html"));
});

// Rutas API
app.use("/api/facturas", facturaRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send("Página no encontrada");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

