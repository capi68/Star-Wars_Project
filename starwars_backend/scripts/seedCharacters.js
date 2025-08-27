const axios = require("axios");
const { Character } = require("../models");

async function fetchCharacters() {
    try {
        let url = "https://swapi.py4e.com/api/people";
        let allCharacters = [];

        while (url) {
            const res = await axios.get(url);
            allCharacters = allCharacters.concat(res.data.results);
            url = res.data.next; // sigue a la siguiente pagina si existe
        }

        // Adaptacion a modelo 
        const mappedCharacters = await Promise.all(
            allCharacters.map(async (char, index) => {
                // obtener planeta de origen
                let origin_planet = null;
                if (char.homeworld) {
                    try {
                        const planetRes = await axios.get(char.homeworld);
                        origin_planet = planetRes.data.name;
                    } catch (error) {
                        origin_planet = null;
                    }
                }

                //obtener movies
                let movies = [];
                if (char.films.lenght > 0) {
                    try {
                        const filmRes = await Promise.all(
                            char.films.map(f => axios.get(f))
                        );
                        movies = filmRes.map(f => f.data.title).join(", ");
                    } catch (error) {
                        movies = "";
                    }
                }
                return {
                    name: char.name,
                    gender: char.gender,
                    birth_year: char.birth_year,
                    origin_planet: origin_planet || null,
                    movies: movies.length > 0 ? movies : null,
                    image_url: null 
                };
            })
        );

        // Insertar a la base de datos
        await Character.bulkCreate(mappedCharacters, { ignoreDuplicates: true });
        console.log("personajes importados correctamente");
    } catch (error) {
        console.error ("Error al importar personajes", error.message);
        console.log(error.stack);
    }
}

fetchCharacters();