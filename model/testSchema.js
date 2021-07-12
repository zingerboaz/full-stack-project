const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var testSchema = new Schema({
    roleNumber:{
        type: Number,
    },
    subject_of_the_test: {
        type: String
    },
    name_the_Lecturer: {
        type: String
    },
    name:{
    type:String
    },
    intern_id:{
        type:String,

    },
    url:{
        type:String,
    },
    key:{
        type:String,
    }
});
module.exports=mongoose.model("mytest",testSchema)



















