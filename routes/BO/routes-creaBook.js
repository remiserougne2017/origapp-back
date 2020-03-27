var express = require('express');
var router = express.Router();
var booksModel = require('../../model/books');
var tagsModel = require('../../model/tags')
var cloudinary = require('cloudinary').v2;
const fs = require('fs')
cloudinary.config({ 
  cloud_name: 'dxkvzc4jc', 
  api_key: '431357233339179', 
  api_secret: '5WaenVfxAS-a4DRzSEMMSwLUqwg' 
});
var request = require('sync-request');


//Route récup des tags pour affichage
router.get('/tags', async function(req, res, next) {
 
  var tags = await tagsModel.find()
  
    res.json({tags})
    
  });

router.post('/creaBook', async function(req,res,next){
console.log("IMAGE CREABOOK",req.body)
// test base 64 cloudinary +> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
var imageUrl=req.body.img
  if (req.body.image64 != "undefined"){
    var resultCloudinary = await cloudinary.uploader.upload(req.body.image64, function(error, result){
      console.log("Router Cloud UPDATE? ",result, error)
      if(result){
        imageUrl = resultCloudinary.url 
      }
         
    });
  }

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

//UPDATE BOOK
router.post('/updateBook/:bookId', async function(req,res,next){
  console.log("updateBook? ",req.body,req.params,req.body.category.split(','))
  // test base 64 cloudinary +> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
var imageUrl=req.body.img
  if (req.body.image64 != "undefined"){
    var resultCloudinary = await cloudinary.uploader.upload(req.body.image64, function(error, result){
      console.log("Router Cloud UPDATE? ",result, error)
      if(result){
        imageUrl = resultCloudinary.url 
      }
         
    });
  }
      var updateBook = await booksModel.updateOne({_id:req.params.bookId},
        {
          title:req.body.title,
          description: req.body.desc,
          authors: req.body.authors,
          illustrators: req.body.illustrators,
          image : imageUrl,
          category: req.body.category.split(',')
      })
    
      console.log("updateBook?",updateBook)
  res.json({result:"ok upddate"})
  })
  


// router.post('/upload', async function(req,res,next){
// // console.log("Upload BODY?", req.body," Upload FILES?",req.files.file)
// // let what = req.files.file.data
// // console.log("WHAT DATA IMAGE!!",what)
//     // var resultCloudinary = await cloudinary.uploader.upload(req.body.thumbUrl)
    
//     res.json({status:"done"})
//     })
    

  router.post('/saveContent', async function(req,res,next){
      let message;
      
      // JSON body
      let reqContentDataJson = JSON.parse(req.body.contentData);
      
      // IMAGE DE CONTENU
      let imageContentUrl;
      // console.log("coverimage",reqContentDataJson.imageContent)
      if((reqContentDataJson.imageContent=='')||(reqContentDataJson.imageContent == undefined)) {
        imageContentUrl = reqContentDataJson.imageContentUrl
      } else {
              var resultCloudinary = await cloudinary.uploader.upload(reqContentDataJson.imageContent, function(error, result){
          console.log("Router cover image ? ",result, error)
        });
        imageContentUrl = resultCloudinary.url
      }
      
      // TABLEAU DE MEDIA
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
        // SAVE ET UPDATE EN DB 
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
              // console.log('///////////////////// HELLO I AM UPDATINF')
              // var bookUpdate = await booksModel.findOneAndUpdate(
              //   { $and:[{ content: { $elemMatch: { _id:reqContentDataJson.idContent} }},{_id:reqContentDataJson.idBook}]},
              //   { $set: {"content.$.title": reqContentDataJson.title,
              //            "content.$.imageContent": reqContentDataJson.imageContentUrl,
              //            "content.$.pageNum": reqContentDataJson.page,
              //            "content.$.media": data
              // }}
              //   )

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






  router.post('/loadBook/:bool/:contentId/:delete', async function(req,res,next){
    console.log('LoadBook params',req.params,req.body)
    if(req.params.bool != "undefined"){
      console.log('update boucle')
        await booksModel.updateOne(
        {_id: req.body.idBook,"content._id":req.params.contentId},
        { $set: { "content.$.status" : req.params.bool } }
        )
    }
   if(req.params.delete=="true"){
      console.log("DELETE",req.params.delete)
      await booksModel.updateOne(
        {_id: req.body.idBook},
        { $pull: {content : {_id : req.params.contentId}}}
        )
    }
 //recup des infos du livres + populate des categories
    var bookOpened = await booksModel.findById(req.body.idBook).populate("category").exec()
    // console.log("Tags?",bookOpened);
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

//  //recup tag name
//     let tagsName =  bookOpened.category.map(tag => {
//       return tag.name
//     });

    let dataToFront = {
      id : bookOpened._id,
      title:bookOpened.title,
      illustrators: bookOpened.illustrators,
      description : bookOpened.description,
      year : bookOpened.year_publishing,
      authors:bookOpened.authors,
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