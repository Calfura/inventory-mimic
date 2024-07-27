const mongoose = require("mongoose");

const Character = mongoose.model("Character", {
    user: String,
    name: String,
    strength: Number,
    max_carry: Number,
    inventory: String
});

module.exports = {
    Character
}