const express=require('express');
const replyTestController=require('../controllers/replyTestController.js')

//api/replyTest
var replyTestRoutes=express.Router();
    replyTestRoutes.post("/createReplyTest",replyTestController.createReplyTest);

module.exports=replyTestRoutes;