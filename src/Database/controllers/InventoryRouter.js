const express = require("express");
const { Inventory } = require("../models/InventoryModel");
const { app } = require("../utils/server")
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Inventory router activated..."
    });
});


// Checking for all User Data
// localhost:3000/users/all
router.get("/all", async(request, response) => {
    let results = await Inventory.find().exec();
    console.log("Inventories Found!")
    console.log(results);
    response.json({
        message: "Inventories Found!",
        data: results
    });
});

// Finding Inventory by ID request
// localhost:3000/inventory/:id
router.get("/:id", async(request, response) => {
    let results = await Inventory.findById(request.params.id).exec();
    console.log("Found Inventory!")
    console.log (results)
    response.json({
        message: "Found Inventory!",
        data: results
    });
});

// Creating new Inventory with JSON data
// POST localhost:3000/inventory/
router.post("/", async(request, response) => {
    let results = await Inventory.create(request.body);
    console.log("Inventory created!")
    console.log(results)
    response.json({
        message: "Inventory created!",
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
