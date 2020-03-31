import React, {useState} from 'react';
import '../App.css';
import {Input,Button} from 'antd';
import {Link, Redirect} from 'react-router-dom'
// import {connect} from 'react-redux'
import background from '../origami_background.jpg';

function SignInUp(props) {

    const [factotoryName,setFactoryName] =useState('')
  const [signUpUsername, setSignUpUsername] = useState('')
  const [lastName,setLastName]  = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpPassword2, setSignUpPassword2] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  var handleSubmitSignup = async () => {
    
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
    })

    const body = await data.json()

    if(body.result == true){
    //   props.addToken(body.token)
      setUserExists(true)
      
    } else {
      setErrorsSignup(body.error)
    }
  }

  var handleSubmitSignin = async () => {
 
    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result == true){
    //   props.addToken(body.token)
      setUserExists(true)
      
    }  else {
      setErrorsSignin(body.error)
    }
  }

  if(userExists){
    return <Redirect to='/Home' />
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<p>{error}</p>)
  })

  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

  

  return (
    <div className="Login-page" style = {{backgroundImage: `url(${background})` }}>
          {/* SIGN-IN */}

          <div className="Sign">
              <h6>Connexion</h6>
                  
            <Input onChange={(e) => setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />

            <Input.Password onChange={(e) => setSignInPassword(e.target.value)} className="Login-input" placeholder="password" />
            
            {tabErrorsSignin}

            <Button onClick={() => handleSubmitSignin()}  style={{width:'80%'}} type="primary">Se connecter</Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
            <h6>Création d'un compte</h6> 
            <Input onChange={(e) => setFactoryName(e.target.value)} className="Login-input" placeholder="Maison d'édition" />   
            <Input onChange={(e) => setSignUpUsername(e.target.value)} className="Login-input" placeholder="Prénom" />
            <Input onChange={(e) => setLastName(e.target.value)} className="Login-input" placeholder="Nom" />

            <Input onChange={(e) => setSignUpEmail(e.target.value)} className="Login-input" placeholder="Adresse mail" />

            <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} className="Login-input" placeholder="Saisir un mot de passe" />
            <Input.Password onChange={(e) => setSignUpPassword2(e.target.value)} className="Login-input" placeholder="Vérifier le mot de passe" />
      
            {tabErrorsSignup}

            <Button onClick={() => handleSubmitSignup()} style={{width:'80%'}} type="primary">Créer son compte</Button>

          </div>

      </div>
  );
}

// function mapDispatchToProps(dispatch){
//   return {
//     addToken: function(token){
//       dispatch({type: 'addToken', token: token})
//     }
//   }
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(SignInUp)

export default SignInUp