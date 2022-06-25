module.exports = {
  "development": {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "admin",
    DB: "todo-app",
    dialect: "postgres",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  },
  "production": {
    "use_env_variable": "postgres://pywhxihmjwuswl:3621091d0e908f1c97ee04d8f869879e62fb503e72624d636705393702e5ad45@ec2-3-224-8-189.compute-1.amazonaws.com:5432/d7pnev5htl49hb",
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": {
        "require": true,
        "rejectUnauthorized": false
        }
    }
 }
};