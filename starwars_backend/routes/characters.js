const express = require("express");
const router = express.Router();
const { Character } = require("../models"); // importa modelo de sequielize



//GET all characters

router.get("/", async(req, res) => {
    try {
        const characters = await Character.findAll();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: "Error al cargar personajes"});
    }
});

// GET characters por ID
router.get("/:id", async(req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (character) {
            res.json(character);
        } else {
            res.status(404).json({ error: "personaje no encontrado"});
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener personaje"});
    }
});

// POST crear un nuevo character
router.post("/", async (req, res) => {
    try {
        const { name, gender, birth_year, image_url, movies, origin_planet } = req.body;

        const newCharacter = await Character.create({
            name,
            gender, 
            birth_year,
            image_url,
            movies,
            origin_planet
        });

        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(500).json({ error: "Error al crear personaje"});
    }
});

// PUT update nuevo character
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name, gender, birth_year, image_url, movies, origin_planet } = req.body;

        const character = await Character.findByPk(id);
        if(!character) {
            return res.status(404).json({ error: "Personaje no encontrado"});
        }

        await character.update({ name, gender, birth_year, image_url, movies, origin_planet });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el personaje"});
    }
});

// DELETE character
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if(!character) {
            return res.status(404).json({ error: "Personaje no encontrado"});
        }

        await character.destroy();
        res.json({ message: "Personaje eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar personaje" });
    }
});

module.exports =  router;