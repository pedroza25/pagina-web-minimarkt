const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const authRoutes = require("./api/auth/authController");
const productosRoutes = require("./api/productos/productosController");

app.use(bodyParser.json());
app.use(express.static("public"));

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de productos
app.use("/api/productos", productosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
