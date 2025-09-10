'use strict';

const characters = require('./data/characters.json');

Module.exports = {
    async up(queryInterface, Sequelize) {
        const data = characters.map(c => ({
            ...c,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await queryInterface.bulkInsert('Characters', data, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Characters', null, {});
    }
};