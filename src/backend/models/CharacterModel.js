const mongoose = require("mongoose");


const characterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // Name of Character
    name: {
        type: String,
        required: true
    },
    // Total strength
    strength: {
        type: Number,
        required: true
    },
    // Characters max carry weight
    maxCarry: {
        type: Number,
        required: false
    },
    // Character inventory reference
    // charInventory: {
    //     type: [{character: String, item: String}],
    // }
})

const CharacterModel = mongoose.model("Character", characterSchema);

module.exports = {
    CharacterModel
}