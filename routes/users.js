var express = require('express');
var router = express.Router();
var usersModel = require('../model/users');
const nodemailer = require("nodemailer");
var email = require('../model/email.js')
var cred = email.cred()
console.log('CRED',cred)

// CryptotF3wu5s5ND0D5W3jSQ4NATIjdyRTj1tA
var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64');
const { updateOne, findOne, getMaxListeners } = require('../model/users');

//Global CheckPwd condition
const toCheckPwd = (pwd)=>{
    var isOk = false
    var error = ''
    // Vérification de mot de passe valide - 8 caractères dont 1 chiffre
    var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
    if (regexPassword.test(pwd) != true) {
        error = 'Au moins 8 caractères dont 1 chiffre'
    }else{
        isOk=true
    }
    return {isOk,error}
}

//Globale Functiun to encrypt pwd
const toEncryptPwd =(pwd)=>{
    var salt = uid2(32)
    var token= uid2(32)
    var encryptedPwd = SHA256(pwd + salt).toString(encBase64)
    return {pwd : encryptedPwd,salt:salt,token:token}
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('un message');
});

/* POST Forget PWD. */
router.post('/newPwd/:step', async function(req, res, next) {
    console.log('HEY newPwd',req.params,req.body)
    
    var result ='ko'
    var step=parseInt(req.params.step)
    var resetCode
    var email = req.body.email.toLowerCase().trim() 
    var prenom=""
    if(step==0){  
        var isEmailOk = await usersModel.findOne({email:email})
        
        console.log('email?',isEmailOk)
        if(isEmailOk!=null) {
            prenom=isEmailOk.firstName
            resetCode= `${Math.floor(Math.random()*10+1)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`
            console.log('code',resetCode,parseInt(resetCode))
            await usersModel.updateOne({email:email},{resetCode:resetCode})
           //ENVOYER EMAIL Function 
            async function main() {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    // // host: "smtp.rougesabot.email", //localhost par defaut
                    // port: 587,
                    // secure: false, // true for 465, false for other ports
                    service: 'gmail',
                    auth: {
                    user: cred.login,
                    pass: cred.pwd, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"OrigApp" <rougesabot@gmail.com>', // sender address
                    to: "remiserougne@yahoo.fr", // list of receivers
                    subject: `Réinitialisation du mot de passe`, // Subject line
                    text: `Réinitialisation du mot de passe`, // plain text body
                    html: `<p>Bonjour ${prenom},</p><p>Voici le code pour réinitialiser votre mot de passe : <b>${resetCode}</b></p>
                    <p>Bonne continuation sur <b>OrigApp</b>.</p>`, // html body
                });
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
                // Preview only available when sending through an Ethereal account
                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
        main().catch(console.error);
        result='ok'
          }else{
              result='Veuillez renseigner un e-mail valide'
          }
          
        
    }else if(step==1){
        var regex = /[0-9]+/
        var isNumber = regex.test(req.body.code)
        console.log("isNumber",isNumber)
        if(isNumber){
            var code =parseInt(req.body.code)
            console.log('type of',typeof code)
            var checkCode=await usersModel.findOne({email:email, resetCode:code})
            console.log('checkcode',code, checkCode)
            if(checkCode){
                result='ok'
                console.log('exist')
                res.json({result});
            }else{
                result="Ce code est inconnu"
                res.json({result});
            }
        }else{
            result="Seuls des chiffres sont attendus"
        }
    }else if(step==2){
        console.log('STEP3')
        var checking=toCheckPwd(req.body.pwd)
        console.log("check?",checking)
        if(checking.isOk){
            var pwdGlobal = toEncryptPwd(req.body.pwd)
            var updatePwd = await usersModel.updateOne({ email: email}, {
                pwd: pwdGlobal.pwd,
                salt: pwdGlobal.salt,
                token: pwdGlobal.token
            })
            var prenom=await usersModel.findOne({email:email},{firstName:1, _id:0})
            console.log('PWD STEP 3',pwdGlobal,prenom)
            result='Nouveau mot de passe enregistré'
            res.json({result,token : pwdGlobal.token,firstName: prenom.firstName});
        }else{
            res.json({result:'ko',error : checking.error});
        }
       
    }else{
        result='Malheureusement, nous rencontrons un problème, merci d\'essayer ultérieurement. Si le problème persite, contactez nous par mail.'
    }
    res.json({result});
});


