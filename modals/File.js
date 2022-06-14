const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const PATH_FILE = path.join("/uploads");

const CsvSchema = new mongoose.Schema({
  
    fileLocation : {
         type:String
       }
},{     
      timestamps :true
  });


  let csvStorage = multer.diskStorage({     //It enables the user to take full control on the location and name of the file.If destination aand filename not given it will take the default destination and random name
    destination: function (req, file, fp) {
      fp(null, path.join(__dirname,'..',PATH_FILE));
    },
    filename: function (req, file, fp){
      const name = Date.now() + '-' + Math.round(Math.random() * 1E9);
      fp(null, file.fieldname + '-' + name);   //+'.png'
    }
  });
   //using Filter to only limit the file type to csv
    
  let Filter = function(req, file, fp) {
    if (file.mimetype == "text/csv") {
      fp(null, true);
    } else {
      fp(null, false);
      return fp(new Error('Only Files with extension .csv format allowed!'),false);
    }
  }
   //statics 
  
  CsvSchema.statics.uploadedFile =  multer({ 
    storage: csvStorage,
    fileFilter : Filter
  }).single('fileInp'); 
  //using this path 
  CsvSchema.statics.path_file = PATH_FILE;
  
  
  const File = mongoose.model('File',CsvSchema); 
  module.exports = File;