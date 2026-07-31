const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// FIXED: Agar require karne par object milta hai, toh yeh syntax crash hone se bachayega
if (typeof passportLocalMongoose === "function") {
    userSchema.plugin(passportLocalMongoose);
} else if (passportLocalMongoose && typeof passportLocalMongoose.default === "function") {
    userSchema.plugin(passportLocalMongoose.default);
} else {
    // Agar koi specific named export hai toh handle karega
    userSchema.plugin(passportLocalMongoose); 
}

module.exports = mongoose.model("User", userSchema);