const express = require("express");
const router = express.Router();
const { Character } = require("../models"); // importa modelo de sequielize
const { where } = require("sequelize");



//GET all characters

router.get("/", async(req, res) => {
    try {
        const characters = await Character.findAll({ where: { active: true }});
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: "Error al cargar personajes"});
    }
});

// GET listado de inactivos

router.get("/inactive", async (req, res) => {
    try {
        const inactiveCharacters = await Character.findAll({ where: { active: false }  });
        res.json(inactiveCharacters);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

        character.active = false;
        await character.save();

        res.json({ message: "Personaje inactivo por soft delete" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT reactivar personajes inactivos
router.put('/:id/restore', async (req, res) => {

        const { id } = req.params;
        const restoreCharacter = await Character.findByPk( id );
        if (!restoreCharacter) return res.status(404).json({ error: "Personaje no encontrado" });

        restoreCharacter.active = true;
        await restoreCharacter.save();

        res.json({ message: `Personaje ${restoreCharacter.name} reactivado` });
});

// PATCH actualizacion parcial de Characters

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const fieldsToUpdate = req.body; // actualizar parcialmente

        const character = await Character.findByPk(id); 
        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }

        await character.update(fieldsToUpdate);

        res.json( { message: "Personaje actualizado parcialmente", character });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar parcialmente el personaje" });
    }

    });

module.exports =  router;