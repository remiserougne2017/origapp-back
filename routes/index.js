var express = require('express');
var router = express.Router();


var booksModel = require('../model/books')

/* GET home page. */

router.get('/regles-de-confidentialite', async function(req, res, next) {
    res.render('index');
  });

module.exports = router;
