const { default: mongoose } = require("mongoose");



async function databaseConnect(){
    let databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/InventoryMimic";

    await mongoose.connect(databaseURL);
    console.log("Database connection success!")
};

async function databaseClose() {
    // Disconnect from database
    await mongoose.connection.close();
    console.log("Database connection close!")
}

async function databaseClear() {
    // Delete all data within database
    await mongoose.connection.db.dropDatabase();
}

module.exports = {
    databaseConnect,
    databaseClose,
    databaseClear
}