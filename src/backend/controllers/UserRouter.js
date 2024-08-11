const express = require("express");
const { UserModel } = require("../models/UserModel");
const { createJwt, decodeJwt } = require("../utils/authHelper");
const router = express.Router();
const bcrypt = require("bcryptjs")

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

// User Login request route

router.post("/jwt", async(request, response, next) => {
    const { username } = request.body;

    try {
        const user = await UserModel.findOne({username}).exec();
        if (!user) {
            console.log("!user fail")
            return response.status(404).json({
                status: "failed",
                data: [],
                message: "Username not found."
            });
        }

        const authPassword = await bcrypt.compare(
            request.body.password,
            user.password);

        console.log("bcrypt authpassword", authPassword)

        if (!authPassword) {
            console.log("!authPassword fail")
            return response.status(401).json({
                status: "failed",
                data: [],
                message: "Incorrect password."
            });
        }

        // Succesful login. Create JWT and respond
        if (authPassword) {
            
            console.log("authPassword success")
            const token = createJwt(user);

            response.status(200).json({
                message: `${username} logged in`,
                userId: user._id,
                token
            });
        }
    } catch (error) {
        next(error);
    }
});



module.exports = router;
