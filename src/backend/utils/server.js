const { default: mongoose, Aggregate } = require("mongoose");
const { decrypt } = require("dotenv");


// Importing Express
const express = require("express");

// Express server instance creation
const app = express();

// Cors required for decrypting data for Validation
const cors = require("cors")
app.use(cors());

// Allows data to be used in the from of JSON
app.use(express.json());

app.get("/", (request, response, next) => {

    response.json({
        message: "Hello world!"
    });
});

const UserRouter = require("../controllers/UserRouter");
app.use("/users", UserRouter);

const CharacterRouter = require("../controllers/CharacterRouter")
app.use("/character", CharacterRouter);

const InventoryRouter = require("../controllers/InventoryRouter");
app.use("/inventory", InventoryRouter);


// Return a bunch of useful details from the database connection
// Dig into each property here:
// https://mongoosejs.com/api/connection.html
app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost   
    })
});

app.get("*", (request, response, next) => {
    response.status(404).json({
        message: "404 Page not found"
    })
})

// Catches and throws error message on server crash
app.use((error, request, response, next) => {
    response.status(500).json({
        message: "Error occured on the server",
        error: error.message
    });
});

module.exports = {
    app
}