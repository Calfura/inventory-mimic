const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Character router activated..."
    });
});

// Checker for Character data
router.get("/all", async(request, response) => {
    let results = await User.find().exec();
    console.log("Found Characters!")
    console.log(result);
    response.json({
        message: "Found Character!",
        data: results
    });
});