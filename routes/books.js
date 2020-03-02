var express = require('express');
var router = express.Router();
var booksModel = require('../model/books')

/*  Creation BDD */
router.get('/bdd', async function(req, res, next) {

// Mise en place de la BDD
//jddBooks est un tableau d'obd de livres cf. le fichier dans le public/javascripts/jdd
 var save = jddBooks.map(async e => {
        var newBooks = new booksModel (e);
        var booksSave = await newBooks.save();
        return booksSave
    })

  res.render('index', { title: 'Express' });
});



module.exports = router;
