const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://user:user@cluster0.javd0dt.mongodb.net/?retryWrites=true&w=majority");
//mongodb+srv://user:user@cluster0.javd0dt.mongodb.net/?retryWrites=true&w=majority
const db = mongoose.connection;

db.on('error',function(err){
   console.log('Error occured during loading MongoDB ',err);
   return;
});

db.once('open',function(){
  console.log('DB done succesfully');
  return;
});
module.exports = db;