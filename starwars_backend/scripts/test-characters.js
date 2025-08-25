const db = require('../models');

(async () => {
    try {
        const characters = await db.Character.findAll();
        console.log(characters.map(c => c.toJSON()));
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();