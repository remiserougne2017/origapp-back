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
// console.log("Upload BODY?", req.body," Upload FILES?",req.files.file)
// let what = req.files.file.data
// console.log("WHAT DATA IMAGE!!",what)
    // var resultCloudinary = await cloudinary.uploader.upload(req.body.thumbUrl)
    

    res.json({status:"done"})
    })
    



  router.post('/saveContent', async function(req,res,next){
      let message;
      
      // JSON body
      let reqContentDataJson = JSON.parse(req.body.contentData);

      // image de contenu
      let imageContentUrl;
      // console.log("coverimage",reqContentDataJson.imageContent)
      if((reqContentDataJson.imageContent != "")||(reqContentDataJson.imageContent != null)) {
        var resultCloudinary = await cloudinary.uploader.upload(reqContentDataJson.imageContent, function(error, result){
          console.log("Router cover image ? ",result, error)
        });
        imageContentUrl = resultCloudinary.url
      }

      // tableau de media
      const mediaData = async () => {
        return Promise.all(reqContentDataJson.media.map( async (obj,j) => { 
          let media;  
          if((obj.type == 'Texte')||(obj.type == 'Citation')) { // a terme mettre un switch si les objets différent beacuoup
            media = {
              title:obj.title,
              type:obj.type,
              texte:obj.text,
              duration:"",
              source:""
            } 
          } 
          if((obj.type == 'Image')||(obj.type == 'Video')||(obj.type == 'Audio')) {
            if(((obj.sourceUrl == '')||(obj.sourceUrl == undefined))&&((obj.sourceBase64 == '')||(obj.sourceBase64 == undefined))) {
              message = "source manquante"
            } 
            else {
              let sourceMedia;
              if((obj.sourceBase64=='')||(obj.sourceBase64 == undefined)) {
                sourceMedia = obj.sourceUrl
              }    
              else {
                if(obj.type == "Image") {
                  var resultCloudinary = await cloudinary.uploader.upload(obj.sourceBase64, function(error, result){
                  console.log("Router image media ? ",result, error)
                  });
                }  
                if((obj.type == "Video")||(obj.type =="Audio")) {
                  var resultCloudinary = await cloudinary.uploader.upload(obj.sourceBase64,{ resource_type: "video" },function(error, result){
                  console.log("Router video audio? ",result, error)
                  });
                }
                sourceMedia = resultCloudinary.url 
                }

              media = {
                title:obj.title,
                type:obj.type,
                duration:obj.duration,
                source:sourceMedia,
                texte:""
                }
            }
          }

        return media
        })
        )}
        
        mediaData().then(async (data) => {
          if(reqContentDataJson.idContent == 'new-content') {
              var bookAdding = await booksModel.findById(reqContentDataJson.idBook);
              bookAdding.content.push({
                title:reqContentDataJson.title,
                pageNum:reqContentDataJson.page,
                imageContent:imageContentUrl,
                media:data,
                status:true
              })
              await bookAdding.save();
            } else {
              console.log('///////////////////// HELLO I AM UPDATINF')
              // var bookUpdate = await booksModel.findOneAndUpdate(
              //   { $and:[{ content: { $elemMatch: { _id:reqContentDataJson.idContent} }},{_id:reqContentDataJson.idBook}]},
              //   { $set: {"content.$.title": reqContentDataJson.title,
              //            "content.$.imageContent": reqContentDataJson.imageContentUrl,
              //            "content.$.pageNum": reqContentDataJson.page,
              //            "content.$.media": data
              // }}
              //   )
              console.log("/////////////",data)

              var bookUpdated = await booksModel.findOne({_id:reqContentDataJson.idBook});
              for (let i=0;i<bookUpdated.content.length;i++) {
                  if(bookUpdated.content[i]._id == reqContentDataJson.idContent) {
                      bookUpdated.content[i].title = reqContentDataJson.title;
                      bookUpdated.content[i].pageNum = reqContentDataJson.page;
                      bookUpdated.content[i].imageContent = imageContentUrl;
                      bookUpdated.content[i].media = data // pb : je pense qu'on écrase les media précédents (donc pas de suivi des id)
                  }
              }

              await bookUpdated.save()

            }
        })

      res.json({result:"ok"})
      })






  router.post('/loadBook', async function(req,res,next){

    var bookOpened = await booksModel.findById(req.body.idBook);
    let contentData = bookOpened.content.map((cont,k) => {
      let data = {
        contentTitle : cont.title,
        contentImage:cont.imageContent,
        contentPage: cont.pageNum,
        contentStatus:cont.status,
        content_id:cont._id
      }
      return data
    })


    let dataToFront = {
      title:bookOpened.title,
      author:bookOpened.authors,
      status:bookOpened.status,
      coverImage:bookOpened.image,
      rating:bookOpened.rating,
      votesCount:bookOpened.votesCount,
      contentData:contentData,
      category:bookOpened.category
    }


  res.json({result:"ok",dataFromBack:dataToFront})
    })   


    router.post('/editContent', async function(req,res,next){
      var bookEdited = await booksModel.findById(req.body.idBook);
      // console.log("/////////////////",req.body)
      let dataToFront;
      let mediaData;
      if(req.body.idBook == "new-content") {
        dataToFront = {
          title :"",
          page:'',
          imageContent:'',
          inputMedia:{ 
            type: '', 
            title: '',
            text:'',
            sourceUrl:'',
            sourceBase64:'',
            duration:'',
             }
        }
      } else {
        for(let i=0;i<bookEdited.content.length;i++){
          if(bookEdited.content[i]._id == req.body.idContent) {
            mediaData = bookEdited.content[i].media.map((med,k) =>{
              media = {
                type: med.type, 
                title: med.title,
                text:med.texte,
                sourceUrl:med.source,
                duration:med.duration,
              }
              return media
            })
            dataToFront = {
              title: bookEdited.content[i].title,
              page:bookEdited.content[i].pageNum,
              imageContent:bookEdited.content[i].imageContent,
              mediaData:mediaData,
            }



          }
        }
      // console.log("contentdata",dataToFront)        

    }
      
    res.json({result:"ok",dataFromBack:dataToFront})
    })

module.exports = router;