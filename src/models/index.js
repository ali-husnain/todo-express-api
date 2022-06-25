const enviroment = process.env.NODE_ENV || 'production';
const config = require("../config/db.config.js")[enviroment];
const Sequelize = require("sequelize");
let sequelize;
if (enviroment == 'development') {
    sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        //operatorsAliases: false,
        pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
        },
        logging: config.logging,
    });
} else {
    sequelize = new Sequelize(config.use_env_variable, {
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
        }
    });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.task = require("./task.model.js")(sequelize, Sequelize);
db.user.hasOne(db.task);

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;