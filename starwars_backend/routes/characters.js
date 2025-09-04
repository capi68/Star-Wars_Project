const express = require("express");
const router = express.Router();
const { Character } = require("../models"); // import models from sequielize
const { where } = require("sequelize");


//======================
//CRUD  "/"
//====================== 


// POST create a new character

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
        res.status(500).json({ error: "Error creating a character"});
    }
});


//GET all characters

router.get("/", async(req, res) => {
    try {
        const characters = await Character.findAll({ where: { active: true }, order: [["id", "ASC"]]});
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: "Error loading characters"});
    }
});




// GET inactive list

//router.get("/inactive", async (req, res) => {
//    try {
//      const inactiveCharacters = await Character.findAll({ where: { active: false }  });
//        res.json(inactiveCharacters);
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
//});



//=======================
// CRUD  "/:id"
//=======================

// GET characters for ID

router.get("/:id", async(req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (character) {
            res.json(character);
        } else {
            res.status(404).json({ error: "character not found"});
        }
    } catch (error) {
        res.status(500).json({ error: "Error getting character"});
    }
});


// PUT update new character

router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name, gender, birth_year, image_url, movies, origin_planet } = req.body;

        const character = await Character.findByPk(id);
        if(!character) {
            return res.status(404).json({ error: "character not found"});
        }

        await character.update({ name, gender, birth_year, image_url, movies, origin_planet });
    } catch (error) {
        res.status(500).json({ error: "Error when updating character"});
    }
});

// PATCH updating parcial from characters

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const character = await Character.findByPk(id); 
        if (!character) {
            return res.status(404).json({ error: "character not found" });
        }

        await character.update(req.body);

        res.json( { message: "update character", character });
    } catch (error) {
        res.status(500).json({ error: "Error when updating character" });
    }

    });

// DELETE character

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if(!character) {
            return res.status(404).json({ error: "character not found"});
        }

        character.active = false;
        await character.save();

        res.json({ message: "character inactive for soft delete" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports =  router;