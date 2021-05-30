const port = process.env.PORT|| 5000;
const express = require('express');
const cors = require('cors');
//const userRoutes = require('./routes/userRouts');
var app = express();

const mongoose = require('mongoose');
const dbPath=process.env.MONGO_URL||"mongodb://127.0.0.1:27017/medicalDatabase"
console.log(dbPath);

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

var userRoutes = require('./routes/userRouts.js');

//app.use("/auth", require("./routes/loginRoutes.js"));

app.use("/api/users",userRoutes);
// app.use("/api/orders", require('./routes/ordersRouts.js'));


// Routes
  app.use("/api", function(req, res, next) {
      var userToken = new UserToken(false, req.headers['x-access-token']);
      console.log(userToken);
      
      if(userToken.isNotExpired()){
          req.user = userToken;
          return next();
      }
      res.status(401).send();
  });

app.listen(port,function(){
    console.log("Server is up in port: " + port);
    
});

