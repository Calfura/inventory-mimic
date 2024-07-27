const express = require("express");
const { User } = require("../utils/models/UserModel");

const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"User router activated..."
    });
});


// Checker for User data
router.get("/all", async(request, response) => {
    let results = await User.find().exec();
    console.log("Found Users!")
    console.log(result);
    response.json({
        message: "Found Users!",
        data: results
    });
});

router.get("/:id", async(request, response) => {
    let results = await User.findById(request.params.id).exec();
    console.log("Found User!")
    console.log (results)
    response.json({
        message: "Found User",
        data: results
    });
});

router.post("/", async(request, response) => {
    let results = await User.create(request.body);
    console.log("User created!")
    console.log(results)
    response.json({
        message: "User created!",
        data: results
    });
});

// PATCH localhost:3000/contacts/1234
router.patch("/:id", (request, response) =>{

});

// DELETE localhost:3000/contacts/1234
router.delete("/:id", (request, response) =>{

});

module.exports = router;
