const { default: mongoose } = require("mongoose");



async function connect(){
    let databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/InventoryMimic";

    await mongoose.connect(databaseURL);
    console.log("Database connection success!")
};

module.exports = {
    connect
}