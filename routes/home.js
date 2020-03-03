var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


//// ROUTE CATALOGUE

router.get('/homePage', async function(req, res, next) {
  console.log("route cata")
 var livreMin = []
 var result = ''
  var catalogue = await booksModel.find()
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
result="erreur : pas de cata envoyé au front"
};
res.json({livreMin, result})
} )