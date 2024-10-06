const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");
const router = express.Router();

// Registro de usuarios
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { name, email, password: hashedPassword, role: "user" };

  const query = "INSERT INTO users SET ?";
  db.query(query, user, (err, result) => {
    if (err) return res.status(500).send("Error al registrar usuario");
    res.send("Usuario registrado");
  });
});

// Login de usuarios
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send("Error en el servidor");
    if (!results.length) return res.status(400).send("Usuario no encontrado");

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send("Contraseña incorrecta");
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, "secretkey", {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

module.exports = router;
