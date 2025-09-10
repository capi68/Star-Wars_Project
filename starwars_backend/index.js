'use strict';

const express = require('express');
const db = require('./models'); // importa sequelize
const app = express();
const charactersRoutes = require("./routes/characters"); // importacion de rutas
const PORT = process.env.PORT || 3000;
const cors = require ("cors");
const dotenv = require('dotenv');
dotenv.config();


app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

// Monta rutas desde  routes/characters.js
app.use("/characters", charactersRoutes);


// Ruta raiz de prueba
app.get('/', (req, res) => {
    res.send('API de Star Wars lista');
});

// Iniciar servidor
(async function start() {
  try {
    await db.sequelize.authenticate();
    console.log(" DB connection success");
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1); // exit with error code
  }
})();