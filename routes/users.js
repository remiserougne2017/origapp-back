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
  var prenom = null;
  
  //Vérification d'email unique
  const searchEmail = await usersModel.findOne({
    email: req.body.email
  })

  if(searchEmail != null){
    error.email = "Email déjà existant";
    res.json({result, error})
  } else if (req.body.firstName == ''
  || req.body.email == ''
  || req.body.password == '' ){

  //Vérification de champs non vides
    error.emptyField = 'Champs obligatoires'
    res.json({result, error})
  }else{
     // Vérification d'email valide
  var regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  var testEmail = req.body.email;
  if(regexEmail.test(testEmail) != true){
    error.emailNotValid = 'Email invalide'
    res.json({result, error})
  }

  // Vérification de mot de passe valide - 8 caractères dont 1 chiffre
  var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  var testPassword = req.body.password;
  if(regexPassword.test(testPassword) != true){
    error.passwordNotValid = 'Au moins 8 caractères dont 1 chiffre'
    res.json({result, error})
    }else{
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
          prenom = saveUser.firstName
          res.json({result, token, prenom, error})      
        }else{
        res.json({result, token, prenom, error})   
        }
      }
    }
});

/* Route POST SIGN-IN */
router.post('/sign-in', async (req, res, next) => {

  console.log(req.body)

  var error = {};
  var result = false;
  var token = null;
  var user = null;
  var prenom = null; 
  
  //Vérification champs non vides
  if(req.body.email == '' ){
    error.emptyFieldMail = 'Ce champ est obligatoire'
  } else if( req.body.password == '') {
    error.emptyFieldPwd = 'Ce champ est obligatoire'
   }else{

      //Vérification email
      var user = await usersModel.findOne({
      email: req.body.email
      })  
    
    if(!user){
      result = false
      error.email = 'e-mail inconnu'
    }else{
      const passwordEncrypt = SHA256(req.body.password + user.salt).toString(encBase64)
      console.log(user.pwd+' compare '+passwordEncrypt)
      if(passwordEncrypt == user.pwd){
        result = true
        token = user.token
        prenom = user.firstName
      } else {
        result = false
        error.password = 'mot de passe incorrect'
      }
    } 
  }
    
  console.log(error)
  res.json({result, token, prenom, error})
})

//Update Name
router.post('/updateUser/:token', async (req,res,next)=>{
console.log("UpDAteNmae",req.body,req.params)

var result="ko"
var mess="Aucune modification apportée"
var type="info"

var resp = await usersModel.updateOne({token:req.params.token},
  {firstName:req.body.name})
  console.log("resp",resp)
  if(resp.nModified==1){
    result="ok";
    mess="Prénom mis à jour"
    type="success"
    res.json({result:result,mess,type})
  }else{
    res.json({result:result,mess,type})
  }
})

///// ROUTE PARAMS

router.get('/logout/:token', async (req, res, next) => {

  console.log("route params",req.params)
  var token = req.params.token
  var userFind = await usersModel.findOne({token:req.params.token})
  var user = userFind.firstName
  var result = true
  res.json({result, user})
  console.log("prenom user envoyé au front", result, token, user)
})

router.post('/update/:token', async (req, res, next)=>{
  console.log("update params&body",req.params, req.body)
 // Vérification de mot de passe valide - 8 caractères dont 1 chiffre
 var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 var testPassword = req.body.pwd1;
 if(regexPassword.test(testPassword) != true){
   var mess = 'Le mot de passe doit avoir au moins 8 caractères dont 1 chiffre'
   res.json({result: "ko",mess});
 }else{
   
  if(req.body.pwd1==req.body.pwd2){
    if(req.body.pwd1!=""){
      console.log("IF salt")
      var updatedToken = uid2(32)
      var salt =uid2(32)
      console.log("salt",salt,"updateToken",updatedToken)
      var userFind = await usersModel.updateOne({token:req.params.token},{
        pwd: SHA256(req.body.pwd1+salt).toString(encBase64),
        salt: salt,
        token:updatedToken
      })
      console.log("is it ok?",userFind)
      var mess="Mot de passe mis à jour"
    
      res.json({result: "ok",token:updatedToken,mess});
    }else{
      var mess="Champs vides, réessayer..."
      res.json({result: "ko",mess});
    }
   
  }else{
    var mess="Mots de passe différents, réessayer..."
    res.json({result: "ko",mess});
  }
}
})

module.exports = router;
