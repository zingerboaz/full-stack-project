const mongoose = require("mongoose");
mongoose.set('useCreateIndex',true)
const Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: String,
        unique: true,
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
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
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
    academic_institution: {
        type: String,
    },

    roleNumber: Number,

    listTestQuestions: [{
        type: String,
            // type: Schema.Types.ObjectId,
            // ref: 'mytest'
            }],
     listTestAnswers: [{
        type: Object,
                // type: Schema.Types.ObjectId,
                // ref: 'mytest'
                },
                
            ],
});
module.exports = mongoose.model("users", userSchema);