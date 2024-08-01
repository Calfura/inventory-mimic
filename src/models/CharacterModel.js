const mongoose = require("mongoose");


const characterSchema = mongoose.Schema({
    user: {
        type: [{user: String}],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    strength: {
        type: Number,
        required: true
    },
    maxCarry: {
        type: Number,
        required: true
    },
    charInventory: {
        type: [{character: String, item: String}],
        required: true
    }
})

const CharacterModel = mongoose.model("Character", characterSchema);