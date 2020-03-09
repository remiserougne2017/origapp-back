var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var uniqid = require('uniqid');
//remove le fichier temporaire stocké
const fs = require('fs')

cloudinary.config({ 
  cloud_name: 'dxkvzc4jc', 
  api_key: '431357233339179', 
  api_secret: '5WaenVfxAS-a4DRzSEMMSwLUqwg' 
});
var request = require('sync-request');


//route SCAN
router.post('/', async function(req, res, next) {
    console.log("SCAN ROUTE",req.files)
    var id=uniqid()
    var path = './public/tmp/'+id+'.jpg'
    var resultCopy = await req.files.picture.mv(path);
    
    //Envoi sur cloudinary
    if(!resultCopy) {
      var resultCloudinary = await cloudinary.uploader.upload(path, function(error, result){
        console.log("Router Cloud? ",result, "erreur?",error)
      })
    };
    
  // //GOOGLE API
    const imageUrl = resultCloudinary.url
    const options = {
      body: `{"Url": "${imageUrl}"}`,
      headers: {
          'Content-Type': 'application/json',
          'Prediction-Key':'b037117a45c949adb2acb6978eb248b5',
      },
    };
  
    
    var res = request('POST', 'https://origapp.cognitiveservices.azure.com/customvision/v3.0/Prediction/9a28ffac-b50b-47ec-ae90-41b183bc3bfe/classify/iterations/Iteration1/url/', options);
    
    var prediction = JSON.parse(res.getBody('utf8'));
    console.log("API reponse",prediction) 

    
  
//Suppression du fichier tmp
    fs.unlinkSync(path);
    res.json({result :ok});
  });
  
  module.exports = router;
  