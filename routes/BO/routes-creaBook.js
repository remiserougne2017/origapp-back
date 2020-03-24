var express = require('express');
var router = express.Router();
var booksModel = require('../../model/books');
var cloudinary = require('cloudinary').v2;
const fs = require('fs')
cloudinary.config({ 
  cloud_name: 'dxkvzc4jc', 
  api_key: '431357233339179', 
  api_secret: '5WaenVfxAS-a4DRzSEMMSwLUqwg' 
});
var request = require('sync-request');

router.post('/creaBook', async function(req,res,next){
console.log("BODY?",req.body ,"FILES?",req.files)

// test base 64 cloudinary +> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
var imageUrl
var resultCloudinary = await cloudinary.uploader.upload(req.body.imageData, function(error, result){
  console.log("Router Cloud? ",result, error)
   imageUrl = resultCloudinary.url
});

    // var newBook = await booksModel({
    //     title:req.body.title,
    //     description: req.body.desc,
    //     authors: req.body.authors,
    //     illustrators: req.body.illustrators,
    //     image : imageUrl
    // })
    // var bookSave = await newBook.save()
    // console.log("SAVE?",bookSave)
res.json({result:"ok",imageUrl})
})



router.post('/upload', async function(req,res,next){
console.log("Upload BODY?", req.body," Upload FILES?",req.files.file)
// let what = req.files.file.data
// console.log("WHAT DATA IMAGE!!",what)
    // var resultCloudinary = await cloudinary.uploader.upload(req.body.thumbUrl)
    

    res.json({status:"done"})
    })
    



  router.post('/creaContent', async function(req,res,next){

      let message;
      
      // JSON body
      let reqContentDataJson = JSON.parse(req.body.contentData);

      // image de contenu
      let imageContentUrl;
      if(reqContentDataJson.imageContent != "") {
        var resultCloudinary = await cloudinary.uploader.upload(reqContentDataJson.imageContent, function(error, result){
          console.log("Router  ? ",result, error)
        });
        imageContentUrl = resultCloudinary.url
        console.log(imageContentUrl)
      }
      console.log("/////////",imageContentUrl)

      // tableau de media
      const mediaData = async () => {
        return Promise.all(reqContentDataJson.media.map( async (obj,j) => { 
          let media;  
          if((obj.type == 'Texte')||(obj.type == 'Citation')) { // a terme mettre un switch si les objets différent beacuoup
            media = {
              title:obj.title,
              type:obj.type,
              texte:obj.text,
            } 
          } 
          if((obj.type == 'Image')||(obj.type == 'Video')||(obj.type == 'Audio')) {
            if(((obj.sourceUrl == '')||(obj.sourceUrl == undefined))&&((obj.sourceBase64 == '')||(obj.sourceBase64 == undefined))) {
              message = "source manquante"
            } 
            else {
              let sourceMedia;
              if((obj.sourceUrl=='')||(obj.sourceUrl == undefined)) {
                if(obj.type == "Image") {
                  var resultCloudinary = await cloudinary.uploader.upload(obj.sourceBase64, function(error, result){
                  // console.log("Router  ? ",result, error)
                  });
                }  
                if((obj.type == "Video")||(obj.type =="Audio")) {
                  console.log("audio")
                  var resultCloudinary = await cloudinary.uploader.upload(obj.sourceBase64,{ resource_type: "video" },function(error, result){
                  console.log("Router Cloud? ",result, error)
                  });
                }
                sourceMedia = resultCloudinary.url 
              }    
              else {
                console.log('url expected',obj.sourceUrl)
                sourceMedia = obj.sourceUrl
                }

              media = {
                title:obj.title,
                type:obj.type,
                duration:obj.duration,
                source:sourceMedia
                }
            }
          }

        return media
        })
        )}
        
        console.log("///////// 2",imageContentUrl)

        mediaData().then(data => {
          console.log("data loading",{
            title:reqContentDataJson.title,
            pageNum:reqContentDataJson.page,
            imageContent:imageContentUrl,
            media:data


          }) 
        
          // enregistrement en DB
          // var bookAdding = await booksModel.findById(reqContentDataJson.idBook);
          // bookAdding.content.push({
          //   title:reqContentDataJson.title,
          //   pageNum:reqContentDataJson.page,
          //   imageContent:imageContentUrl,
          //   media:data
          // })
    
          // await bookAdding.save();
          // console.log(bookAdding);
        
        })
      

      res.json({result:"ok"})
      })

      
module.exports = router;