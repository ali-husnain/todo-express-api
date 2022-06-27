const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

let corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to todo application." });
});
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/task.routes')(app);

const db = require("./src/models");
db.sequelize.sync(); //for production
// const roleSeeder = require("./src/seeder/role");
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     roleSeeder();
// });
    

//error handling
require('./core/error_handler')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});