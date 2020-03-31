var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var uniqid = require('uniqid');
var booksModel=require('../model/books')
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
        //console.log("Router Cloud? ",result, "erreur?",error)
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
  
    
    var response = request('POST', 'https://origapp.cognitiveservices.azure.com/customvision/v3.0/Prediction/9a28ffac-b50b-47ec-ae90-41b183bc3bfe/classify/iterations/Iteration1/url/', options);
    
    var responseAPI = JSON.parse(response.getBody('utf8'));
    console.log(responseAPI.predictions[0].probability)
    var bookMatchId = null
    for(let i = 0; i < responseAPI.predictions.length; i++){
      console.log(responseAPI.predictions[i].tagName);
      if(responseAPI.predictions[i].probability >= 0.99){
          var bookMatchId = '5e6b4e82a94f732fb08184ad' // On prod changer pour responseAPI.predictions[i].tagName
          
          // Vérification le statut publié du livre
          var book = await booksModel.findById(bookMatchId); // remplace bookMatchId par responseAPI.predictions[i].tagName
          if(book.status == true) {
            console.log("Le livre est toujours publié ", bookMatchId)
          } else {
            console.log('livre non trouvé ou actuellement pas publié sur l app',bookMatchId)
          }
      }
    }

    console.log(bookMatchId)    
  
//Suppression du fichier tmp
    fs.unlinkSync(path);
    res.json(bookMatchId);
  });
  
  module.exports = router;
  