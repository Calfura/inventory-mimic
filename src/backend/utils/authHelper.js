const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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

function decodeJwt(jwtToDecode){
    let decodedData = jwt.verify(jwtToDecode, process.env.JWT_KEY)
    return decodedData;
}

module.exports = {
    createJwt,
    decodeJwt
}