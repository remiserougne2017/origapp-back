var express = require('express');
var router = express.Router();
var usersModel = require('../model/users');

// Cripto
var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('un message');
});

/* Route POST SIGN-UP */
router.post('/sign-up', async (req, res, next) => {

  console.log(req.body)

  var error = {};
  var result = false;
  var token = null;
  var saveUser = null;
  
  //Vérification d'email unique
  const searchEmail = await usersModel.findOne({
    email: req.body.email
  })

  if(searchEmail != null){
    error.email = "Email déjà existant"
  } else {

  //Vérification de champs non vides
    if(req.body.firstName == ''
  || req.body.email == ''
  || req.body.password == ''){
    error.emptyField = 'Le champ est vide'
  }

  // Vérification d'email valide
  var regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  var testEmail = req.body.email;
  if(regexEmail.test(testEmail) != true){
    error.emailNotValid = 'Email invalide'
  }

  // Vérification de mot de passe valide - 8 caractères et 1 lettre
  var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  var testPassword = req.body.password;
  if(regexPassword.test(testPassword) != true){
    error.passwordNotValid = 'Il faut 8 caractères et 1 chiffre'
  }
  }

  if(Object.keys(error).length == 0){
    var salt = uid2(32)

    var newUser = new usersModel({
      firstName: req.body.firstName,
      email: req.body.email,
      role: '', //reader ou editor
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
  }
  
  console.log(error)
  res.json({result, token, error})
})

/* Route POST SIGN-IN */
router.post('/sign-in', async (req, res, next) => {

  console.log(req.body)

  var error = {};
  var result = false;
  var token = null;
  var user = null;
  
  //Vérification champs non vides
  if(req.body.email == '' || req.body.password == ''){
    error.emptyField = 'Le champ est vide'

    //Vérification email
    if(Object.keys(error).length == 0){
      const user = await usersModel.findOne({
      email: req.body.email
      })
    }  
    
    //Vérification Mot de passe correcte
    if(user){
      const passwordEncrypt = SHA256(req.body.password + user.salt).toString(encBase64)

      if(passwordEncrypt == user.pwd){
        result = true
        token = user.token
      } else {
        result = false
        error.password = 'email ou mot de passe incorrects'
      }
    } else {
      error.email = 'email inexistant'
    }
  }
  res.json({result, token, error})
})

module.exports = router;
