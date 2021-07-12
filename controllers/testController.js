const testSchema = require("../model/testSchema.js");
const userSchema = require("../model/userSchema.js");
 express = require('express');

function testController() {
    function createTest(req, res) {
        console.log("createtest_work!");
        if (req.body.roleNumber<200) {
            return res.status(400).send({"msg":"You do not have permission"});
        }

        var newTest = new testSchema(req.body);
        newTest.save(function (err, newDoc) {
            console.log("createtest_work1!");
            if (err) {
    console.log(err);
                return res.status(700).send(err);
            }
            console.log(newDoc)

            res.status(200).send(newDoc);

        })
       
    
    }

    
    function getTest(req, res) {
        testSchema.findOne({ id: req.body.id }, function (err, test) {
            if (req.body.roleNumber<200) {
                return res.status(400).send({"msg":"You do not have permission"});
            }
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            }
            if (!test) {
                return res.status(404).send();
            }
            res.status(200).send(test);
        })
    }

    function getAllTests(req, res) {
        testSchema.find(function (err, list) {
            console.log(" getAllTests work!")
            // if (req.body.roleNumber<200) {
            //     return res.status(400).send({"msg":"You do not have permission"});
            // }
            if (err) {
                return res.status(500).send({});
            }
            return res.status(200).send(list);
        })
    }
    
    function update_test_after_Score(req, res) {
        
        testSchema.findOneAndUpdate({ _id: req.body._id }, { $set: req.body },{new : true}, function (err, test) {
            console.log("update test is work ");
            if (err) {
                return res.status(500).send();
            }
            if (!test) {
                return res.status(404).send();
            }
            res.status(200).send();
        })
    
    }
    
    
        function userSendTest(req,res){
            console.log("get send work");
        userSchema.findById({_id:req.user._id},function(err,user){
            console.log(user);
            test=new testSchema({url:'kkkkjhgfs',roleNumber:554})
            test.save(function(err,test){
              console.log(test);
                user.listTestQuestions.push(test);
                user.save()
                console.log(user);
                userSchema.findById({_id:req.user._id},function(err,user){
                    console.log(user,'this no pop');
                    user.populate('listTest',(e,u)=>console.log(u))
                   
                })
                res.status(200).send(user)
            })
        })
    }
   

    
    
    return {
        createTest: createTest,
        getTest: getTest,
        getAllTests: getAllTests,
       update_test_after_Score:update_test_after_Score,
       userSendTest:userSendTest
    }

}

module.exports = testController()

