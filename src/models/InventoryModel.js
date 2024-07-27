const mongoose = require("mongoose");

const Inventory = mongoose.model("Inventory", {
    character: String,
    item: String,
    weight: Number,
    description: String
});

module.exports = {
    Inventory
}