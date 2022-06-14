require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
const db = require('./config/mongoose');
const File = require('./modals/File');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const customMware = require('./config/middleware');

app.use(express.urlencoded({
  extended:true                //Fetching the content while posting
})); 

app.use(cookieParser());

app.use(express.static(path.join(__dirname,'./assets')));
app.use(expressLayouts);  

app.use('/uploads',express.static(path.join(__dirname+'/uploads')));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(session({
  name : 'uploaderBay>>',
  //This helps with encryption and determines when the code is deployed to the server
  secret : "secretT",
  saveUninitialized : false,          //Do not store information in cookies unless the user is logged in or the ID is not established. Do not save any information about the user.
  resave:false                       // This means rewriting the cookie many times
}));

app.use(flash());   
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
   if(err){
    console.log('Error occured : ',err);
    return;
   }
   console.log('Server started at : ',port);
 }
);