const express=require('express');
const testController=require('../controllers/testController.js')

//api/tests
var testRoutes = express.Router();
testRoutes.post("/createTest", testController.createTest);
testRoutes.post("/getTest", testController.getTest);
// testRoutes.post("/getAllTests", testController.getAllTests);
testRoutes.put("/update_test_with_Score", testController.update_test_after_Score);
testRoutes.get("/getAllTests", testController.getAllTests);
testRoutes.get("/:_id", testController.getTest);

module.exports = testRoutes;