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
    // console.log("livreMin",livreMin)
     res.json({livreMin});
    }else{
          result="erreur : pas de cata envoyé au front"
          };
res.json({livreMin, result})
} )

//Route ajout à la bibliotheque
router.get('/addLibrairy/:id/:bool', function(req, res, next) {
console.log("Route addLibrairy", req.params)

  res.json({ title: 'Express Rem' });
});

module.exports = router;