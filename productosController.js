const express = require("express");
const db = require("../../config/db");
const router = express.Router();

// Obtener lista de productos
router.get("/", (req, res) => {
  const query = "SELECT * FROM productos";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Error al obtener productos");
    res.json(results);
  });
});

// Agregar un nuevo producto (solo para administradores)
router.post("/add", (req, res) => {
  const { name, description, price, stock } = req.body;
  const query = "INSERT INTO productos SET ?";
  db.query(query, { name, description, price, stock }, (err, result) => {
    if (err) return res.status(500).send("Error al agregar producto");
    res.send("Producto agregado");
  });
});

// Actualizar un producto (solo para administradores)
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const query = "UPDATE productos SET ? WHERE id = ?";
  db.query(query, [{ name, description, price, stock }, id], (err, result) => {
    if (err) return res.status(500).send("Error al actualizar producto");
    res.send("Producto actualizado");
  });
});

// Eliminar un producto (solo para administradores)
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM productos WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send("Error al eliminar producto");
    res.send("Producto eliminado");
  });
});

module.exports = router;
