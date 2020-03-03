var express = require('express');
var router = express.Router();
var booksModel = require('../model/books')

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