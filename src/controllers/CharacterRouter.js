const express = require("express");
const { Character } = require("../models/CharacterModel");
const { app } = require("../utils/server")
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Character router activated..."
    });
});

// Checking for all Character Data
// localhost:3000/characters/all
router.get("/all", async(request, response) => {
    let results = await Character.find().exec();
    console.log("Characters Found!")
    console.log(results);
    response.json({
        message: "Characters Found!",
        data: results
    });
});

// Finding Character by ID request
// localhost:3000/characters/:id
router.get("/:id", async(request, response) => {
    let results = await Character.findById(request.params.id).exec();
    console.log("Found Character!")
    console.log (results)
    response.json({
        message: "Found Character!",
        data: results
    });
});

// Creating new Character with JSON data
// POST localhost:3000/characters/
router.post("/", async(request, response) => {
    let results = await Character.create(request.body);
    console.log("Character created!")
    console.log(results)
    response.json({
        message: "Character created!",
        data: results
    });
});

// Updating Character data
// PATCH localhost:3000/characters/:id
router.patch("/:id", (request, response) =>{

});

// Deleting Character data
// DELETE localhost:3000/characters/:id
router.delete("/:id", (request, response) =>{

});

module.exports = router;
