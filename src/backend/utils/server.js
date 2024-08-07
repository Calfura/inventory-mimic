const { default: mongoose } = require("mongoose");
const { decrypt } = require("dotenv");
const { decryptObject, encryptString, decryptString } = require("../controllers/ LoginRoute");


// Importing Express
const express = require("express");

// Express server instance creation
const app = express();

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

// Catches and throws error message on server crash
app.use((error, request, response, next) => {
    response.status(500).json({
        message: "Error occured on the server",
        error: error.message
    });
});

const validateBasicAuth = (request, response, next) => {

    let authHeader = request.headers["authorization"] ?? null;

    if (authHeader == null) {
        throw new Error("Auth data missing from protected route!!!")
    }

    if (authHeader.startsWith("Basic ")) {
        authHeader = authHeader.substring(5).trim();
    }

    let decodedAuth = Buffer.from(authHeader, 'base64').toString('ascii');

    let objDecodedAuth = {username: "", password: ""};
    objDecodedAuth.username = decodedAuth.substring(0, decodedAuth.indexOf(":"));
    objDecodedAuth.password = decodedAuth.substring(decodedAuth.indexOf(":") + 1);

    request.userAuthDetails = objDecodedAuth;

    next();
};

app.get("/encryptAuthData", validateBasicAuth, (request, response, next) => {
    let encryptAuthResult = encryptString(JSON.stringify(request.userAuthDetails));

    response.json({
        user: encryptAuthResult
    });
});

app.get("/decryptAuthData", (request, response) => {

    let encryptedAuthHeader = request.headers['encryptedauth'];
    
    let decryptAuthResult = decryptObject(encryptedAuthHeader);

    response.json({
        user: decryptAuthResult
    });
});

module.exports = {
    app
}