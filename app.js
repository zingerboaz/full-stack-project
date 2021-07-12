const port = process.env.PORT|| 5000;
const express = require('express');
const cors = require('cors');

var app = express();
const UserToken = require('./model/userToken')

//const db= require('./db/mongoConnect');

const mongoose = require('mongoose');
//const dbPath=process.env.MONGO_URL||"mongodb://127.0.0.1:27017/medicalDatabase"
// console.log(dbPath);

const dbPath='mongodb+srv://boaz:b0527616555@cluster1.msl2t.mongodb.net/medical?retryWrites=true&w=majority'



const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
  }


mongoose.connect(dbPath, options);
mongoose.connection.on("err",function(err){
    if(err) throw err;
});

app.use(cors());
app.use(express.json());



var loginRoutes=("/auth", require("./routes/loginRoutes.js"));
app.use("/auth",loginRoutes)



// Routes
app.use("/api", function(req, res, next) {
    var userToken = new UserToken(false, req.headers['x-access-token']);

    console.log(userToken);
    
    if(userToken.isNotExpired()){
        console.log(true);
        
        req.user = userToken;
        return next();
    }
    res.status(401).send();
});

var userRoutes = require('./routes/userRouts.js');
    app.use("/api/users",userRoutes);

var testRoutes = require('./routes/testRoutes.js')
    app.use("/api/tests",testRoutes);

var replyTestRoutes=require('./routes/replyTestRoutes.js')
    app.use("/api/replyTest",replyTestRoutes);
app.get('/lll',require('./controllers/testController').userSendTest)
    // app.use("/api/orders", require('./routes/ordersRouts.js'));



app.listen(port,function(){
    console.log("Server is up in port: " + port);
    
});

