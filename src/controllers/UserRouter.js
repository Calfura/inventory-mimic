const express = require("express");
const { User } = require("../models/UserModel");
const { app } = require("../utils/server")
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"User router activated..."
    });
});


// Checking for all User Data
// localhost:3000/users/all
router.get("/all", async(request, response) => {
    let results = await User.find().exec();
    console.log("Found Users!")
    console.log(results);
    response.json({
        message: "Found Users!",
        data: results
    });
});

// Finding User by ID request
// localhost:3000/users/:id
router.get("/:id", async(request, response) => {
    let results = await User.findById(request.params.id).exec();
    console.log("Found User!")
    console.log (results)
    response.json({
        message: "Found User",
        data: results
    });
});

// Creating new User with JSON data
// POST localhost:3000/users/
router.post("/", async(request, response) => {
    let results = await User.create(request.body);
    console.log("User created!")
    console.log(results)
    response.json({
        message: "User created!",
        data: results
    });
});

// Updating User data
// PATCH localhost:3000/users/:id
router.patch("/:id", (request, response) =>{

});

// Deleting User data
// DELETE localhost:3000/users/:id
router.delete("/:id", (request, response) =>{

});

module.exports = router;
