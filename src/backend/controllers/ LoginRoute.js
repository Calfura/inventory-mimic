const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

let encAlgorithm = "aes-256-cbc";
let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, 'SpecialSalt', 32);
let encIV = crypto.scryptSync(process.env.ENC_IV, ' SpecialSalt', 16);
let ciper = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
let deciper = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);

function encryptString(data){
    return ciper.update(data, 'utf-8', 'hex') + ciper.final('hex');
};

function decryptString(data){
    return deciper.update(data, 'hex', 'utf-8') + deciper.final('utf-8');
};

function decryptObject(data){
    return JSON.parse(decryptString(data));
};


module.exports = {
    encryptString,
    decryptString,
    decryptObject
};