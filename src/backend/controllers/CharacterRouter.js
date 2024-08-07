const express = require("express");
const { CharacterModel } = require("../models/CharacterModel");
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Character router activated..."
    });
});

// Checking for all Character Data
// localhost:3000/characters/all
router.get("/all", async(request, response, next) => {
    let results = await CharacterModel.find().exec();
    console.log("Characters Found!")
    console.log(results);
    response.json({
        message: "Characters Found!",
        data: results
    });
});

// Finding Character by ID request
// localhost:3000/characters/:id
router.get("/:id", async(request, response, next) => {
    let results = await CharacterModel.findById(request.params.id).exec();
    console.log("Found Character!")
    console.log (results)
    response.json({
        message: "Found Character!",
        data: results
    });
});

// Creating new Character with JSON data
// POST localhost:3000/characters/
router.post("/", async(request, response, next) => {
    let result = await CharacterModel.create(request.body).catch(error => {
        error.status = 400;
        console.log("Error on character creation", error)
        return error
    });

    if (result.errors) {
        return next(result)
    }

    console.log("Character created!")
    console.log(result)
    response.json({
        message: "Character created!",
        result: result
    });
});

// Updating Character data
// PATCH localhost:3000/characters/:id
router.patch("/findById/:id", async(request, response, next) =>{
    let result = await CharacterModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            returnDocument: "after"
        }
    );

    response.json({
        message:"Character route, updater...",
        result: result
    });
});

// Deleting Character data
// DELETE localhost:3000/characters/:id
router.delete("/", async(request, response, next) =>{

    let result = await CharacterModel.findByIdAndDelete(request.body.id);

    response.json({
        message:"Character router, delete...",
        result: result
    });
});

module.exports = router;
