'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Characters', [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
        image_url: 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
        movies: 'A New Hope, Empire Strikes back, Return of the Jedi',
        origin_planet: 'Tatooine',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leia Organa',
        gender: 'female',
        birth_year: '19BBY',
        image_url:'https://starwars-visualguide.com/assets/img/characters/5.jpg',
        movies: 'A New Hope, Empire Strikes back, Return of the Jedi',
        origin_planet: 'Tatooine',
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        name: 'Darth Vader',
        gender: 'male',
        birth_year: '41.9BBY',
        image_url: 'https://starwars-visualguide.com/assets/img/characters/4.jpg',
        movies: 'A New Hope, The Empire Strikes Back, Return of the Jedi',
        origin_planet: 'Tatooine',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  }
};
