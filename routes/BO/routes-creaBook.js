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
      // console.log("hello crea content")
      console.log("BODY?",req.body ,"FILES?",req.files)  
      // var imageUrl
      // var resultCloudinary = await cloudinary.uploader.upload(req.body.imageData, function(error, result){
      //   console.log("Router Cloud? ",result, error)
      //    imageUrl = resultCloudinary.url
      // });
      

      res.json({result:"ok"})
      })

      
module.exports = router;