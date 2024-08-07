const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Password encryption check, to ensure if plain password
// matches encrypted password
async function comparePasswords(plainTextPassword, encryptedPassword) {
    let doesPasswordMatch = false;

    doesPasswordMatch = await bcrypt.compare(plainTextPassword, encryptedPassword);

    return doesPasswordMatch;
}

// Creating JWT for logged in users, to allow the use
// of routes within the API and App
function createJwt(userId){
    let newJwt = jwt.sign(
        // Payload data
        {id: userId},
        // Secret Key
        process.env.JWT_KEY,

        // Options
        {
            expiresIn: "7d"
        }

    );

    return newJwt;
}


function validateJwt(jwtToValidate){
    let isJwtValid = false;

    jwt.verify(jwtToValidate, process.env.JWT_KEY, (error, decodedJwt) => {
        if (error){
            throw new Error("User JWT is not valid...");
        }

        console.log("Decoded JWT Data:")
        console.log(decodedJwt)
        isJwtValid = true;
    });

    return isJwtValid;
};

module.exports = {
    comparePasswords,
    createJwt,
    validateJwt
}