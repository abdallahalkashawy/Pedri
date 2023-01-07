const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    UserName: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
    },
    Token: {
        type: String,
        required: [true, "Please add a token"],
        unique: true,
    }
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;