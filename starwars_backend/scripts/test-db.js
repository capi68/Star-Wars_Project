const { sequelize } = require('../models');

(async () => {
    try {
        await sequelize.authenticate();
        console.log("conexion Ok con postgres");
        process.exit(0);
    } catch (err) {
        console.error("error de conexion", err);
        process.exit(1);
    }
})();