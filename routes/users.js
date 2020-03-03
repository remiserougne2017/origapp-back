var express = require('express');
var router = express.Router();
var usersModel = require('../model/users');

// Cripto
var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('oi');
});

/* Route POST SIGN-UP */
router.post('/sign-up', async (req, res, next) => {

  console.log(req.body)

    var salt = uid2(32)
    var newUser = new usersModel({
      firstName: req.body.firstName,
      email: req.body.email,
      pwd: SHA256(req.body.password+salt).toString(encBase64),
      salt: salt,
      token: uid2(32),
      myLibrairy: [],
      lastRead: [],
      comments: []
    })

    saveUser = await newUser.save()
    
    if(saveUser){
      result = true
      token = saveUser.token
    }
  console.log(result, saveUser)
  res.json({result, saveUser, token})
})


module.exports = router;
