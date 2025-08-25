'use strict';

const express = require('express');
const db = require('./models'); // importa sequelize
const { Character } = require('./models'); // importa modelo
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta raiz de prueba
app.get('/', (req, res) => {7
    res.send('API de Star Wars lista');
});

// Obtener todos los personajes
app.get('/characters', async(req, res) => {
    try {
        const characters = await db.Character.findAll();
        res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo personajes"});
    }
});

// Obtener un personaje por ID
app.get('/characters/:id', async (req, res) => {
    try {
        const character = await db.Character.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({ error: "personaje no encontrado"});
        }
        res.json(character);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo personaje" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});