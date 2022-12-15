const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String
})

const UserModel = mongoose.model("users", userSchema);


module.exports = {
    UserModel
}