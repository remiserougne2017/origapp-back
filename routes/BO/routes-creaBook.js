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
// console.log("BODY?", req.body.img,"FILES?",req.files)

var resultCloudinary = await cloudinary.uploader.upload(`${req.body.img}`)
console.log("resultCloud",resultCloudinary)

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
    console.log("Upload BODY?", req," Upload FILES?",req.files)

    // var resultCloudinary = await cloudinary.uploader.upload(req.body.thumbUrl)
    

    res.json({result:"ok"})
    })
    
module.exports = router;