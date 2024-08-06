const mongoose = require("mongoose");


const inventorySchema = mongoose.Schema ({
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
        required: true
    },
    item: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
})

const InventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = {
    InventoryModel
}