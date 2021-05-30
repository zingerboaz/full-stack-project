const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: String,
        unique:true,
    },
    full_name: {
        type: String,
    },
    passport: {
        type: Number,
    },
    phone_number: {
        type: Number,
    },
    password:{
        type:String,
    },
    email:{
        type:String, 
    },
    year: {
        type: Number,
    },
    age: {
        type: Number,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    academic_institution:{
        type: String,
    },

    roleNumber:{
        type: Number,
    }
    });
module.exports = mongoose.model("users", userSchema)