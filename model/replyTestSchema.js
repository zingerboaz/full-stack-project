const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var replyTestSchema=new Schema({
    score:{
        type:Number
    },
    test_id:{
        type:String    
    },
    user_id:{
        type:String     
    },
    url:{
        type:String,
    }

});
module.exports=mongoose.model("resultTest",replyTestSchema)