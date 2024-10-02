const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv");
dotenv.config();

async function comparePasswords(plaintextPassword, encryptedPassword) {
	let doesPasswordMatch = false;

	doesPasswordMatch = await bcrypt.compare(plaintextPassword, encryptedPassword);

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

// Validation of JWT
function validateJwt(jwtToValidate){
	let isJwtValid = false;

	jwt.verify(jwtToValidate, process.env.JWT_KEY, (error, decodedJwt) => {
		if (error){
			throw new Error("User JWT is not valid!");
		}

		console.log("Decoded JWT data:");
		console.log(decodedJwt);
		isJwtValid = true;
	});

	return isJwtValid;
}


// Decoding Token
function decodeJwt(jwtToDecode){
    let decodedData = jwt.verify(jwtToDecode, process.env.JWT_KEY)
    return decodedData;
}

module.exports = {
    createJwt,
    decodeJwt,
    comparePasswords,
    validateJwt
}