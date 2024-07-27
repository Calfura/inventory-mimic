

// Importing Express
const express = require("express");

// Express server instance creation
const app = express();

// Allows data to be used in the from of JSON
app.use(express.json());




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

// Catches and throws error message on server crash
app.use((error, request, response, next) => {
    response.status(500).json({
        message: "Error occured on the server",
        error: error.message
    });
});


modules.exports = {
    app
}