const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Inventory router activated..."
    });
});

// Checker for Inventory data
router.get("/all", async(request, response) => {
    let results = await User.find().exec();
    console.log("Found Inventories!")
    console.log(result);
    response.json({
        message: "Found Inventories!",
        data: results
    });
});

// router.get("/:id", async(request, response) => {
//     let results = await 
// })