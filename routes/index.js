var express = require('express');
var router = express.Router();


var booksModel = require('../model/books')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//// ROUTE CATALOGUE

router.get('/homePage', async function(req, res, next) {
  console.log("route cata")
 var livreMin = []
  var catalogue = await booksModel.find()
  console.log(catalogue)
  for (let i=0; i<catalogue.length; i++){
     livreMin.push(
    {image: catalogue[i].image,
    title: catalogue[i].title,
    authors: catalogue[i].authors,
    rating:catalogue[i].rating
  });
}

  console.log ("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",livreMin)
  res({livreMin}, "catalogue chargé");
} )

module.exports = router;
