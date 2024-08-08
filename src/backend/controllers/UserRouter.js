const express = require("express");
const { User, UserModel } = require("../models/UserModel");
const { createJwt, comparePasswords, decodeJwt } = require("../utils/authHelper");
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"User router activated..."
    });
});


// Checking for all User Data
// localhost:3000/users/all
router.get("/all", async(request, response, next) => {
    let results = await UserModel.find({}).exec();
    console.log("Found Users!")
    console.log(results);
    response.json({
        message: "Found Users!",
        data: results
    });
});

// Finding User by ID request
// localhost:3000/users/:id
router.get("/:id", async(request, response, next) => {
    let results = await UserModel.findById(request.params.id).exec();
    console.log("Found User!")
    console.log (results)
    response.json({
        message: "Found User",
        data: results
    });
});

// Creating new User with JSON data
// POST localhost:3000/users/
router.post("/", async(request, response, next) => {

    console.log("Signup Body:");
    console.log(request.body)

    let result = await UserModel.create(request.body).catch(error => {
        error.status = 400;
        console.log("Error on user creation", error)
        return error
    });

    let jwt = createJwt(result._id);
    let decodedJwt = decodeJwt(jwt);

    if (result.errors) {
        return next(result);
    };

    response.json({
        message: "User created!",
        result: result,
        jwt: jwt,
        decodedJwt
    });
});

// Updating User data
// PATCH localhost:3000/users/:id
router.patch("/:id", (request, response, next) =>{

});

// Deleting User data
// DELETE localhost:3000/users/:id
router.delete("/:id", async(request, response, next) =>{

    let result = await UserModel.findByIdAndDelete(request.body.id);

    response.json({
        message:"User deleted",
        result: result
    })

});

// User Login route

router.post("/jwt", async(request, response, next) => {
    let newJwt = "";

    if (!request.body.password || !request.body.username){
        return next(new Error("Missing login details in request"))
    }

    // Find username in DB
    let foundUser = await UserModel.findOne({username: request.body.username}).exec();
    
    // Comparing foundUser password with request.body.password
    let isPasswordCorrect = await comparePasswords(request.body.password, foundUser.password);
    
    // JWT creation for foundUser
    if (isPasswordCorrect){
    
        newJwt = createJwt(foundUser._id);
    
        response.json({
            jwt: newJwt
        });

    } else {
        return next(new Error("Incorrect password!"))
    }
});


module.exports = router;