/* Route POST SIGN-UP */
router.post('/sign-up', async(req, res, next) => {

    req.body.email = req.body.email.toLowerCase().trim();
    // console.log("////////////////////////////////////////////",req.body)
    var error = {};
    var result = false;
    var token = null;
    var saveUser = null;
    var prenom = null;

    //Vérification d'email unique
    const searchEmail = await usersModel.findOne({
        email: req.body.email
    })

    if (searchEmail != null) {
        error.email = "Email déjà existant";
        res.json({ result, error })
    } else if (req.body.firstName == '' ||
        req.body.email == '' ||
        req.body.password == '') {

        //Vérification de champs non vides
        error.emptyField = 'Champs obligatoires'
        res.json({ result, error })
    } else {
        // Vérification d'email valide
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
        var testEmail = req.body.email;
        if (regexEmail.test(testEmail) != true) {
            error.emailNotValid = 'Email invalide'
            res.json({ result, error })
        }

        // Vérification de mot de passe valide - 8 caractères dont 1 chiffre
        var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
        var testPassword = req.body.password;
        if (regexPassword.test(testPassword) != true) {
            error.passwordNotValid = 'Au moins 8 caractères dont 1 chiffre'
            res.json({ result, error })
        } else {
            var salt = uid2(32)
            var newUser = new usersModel({
                firstName: req.body.firstName,
                email: req.body.email,
                role: '', //reader ou editor
                pwd: SHA256(req.body.password + salt).toString(encBase64),
                salt: salt,
                token: uid2(32),
                myLibrairy: [],
                lastRead: [],
                comments: []
            })

            saveUser = await newUser.save()

            if (saveUser) {
                result = true
                token = saveUser.token
                prenom = saveUser.firstName
                res.json({ result, token, prenom, error })
            } else {
                res.json({ result, token, prenom, error })
            }
        }
    }
});

/* Route POST SIGN-IN */
router.post('/sign-in', async(req, res, next) => {

    console.log("SIGNIN!", req.body, req.params)
    var from = req.body.from
    req.body.email = req.body.email.toLowerCase().trim();
    // console.log(req.body)

    var error = {};
    var result = false;
    var token = null;
    var user = null;
    var prenom = null;
    var publisher = null

    //Vérification champs non vides
    if (req.body.email == '') {
        error.emptyFieldMail = 'Ce champ est obligatoire'
    } else if (req.body.password == '') {
        error.emptyFieldPwd = 'Ce champ est obligatoire'
    } else {

        //Vérification email
        if (req.body.from == "web") {
            var user = await usersModel.findOne({
                email: req.body.email,
                role: "admin"
            })

            console.log("USER admin", user)

        } else {
            var user = await usersModel.findOne({
                email: req.body.email
            })
            console.log("USER lammbda", user)
        }

        if (!user) {
            result = false
            error.email = 'e-mail inconnu'
        } else {
            const passwordEncrypt = SHA256(req.body.password + user.salt).toString(encBase64)
            console.log(user.pwd + ' compare ' + passwordEncrypt)

            if (passwordEncrypt == user.pwd) {
                result = true
                token = user.token
                prenom = user.firstName
                publisher = user.publisher
            } else {
                result = false
                error.password = 'mot de passe incorrect'
            }
        }
    }

    console.log("TOKEN", token)
    res.json({ result, token, prenom, error, publisher })
})

//Update Name
router.post('/updateUser/:token', async(req, res, next) => {
    console.log("UpDAteNmae", req.body, req.params)

    var result = "ko"
    var mess = "Aucune modification apportée"
    var type = "info"

    var resp = await usersModel.updateOne({ token: req.params.token }, { firstName: req.body.name })
    console.log("resp", resp)
    if (resp.nModified == 1) {
        result = "ok";
        mess = "Prénom mis à jour"
        type = "success"
        res.json({ result: result, mess, type })
    } else {
        res.json({ result: result, mess, type })
    }
})

///// ROUTE PARAMS

router.get('/logout/:token', async(req, res, next) => {

    // console.log("route params",req.params)
    var token = req.params.token
    var userFind = await usersModel.findOne({ token: req.params.token })
    var user = userFind.firstName
    var result = true
    res.json({ result, user })
        // console.log("prenom user envoyé au front", result, token, user)
})

router.post('/update/:token', async(req, res, next) => {
    // console.log("update params&body",req.params, req.body)
    // Vérification de mot de passe valide - 8 caractères dont 1 chiffre
    var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var testPassword = req.body.pwd1;
    if (regexPassword.test(testPassword) != true) {
        var mess = 'Le mot de passe doit avoir au moins 8 caractères dont 1 chiffre'
        res.json({ result: "ko", mess });
    } else {

        if (req.body.pwd1 == req.body.pwd2) {
            if (req.body.pwd1 != "") {
                console.log("IF salt")
                var updatedToken = uid2(32)
                var salt = uid2(32)
                console.log("salt", salt, "updateToken", updatedToken)
                var userFind = await usersModel.updateOne({ token: req.params.token }, {
                    pwd: SHA256(req.body.pwd1 + salt).toString(encBase64),
                    salt: salt,
                    token: updatedToken
                })
                console.log("is it ok?", userFind)
                var mess = "Mot de passe mis à jour"

                res.json({ result: "ok", token: updatedToken, mess });
            } else {
                var mess = "Champs vides, réessayer..."
                res.json({ result: "ko", mess });
            }

        } else {
            var mess = "Mots de passe différents, réessayer..."
            res.json({ result: "ko", mess });
        }
    }
})

module.exports = router;