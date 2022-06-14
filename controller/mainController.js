const File = require('../modals/File');
const fs = require("fs");
const csv = require("csv-parser");
const path = require('path');

module.exports.home = async function(req,res){
    try{

      let fileUse = await File.find({});             //Export the route and get the content from the database
      
      return res.render('home',{
        title:'Home',
        fileList : fileUse
      });

    }catch(err){
      console.log(' Error ',err);
      return;
    } 
}

module.exports.upload = function(req,res){
  try{
        File.uploadedFile(req,res,function(err){
        if(err){
           console.log('Error ',err);
           return;
        }

        if(req.file){ // Now getting the file to store and save info
          let filePath = File.path_file+'/'+req.file.filename;
        
         File.create({
          fileLocation :  filePath
         }).then(()=>{console.log('Upload done successfully')})
           .catch((err)=>{
            console.log(' Error Occured : ',err);
          }); 
          req.flash("success", "File Uploaded Successfully :)");
          return res.redirect('back');
        }
        // This will fetch the file for saving and saving the information
        else{
           req.flash("error", "Some Error Occured !!!");
           return res.redirect('back'); 
        }
      });
  }catch(err){
      console.log('Error occured ',err);
      return;
  }
  
}

module.exports.view =async function(req,res){
  console.log('View Loaded :)');
  let fileClicked = await File.findById(req.params.id);
  console.log("Clicked File ID => "+fileClicked);
  let csvFileLink = fileClicked.fileLocation;
  
  console.log(csvFileLink);

  // (B) READ CSV FILE
  var ans = [];
  fs.createReadStream(path.join(__dirname,'..',csvFileLink))
  .pipe(csv())    
  .on("data", (data) => ans.push(data))
  .on("end", () => {
       console.log("First Record "+ ans[0] +" all records "+ans);
      
       return res.render('viewUpload',{
         basicRecord : ans[0],
         allRecords : ans,
         title : 'View CSV File'
       });
  })
  
};

module.exports.uploadthAPI = async(req,res)=>{
  try{
      File.uploadedFile(req,res,function(err){
        if(err){
           return res.status(400).json({
             message : "Error in uploading file"
           });
        }

        if(req.file){ // This will fetch the file for saving and saving the information
          let FilePath = File.path_file+'/'+req.file.filename;
         File.create({
          fileLocation :  FilePath
         }).then(()=>{console.log('Upload done')})
           .catch((err)=>{
            console.log(' Error Occured : ',err);
          }); 
          req.flash("success", "File Uploaded Successfull :)");
          return res.status(200).json({
            message : "Uploaded Succefully",
            file:req.file,
            fileLoc : FilePath 
          });
        }
        else{
           req.flash("error", "Some Error Occured Check Logs !!!");
           return res.status(400).json({
            message : "File Mismatch"
          });
        }
      });

  }catch(err){
    req.flash('error',"Error Occured while uploading");
    return res.status(500).json({
      message : "Internal Server Error"
    });
  }
}



module.exports.delete =async function(req,res){
  
  try{
    let presentId = req.params.id;
    let PresentFile = await File.findById(presentId);
    let FilePath = path.join(__dirname,"../",PresentFile.fileLocation);  
    //removing file from the stored Location 
    fs.unlinkSync(FilePath);
    let currFile = await File.findByIdAndDelete(presentId);
    //deleting file 

    req.flash("error","File Removed !!!");
    
    return res.redirect('back');

 
}catch(err){
  console.log("Error occured while Deleting :(",err);
  return; 
}
}