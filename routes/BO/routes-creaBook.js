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
console.log("BODY?",typeof req.body.img ,"FILES?",req.files)
var string=JSON.stringify(req.body.img)
// test base 64 cloudinary +> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
var resultCloudinary = await cloudinary.uploader.upload(req.body.img, function(error, result){
  console.log("Router Cloud? ",result, error)
});


    // var newBook = await booksModel({
    //     title:req.body.title,
    //     description: req.body.desc,
    //     authors: req.body.authors,
    //     illustrators: req.body.illustrators,

    // })
    // var bookSave = await newBook.save()
    // console.log("SAVE?",bookSave)
res.json({result:"ok"})
})
router.post('/upload', async function(req,res,next){
    console.log("Upload FILES?",req.files.file.data)
// console.log("HEOH DATA IMAGE!!",JSON.stringify(req.files.file.data))
    // var resultCloudinary = await cloudinary.uploader.upload(req.body.thumbUrl)
    

    res.json({status:"done"})
    })
    
module.exports = router;