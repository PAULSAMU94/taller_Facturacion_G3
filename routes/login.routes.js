// routes/login.routes.js
const express = require("express");
const router = express.Router();

// Ruta POST /api/login
router.post("/", (req, res) => {
    try {
        const { email, password } = req.body;

        // Usuario fijo
        const validEmail = "admin@gmail.com";
        const validPassword = "12345";

        if (email === validEmail && password === validPassword) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});

module.exports = router;
