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
      body: `{
      "requests":[
        {
          "image":{
            "source":{
              "imageUri":"${imageUrl}"
                
            }
          },
          "features":[
            {
              "type":"TEXT_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    }`,
      headers: {
          'Content-Type': 'application/json'
      },
    };
  
    
    var res = request('POST', 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD23hWLX66RH0NlkksQxM9W_9V_kTwf-4I', options);
    
    var responseGoogle = JSON.parse(res.getBody('utf8'));
    console.log("API reponse",responseGoogle.responses) 

    
    

//Suppression du fichier tmp
    fs.unlinkSync(path);
    res.json({result :ok});
  });
  
  module.exports = router;
  