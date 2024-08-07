const mongoose = require("mongoose");


const inventorySchema = mongoose.Schema ({
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
        required: true
    },
    // Item name
    item: {
        type: String,
        required: false
    },
    // Item weight
    weight: {
        type: Number,
        required: false
    },
    // Item description
    description: {
        type: String,
        required: false
    }
})

const InventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = {
    InventoryModel
}