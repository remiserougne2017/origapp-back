var express = require('express');
var router = express.Router();
var booksModel = require('../../model/books');

router.post('/creaBook', async function(req,res,next){
console.log("ROUTE CREA BOOK", req.body)

res.json({result:"ok"})
})

module.exports = router;