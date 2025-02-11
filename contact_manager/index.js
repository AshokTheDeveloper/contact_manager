const app = require("./src/app");

const initializeDBAndServer = require("./src/config/db");

initializeDBAndServer(app);
