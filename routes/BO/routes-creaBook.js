var express = require('express');
var router = express.Router();
var booksModel = require('../../model/books');
var tagsModel = require('../../model/tags')
var publishersModel = require('../../model/publishers')
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
  console.log("TAGS!!",tags)
    res.json({"tags":tags})
  });

//ROUTE chargement de la Home en fonction de l'id Maison d'édition (publisher)
router.get('/home/:publisher', async function(req, res, next) {

  var listBooks = await booksModel.find({publisher :req.params.publisher})
  var dataBookHome = listBooks.map(b=>{
    var book = 
       {
          title:  b.title,
          authors:  b.authors,
          illustrators: b.illustrators,
          image: b.image,
          idBook: b._id
           }
    return book
      })
 
  res.json({"dataBookHome":dataBookHome})
  
});

//ROUTE CREA BOOK 
router.post('/creaBook/:publisher', async function(req,res,next){

// test base 64 cloudinary +> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
var imageUrl=req.body.img
  if (req.body.image64 != "undefined"){
    var resultCloudinary = await cloudinary.uploader.upload(req.body.image64, function(error, result){
      if(result){
        imageUrl = result.url 
      }
         
    });
  }
  var category
  req.body.category.split(',')[0] !=''?category =  req.body.category.split(','):category =[]
    var newBook = await booksModel({
        title:req.body.title,
        description: req.body.desc,
        authors: req.body.authors,
        illustrators: req.body.illustrators,
        image : imageUrl,
        status : false,
        category : category,
        publisher:req.params.publisher
    })
    var bookSave = await newBook.save()
res.json({result:"ok",imageUrl})
})

//DELETE book
router.get('/deleteBook/:idBook', async function(req,res,next){
  var result="ko"
  var deleteBook = await booksModel.deleteOne({_id : req.params.idBook})
  if(deleteBook){
    result="ok"
  }

  
  res.json({result})
  })

