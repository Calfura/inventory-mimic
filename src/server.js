const { default: mongoose, Aggregate } = require("mongoose");
const { decrypt } = require("dotenv");
const cors = require("cors")
const express = require("express");

// Express server instance creation
const app = express();

// Cors required for decrypting data for Validation
app.use(cors({
    origin: '*',
    methods: "GET, POST, PATCH, DELETE",
    credentials: true
}));

// Allows data to be used in the from of JSON
app.use(express.json());

app.get("/", (request, response, next) => {

    response.json({
        message: "Welcome to Inventory Mimic"
    });
});

const UserRouter = require("./backend/controllers/UserRouter");
app.use("/users", UserRouter);

const CharacterRouter = require("./backend/controllers/CharacterRouter")
app.use("/character", CharacterRouter);

const InventoryRouter = require("./backend/controllers/InventoryRouter");
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
    response.status(error.status || 500).json({
        message: "Error occured on the server",
        error: error.message
    });
});

module.exports = {
    app
}