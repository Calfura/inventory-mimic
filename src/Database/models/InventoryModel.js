const mongoose = require("mongoose");


const inventorySchema = mongoose.Schema ({
    character: {
        type: String, // Replace with Mongoose Object ID
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