//UPDATE BOOK
router.post('/updateBook/:bookId', async function(req,res,next){
  var result="ko"
  // test base 64 cloudinary +> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
var imageUrl=req.body.img
  if (req.body.image64 != "undefined"){
    var resultCloudinary = await cloudinary.uploader.upload(req.body.image64, function(error, result){
      if(result){
        imageUrl = result.url 
      }else{
          console.log("error upload cloudinary",error)
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
    result="ok"
      fs.unlinkSync(req.body.image64);
  res.json({result})
  })
  


router.post('/upload', async function(req,res,next){
    // ./tmp en dev
    // var path = './tmp/'+req.files.file.name
    // /tmp pour la prod
    var path = '/tmp/'+req.files.file.name;
    await req.files.file.mv(path);
    // var resultCloudinary = await cloudinary.uploader.upload(req.body.thumbUrl)
    res.json({status:"done",imagePath : path})
})
    

  router.post('/saveContent', async function(req,res,next){
      let message;
      var mediaCount
      // JSON body
      let reqContentDataJson = JSON.parse(req.body.contentData);
      console.log("CONTENTU?",reqContentDataJson)
      if(/*reqContentDataJson.media[0].type==''||*/reqContentDataJson.media.length==0){
        mediaCount=0
      }else{
        mediaCount =1
      }
      // IMAGE DE CONTENU
      let imageContentUrl;
      if((reqContentDataJson.imageContent=='')||(reqContentDataJson.imageContent == undefined)) {
        imageContentUrl = reqContentDataJson.imageContentUrl
      } else {
              var resultCloudinary = await cloudinary.uploader.upload(reqContentDataJson.imageContent, function(error, result){
        });
        imageContentUrl = resultCloudinary.url
      }
      
      // TABLEAU DE MEDIA
      const mediaData = async () => {
        return Promise.all(reqContentDataJson.media.map( async (obj,j) => { 
          let media;  
       
          if((obj.type == 'text')||(obj.type == 'quote')) { // a terme mettre un switch si les objets différent beacuoup
            media = {
              title:obj.title,
              type:obj.type,
              texte:obj.text,
              duration:"",
              source:""
            } 
          } 
          if((obj.type == 'image')||(obj.type == 'video')||(obj.type == 'audio')) {
            if(((obj.sourceUrl == '')||(obj.sourceUrl == undefined))&&((obj.sourceBase64 == '')||(obj.sourceBase64 == undefined))) {
              message = "source manquante"
            } 
            else {
              let sourceMedia;
              if((obj.sourceBase64=='')||(obj.sourceBase64 == undefined)) {
                sourceMedia = obj.sourceUrl
              }    
              else {
                if(obj.type == "image") {
                  var resultCloudinary = await cloudinary.uploader.upload(obj.sourceBase64, function(error, result){
                  });
                }  
                if((obj.type == "video")||(obj.type =="audio")) {
                  var resultCloudinary = await cloudinary.uploader.upload(obj.sourceBase64,{ resource_type: "video" },function(error, result){
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
            console.log('NwContent!',mediaCount)
              var bookAdding = await booksModel.findById(reqContentDataJson.idBook);
              bookAdding.content.push({
                title:reqContentDataJson.title,
                pageNum:reqContentDataJson.page,
                imageContent:imageContentUrl,
                media:data,
                status:false,
                mediaCount : mediaCount
              })
              await bookAdding.save();
            } else {
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
                    var contentStatus
                    mediaCount==0?contentStatus=false:contentStatus=bookUpdated.content[i].status
                      bookUpdated.content[i].title = reqContentDataJson.title;
                      bookUpdated.content[i].pageNum = reqContentDataJson.page;
                      bookUpdated.content[i].imageContent = imageContentUrl;
                      bookUpdated.content[i].media = data; // pb : je pense qu'on écrase les media précédents (donc pas de suivi des id)
                      bookUpdated.content[i].mediaCount = mediaCount;
                      bookUpdated.content[i].status = contentStatus;

                    }
              }

              await bookUpdated.save()

            }
        })

        //suppression du media dans le dossier temporaire
        if(reqContentDataJson.imageContent){
          fs.unlinkSync(reqContentDataJson.imageContent);
        }
   
      res.json({result:"ok"})
      })

  router.post('/loadBook/:bool/:contentId/:delete', async function(req,res,next){
 console.log('LOAD BOOK',req.params)
    if(req.params.bool != "undefined"||req.params.bool==null){
      if(req.params.contentId != "undefined"){
        await booksModel.updateOne(
          {_id: req.body.idBook,"content._id":req.params.contentId},
          { $set: { "content.$.status" : req.params.bool } }
          )
      }else{
        await booksModel.updateOne(
          {_id: req.body.idBook},
          { $set: { "status" : req.params.bool } }
          )
      }
       
    }
   if(req.params.delete=="true"){
      await booksModel.updateOne(
        {_id: req.body.idBook},
        { $pull: {content : {_id : req.params.contentId}}}
        )
    }
 //recup des infos du livres + populate des categories
    var bookOpened = await booksModel.findById(req.body.idBook).populate("category").exec()
    let contentData = bookOpened.content.map((cont,k) => {
      var contentStatus
      if(cont.mediaCount==0){
        contentStatus = false
      }else{
        contentStatus=cont.status
      }
      let data = {
        contentTitle : cont.title,
        contentImage:cont.imageContent,
        contentPage: cont.pageNum,
        contentStatus:cont.status,
        content_id:cont._id,
        mediaCount : cont.mediaCount
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
      let dataToFront;
      let mediaData;
      var mediaCount;
      console.log("EDIT",bookEdited)
      if(req.body.idBook == "new-content") {
        dataToFront = {
          title :"",
          page:'',
          imageContent:'',
          // inputMedia:{ 
          //   type: '', 
          //   title: '',
          //   text:'',
          //   sourceUrl:'',
          //   sourceBase64:'',
          //   duration:'',
          //    }
        }
      } else {
        for(let i=0;i<bookEdited.content.length;i++){
          if(bookEdited.content[i]._id == req.body.idContent) {
          
            if(bookEdited.content[i].media[0]){
              mediaCount = 1
              mediaData = bookEdited.content[i].media.map((med,k) =>{
                media = {
                  type: med.type, 
                  title: med.title,
                  text:med.texte,
                  sourceUrl:med.source,
                  duration:med.duration,
                }
                return media
              });
            }else{
              mediaData = []
              mediaCount = 0
            };

            dataToFront = {
              id:  bookEdited.content[i]._id,
              title: bookEdited.content[i].title,
              page:bookEdited.content[i].pageNum,
              imageContent:bookEdited.content[i].imageContent,
              mediaData:mediaData,
              mediaCount : mediaCount
            }



          }
        }
    }
      console.log("Data EDIT CONTENT",dataToFront)
    res.json({result:"ok",dataFromBack:dataToFront})
    })

module.exports = router;