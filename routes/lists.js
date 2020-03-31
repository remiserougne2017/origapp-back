var express = require('express');
var router = express.Router();
var usersModel=require('../model/users');
var booksModel=require('../model/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Récupérer Last read */
router.get('/lastRead/:token', async (req, res, next) => {

var user = await usersModel.findOne({token:req.params.token}).populate('lastRead').exec();
console.log("///////////// LAST READE",user)
var lastReads = [];
  for(let i=0; i < user.lastRead.length; i++){

     /* //le livre est-il en bibliotheque du user
    var isInLibrairy = user.myLibrairy.findIndex(e => e.equals(user.myLibrairy[i]._id));
    var bool = isInLibrairy!=-1?true:false */
    if(user.lastRead[i].status == true) {
    lastReads.push({
      id: user.lastRead[i]._id,
      title: user.lastRead[i].title, 
      image: user.lastRead[i].image,
      authors: user.lastRead[i].authors,
      illustrators: user.lastRead[i].illustrators,
      rating: user.lastRead[i].rating,
      /* inLibrairy: bool */})
    }
  }
  res.json(lastReads)
});

/* Récupérer livres mieux notés */
router.get('/bestRated', async (req, res, next) => {

  var bestRated = [];
  var book = await booksModel.find({status:true})

  // Trie par rating (ordre décroissante)
  var rating = book.sort(function (a, b) {
    return b.rating - a.rating})
  
  // Les six livres mieux notés
  ratingList = rating.slice(0,6)

  for(let i=0; i < ratingList.length; i++){
    bestRated.push({
      id: rating[i]._id,
      title: rating[i].title, 
      image: rating[i].image,
      authors: rating[i].authors,
      illustrators: rating[i].illustrators,
      rating: rating[i].rating,
      /* inLibrairy: bool */})
}
// console.log(bestRated)
       /* //le livre est-il en bibliotheque du user
      var isInLibrairy = user.myLibrairy.findIndex(e => e.equals(user.myLibrairy[i]._id));
      var bool = isInLibrairy!=-1?true:false */
      
    res.json(bestRated)
  });

module.exports = router;
