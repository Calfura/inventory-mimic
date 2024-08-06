const express = require("express");
const { Inventory, InventoryModel } = require("../models/InventoryModel");
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Inventory router activated..."
    });
});


// Checking for all Inventory Data
// localhost:3000/inventory/all
router.get("/all", async(request, response, next) => {
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
router.get("/:id", async(request, response, next) => {
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
router.post("/", async(request, response, next) => {
    let results = await Inventory.create(request.body).catch(error => {
        // Bad request by user, incorrect fields used
        error.status = 400;
        return error
    });

    if (result.errors) {
        return next(result)
    };

    console.log("Inventory created!")
    console.log(results)
    response.json({
        message: "Inventory created!",
        data: results
    });
});

// Updating Inventory data
// PATCH localhost:3000/inventory/:id
router.patch("/:id", async(request, response, next) =>{

    let result = await InventoryModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            returnDocument: "after"
        }
    ).catch(error => {
        // Bad Request by user, incorrect fields used
        error.status = 400;
        return error
    });

    if (result.errors) {
        return next(result)
    }

    response.json({
        message:"Inventory item Update",
        result: result
    })

});

// Deleting Inventory data
// DELETE localhost:3000/inventory/:id
router.delete("/:id", (request, response, next) =>{

});

module.exports = router;
