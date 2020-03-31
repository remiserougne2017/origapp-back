var express = require('express');
var router = express.Router();
var booksModel=require('../model/books')
var usersModel=require('../model/users')
var tagsModel=require('../model/tags')


//Route récup des tags pour affichage
router.get('/homePage/tags', async function(req, res, next) {
//////////////////Chargement de la collection tags//////////////////////////
    //   var tag =["Jeunesse","Histoire","Affiche","Livre","Comics","BD"]
    // tag.map(async e=>{
    //  var newTag =  new tagsModel({
    //    "name":e
    //  });
    //  await newTag.save()
    // })
  //var tags= await tagsModel.find()

var tags = await tagsModel.find()

  res.json(tags)
  
});

//// ROUTE CATALOGUE
router.get('/homePage/:token', async function(req, res, next) {
  // console.log("TOKEN",req.params.token)

  //rechercher la librairy du user !! token en DUR à enlever
  var user = await usersModel.findOne({token:req.params.token});
  var userLibrairy = user.myLibrairy

  //Generation du catalogue                                                   
 var livreMin = []

/*  // Generation des livres mieux notés
 var livresMieuxNotes = [] */
 
  var catalogue = await booksModel.find({status:true})

 if (catalogue.length>0) {
   result="ok"
  for (let i=0; i<catalogue.length; i++){

    //le livre est-il en bibliotheque du user
    var isInLibrairy = userLibrairy.findIndex(e =>e.equals(catalogue[i]._id));
    var bool = isInLibrairy!=-1?true:false
     livreMin.push(
    {
      id :  catalogue[i]._id,
      image: catalogue[i].image,
      title: catalogue[i].title,
      authors: catalogue[i].authors,
      illustrators: catalogue[i].illustrators,
      rating: catalogue[i].rating,
      inLibrairy: bool
    });
  }

  /* //Livres mieux notés
   var rating = catalogue.sort(function (a, b) {
    return b.rating - a.rating})
   livresMieuxNotes = rating.slice(0,6) */

    // console.log("livreMin",livreMin)
     res.json({result:"ok", livreMin});
    }else{
          result="erreur : pas de cata envoyé au front"
          res.json({livreMin, result})
          };
}
)

//Route searchTag //////////  TAG  ////////////
router.post('/searchTag', async function(req, res, next) {

  var resultMin =[]
  
  var userToken=req.body.token
  var user = await usersModel.findOne({token:userToken});
  
  var userLibrairy = user.myLibrairy 
  var tagId=[]
  var tag=JSON.parse(req.body.tagsSearch)
  for(let i=0;i<tag.length;i++){
    // console.log("TAG?",tag)
    if(tag[i].color=="red"){
      tagId.push(tag[i]._id)
    }
  }
  if(tagId.length==0){
   var result="Aucune sélection"
   var allBooks =await booksModel.find()
    res.json({result,resultMin : allBooks})
  }else{
    var taggedBooks = await booksModel.find(
      {$and:[
        { category: { $all: tagId } },
        { status: true }
      ]})
      if(taggedBooks.length==0){
      var result="Aucun résultat"
        res.json({result})
      }else{
        for (let i=0; i<taggedBooks.length; i++){
          var result="ok"
          //le livre est-il en bibliotheque du user
          var isInLibrairy = userLibrairy.findIndex(e =>e.equals(taggedBooks[i]._id));
          var bool = isInLibrairy!=-1?true:false
          resultMin.push(
          {
            id :  taggedBooks[i]._id,
            image: taggedBooks[i].image,
            title: taggedBooks[i].title,
            authors: taggedBooks[i].authors,
            illustrators: taggedBooks[i].illustrators,
            rating: taggedBooks[i].rating,
            inLibrairy: bool
          });
          };
          res.json({result,resultMin})
    };
  }
})
/// ROUTE SEARCH TEXT
/* var regex = /^${req.body.textsearch}/i 
 */
