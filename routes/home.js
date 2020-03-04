var express = require('express');
var router = express.Router();
var booksModel=require('../model/books')
var usersModel=require('../model/users')

//// ROUTE CATALOGUE

router.get('/homePage/:token', async function(req, res, next) {
  console.log("route catalogue",req.params)

  //rechercher la librairy du user !! token en DUR à enlever
  var user = await usersModel.findOne({token:req.params.token})
  var userLibrairy = user.myLibrairy

  //Generation du catalogue
 var livreMin = []
 
 var result = ''
  var catalogue = await booksModel.find()

 if (catalogue.length>0) {
   result="ok"
  for (let i=0; i<catalogue.length; i++){
    //le livre est il en bibliotheque du user
    console.log("userLIbrairy",userLibrairy,catalogue[i]._id)
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
    console.log("livreMin",livreMin)
     res.json({livreMin});
    }else{
          result="erreur : pas de cata envoyé au front"
          };
res.json({livreMin, result})
} )

/// ROUTE SEARCH TEXT

/* var regex = /^${req.body.textsearch}/i 
 */
router.post('/searchtext', async function(req, res, next) {

  console.log("route recherche",req.body.textSearch)
  const regex = new RegExp(`${req.body.textSearch}`,"gi");
 
  var resultMin =[]
  var result = ""
 
     var exratio = await booksModel.find({ $or: [
       { 'title': regex },
       { 'authors': regex },
       { 'illustrators': regex },
      // { 'publisher': regex }
       ]
    });
    

    console.log(".................................................",exratio)

    if (exratio.length>0) {
      result="ok"
     for (let i=0; i<exratio.length; i++){
        resultMin.push(
       {image: exratio[i].image,
       title: exratio[i].title,
       authors: exratio[i].authors,
       illustrators: exratio[i].illustrators,
       rating:exratio[i].rating
     });
   }
   
     console.log ("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",resultMin)
   
     console.log("result searchtext envoyé au front")
   } else {console.log(exratio);
   result="erreur : pas de resultat searchtext envoyé au front"
   };
   res.json({resultMin, result})
   } )
    
    
  
  
 

// ${req.body}

//  var exratio = async () => {await booksModel.find({title: regex}) ; booksModel.find({authors: regex}) ; booksModel.find({illustrators : regex}) ; booksModel.find({publisher : regex} ) ;
/* ,
{ 'illustrators': regex },
{ 'publisher': regex }, */
//Route ajout à la bibliotheque
router.get('/addLibrairy/:id/:bool', function(req, res, next) {
console.log("Route addLibrairy", req.params)

  res.json({ title: 'Express Rem' });
});

module.exports = router;
