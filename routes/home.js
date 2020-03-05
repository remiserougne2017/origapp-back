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
console.log("hehe",tags)

  res.json(tags)
  
});

//// ROUTE CATALOGUE
router.get('/homePage/:token', async function(req, res, next) {
  console.log("route catalogue",req.params)

  //rechercher la librairy du user !! token en DUR à enlever
  var user = await usersModel.findOne({token:req.params.token})
  var userLibrairy = user.myLibrairy

  //Generation du catalogue                                                    ///////
 var livreMin = []
 
  var catalogue = await booksModel.find()

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
    // console.log("livreMin",livreMin)
     res.json({livreMin});
    }else{
          result="erreur : pas de cata envoyé au front"
          };
res.json({livreMin, result})
} )

//Route searchTag
router.post('/searchTag', async function(req, res, next) {
  var resultMin =[]
  var userToken=JSON.parse(req.body.token)
  console.log("userToken",userToken)
  var user = await usersModel.findOne({token:userToken});
  var userLibrairy = user.myLibrairy 
  var tagId=[]
  var tag=JSON.parse(req.body.tagsSearch)
  console.log("TAG",tag)
  for(i=0;i<tag.length;i++){
    if(tag[i].color=="red"){
      tagId.push(tag[i]._id)
    }
  }
console.log("tagId",tagId)
  if(tagId.length==0){
   var result="Aucune sélection"
   var allBooks =await booksModel.find()
   console.log("AllBooks",allBooks.length)
    res.json({result,resultMin : allBooks})
  }else{
    var taggedBooks = await booksModel.find({ category: { $all: tagId } })
    console.log("taggedBooks",taggedBooks.length)
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
        res.json({result,resultMin})
        }
    }
 
  }

})
/// ROUTE SEARCH TEXT
/* var regex = /^${req.body.textsearch}/i 
 */
router.post('/searchtext/:id', async function(req, res, next) {

  console.log("route recherche",req.body,req.params)
  const regex = new RegExp(`${req.body.textSearch}`,"gi");
 
  var resultMin =[]
  var result = ""
  var user = await usersModel.findOne({token:req.params.id});
  /* var tokenUser = user.token    */                                               //
  var userLibrairy = user.myLibrairy                                              //
  var exratio = await booksModel.find({ $or: [
    { 'title': regex },
    { 'authors': regex },
    { 'illustrators': regex },
   // { 'publisher': regex }
    ]
 });
  console.log("EXRATIO",exratio.length)
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
     console.log()
   }
   } else {
   result="erreur : pas de resultat searchtext"
   };
   res.json({resultMin, result})
   } )

// ${req.body}

//  var exratio = async () => {await booksModel.find({title: regex}) ; booksModel.find({authors: regex}) ; booksModel.find({illustrators : regex}) ; booksModel.find({publisher : regex} ) ;
/* ,
{ 'illustrators': regex },
{ 'publisher': regex }, */

//Route ajout à la bibliotheque si bool == true

router.get('/addLibrairy/:id/:bool/:token', async function(req, res, next) {
  var user = await usersModel.findOne({token:req.params.token})
  var userLib=user.myLibrairy
  newLib = userLib.filter(e=>e!=req.params.id)
  var result
  if(req.params.bool=="true"){
    newLib.push(req.params.id)
    var saveLib = await usersModel.updateOne(
      { token:req.params.token},
      { myLibrairy: newLib })
      result={mess:"Ajouté à votre bibliothèque.",type:"success"}
  }else{
    var saveLib =  await usersModel.updateOne(
      { token:req.params.token},
      { myLibrairy: newLib })
      result={mess:"Supprimé de votre bibliothèque.",type:"info"}
  }
 
  res.json(result);
});

module.exports = router;