router.post('/searchtext/:id', async function(req, res, next) {
  const regex = new RegExp(`${req.body.textSearch}`,"gi");
 
  var resultMin =[]
  var result = ""
  var user = await usersModel.findOne({token:req.params.id});
  /* var tokenUser = user.token    */                                               //
  var userLibrairy = user.myLibrairy                                              //
  var exratio = await booksModel.find(
    {$and:[
      { $or: [{ 'title': regex },{ 'authors': regex },{ 'illustrators': regex }]},
      {status:true}
  ]
    //     { $and:[{ content: { $elemMatch: { _id:reqContentDataJson.idContent} }},{_id:reqContentDataJson.idBook}]},
    // { $set: {"content.$.title": reqContentDataJson.title,
    //          "content.$.imageContent": reqContentDataJson.imageContentUrl,
    //          "content.$.pageNum": reqContentDataJson.page,
    //          "content.$.media": data
  // }}
 });
  for (let i=0; i<exratio.length; i++){
  var isInLibrairy = userLibrairy.findIndex(e =>e.equals(exratio[i]._id));      //
  var bool = isInLibrairy!=-1?true:false                                        //
  }

    if (exratio.length>0) {
      result="ok"
     for (let i=0; i<exratio.length; i++){

        resultMin.push(
       {image: exratio[i].image,
       title: exratio[i].title,
       authors: exratio[i].authors,
       illustrators: exratio[i].illustrators,
       // publisher: exratio[i].publishers,
       rating:exratio[i].rating,
       id: exratio[i]._id,
      inLibrairy: bool
     });
   }
   } else {
   result="erreur : pas de resultat searchtext"
   };
   res.json({resultMin, result})
   } )



//Route ajout à la bibliotheque si bool == true     ///////////////////////////  LIBRAIRY  /////////////////

router.get('/addLibrairy/:id/:bool/:token', async function(req, res, next) {
// console.log("ADDLIBRAIRY",req.params)
  var user = await usersModel.findOne({token:req.params.token})
  var userLib=user.myLibrairy
  newLib = userLib.filter(e=>e!=req.params.id)
  var result
  if(req.params.bool=="true"){
    newLib.push(req.params.id)
    var saveLib = await usersModel.updateOne(
      { token:req.params.token},
      { myLibrairy: newLib });
      // console.log("responseBDD",saveLib)
      result={mess:"Ajouté à votre bibliothèque.",type:"success"}
  }else{
    var saveLib =  await usersModel.updateOne(
      { token:req.params.token},
      { myLibrairy: newLib })
      result={mess:"Supprimé de votre bibliothèque.",type:"info"}
  }
 
  res.json(result);
});

//Route Bibliothèque
router.get('/myLibrary/:token', async (req, res, next) => {

  var user = await usersModel.findOne({token:req.params.token}).populate('myLibrairy').exec();
  console.log("//////////////////////",user)
  var mesLivres = [];
  for(let i=0; i < user.myLibrairy.length; i++){

    if(user.myLibrairy[i].status==true) {
    //le livre est-il en bibliotheque du user
    var isInLibrairy = user.myLibrairy.findIndex(e => e.equals(user.myLibrairy[i]._id));
    var bool = isInLibrairy!=-1?true:false

    mesLivres.push({
      id: user.myLibrairy[i]._id,
      title: user.myLibrairy[i].title, 
      image: user.myLibrairy[i].image,
      authors: user.myLibrairy[i].authors,
      illustrators: user.myLibrairy[i].illustrators,
      rating: user.myLibrairy[i].rating,
      inLibrairy: bool})
    }
  }
  res.json(mesLivres)
});

module.exports = router;


//// ROUTE SUGGESTIONS/vous devriez aimer    //////////////////////////////  SUGGEST  ////////////

router.get('/suggest/:token', async (req, res, next) => {
  var token = req.params.token
  var userFind = await usersModel.findOne({token:req.params.token})
  // console.log("user",userFind)

  var bibliUserBdd = await userFind.myLibrairy
 
 var catalogue = []
 var myTags = []
 var mySuggest = []

for (let i=0; i<bibliUserBdd.length; i++) {
  var bibliById = await booksModel.findById(bibliUserBdd[i]);
  if(bibliById !== null) {
    let allTags = myTags.concat(bibliById.category);
    myTags = allTags;
  }   
}

// console.log("tags du book",tagsBook.category)
var taggedBooks = await booksModel.find(
  { $and:[{category: { $in: myTags} },{_id:{ $nin: bibliUserBdd}},{status:true}]});

// console.log("taggedbooks",taggedBooks);

for (let i=0; i<taggedBooks.length; i++) {

mySuggest.push({
  _id: taggedBooks[i]._id,
  image: taggedBooks[i].image,
  title: taggedBooks[i].title,
  rating: taggedBooks[i].rating,
  authors: taggedBooks[i].authors
})
}

res.json({result:true, mySuggest, mess: "liste suggestion pr user"})
 
});

/////////////////// ROUTE COMMENTS SUR LE LIVRE /////// est dans books.js




      
    


module.exports = router;
