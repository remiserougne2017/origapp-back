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
 var result = ''
  var catalogue = await booksModel.find({title: "Bou"})
  console.log(catalogue)
 if (catalogue.length>0) {
   result="ok"
  for (let i=0; i<catalogue.length; i++){
     livreMin.push(
    {image: catalogue[i].image,
    title: catalogue[i].title,
    authors: catalogue[i].authors,
    illustrators: catalogue[i].illustrators,
    rating:catalogue[i].rating
  });
}

  console.log ("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",livreMin)
  res.json({livreMin});
  console.log("livreMin/catalogue envoyé au front")
} else {console.log(catalogue);
result="ko"
};
res.json({livreMin, result})
} )

module.exports = router;
