const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://boaz:b0527616555@cluster1.msl2t.mongodb.net/medical?retryWrites=true&w=majority');




const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
console.log("mongo connected is work!");
});

module.exports=db;