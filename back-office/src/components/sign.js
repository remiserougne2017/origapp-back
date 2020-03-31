import React, {useState} from 'react';
import '../App.css';
import {Input,Button} from 'antd';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import background from '../origami_background.jpg';
import Header from './Header'
import logo from '../logoOrigapp_detoure.png';
import color from './color'

function SignInUp(props) {

    const [factotoryName,setFactoryName] =useState('')
  const [signUpUsername, setSignUpUsername] = useState('')
  const [lastName,setLastName]  = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpPassword2, setSignUpPassword2] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const  [publisher,setPublisher] =useState()
  const [userExists, setUserExists] = useState(false)
const [errorMess,setErrorMess] =useState({})
  // const [listErrorsSignin, setErrorsSignin] = useState()
  // const [listErrorsSignup, setErrorsSignup] = useState()

  // var handleSubmitSignup = async () => {
    
  //   const data = await fetch('/sign-up', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //     body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
  //   })

  //   const body = await data.json()

  //   if(body.result == true){
  //   //   props.addToken(body.token)
  //     setUserExists(true)
      
  //   } else {
  //     setErrorsSignup(body.error)
  //   }
  // }

  var handleSubmitSignin = async () => {
 
    const data = await fetch('users/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}&from=web`
    })

    const body = await data.json()
console.log("RESP SIGN",body)
    if(body.result == true){
    //   props.addToken(body.token)
    setPublisher(body.publisher)
     
      console.log("TO reducer",body.token,body.publisher)
      props.addToken(body.token)
      props.addPublisher(body.publisher)
      setUserExists(true)
      
    }  else {
      setErrorMess(body.error)
    }
  }

  if(userExists){
    return <Redirect to={`/Home`}/>
  }

  // var tabErrorsSignin = listErrorsSignin.map((error,i) => {
  //   return(<p>{error}</p>)
  // })

  // var tabErrorsSignup = listErrorsSignup.map((error,i) => {
  //   return(<p>{error}</p>)
  // })

  

  return (
    <div style = {{flex:1,flexDirection:"column",backgroundImage: `url(${background})`,height:"100vh",alignItems:"center" }}>
      <div style = {{display:'flex',flexDirection:'row', paddingBottom:20, paddingLeft:20,
       paddingTop:20,marginBottom:30, alignItems:'center',borderBottomColor:color('red'),borderBottomWidth:1,borderBottomStyle:'solid'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p style = {{fontSize:20, textAlign:'left',fontSize:50, color: color('red'), paddingLeft:30}}> Origapp
        </p>
      </div>
      {/* SIGN-IN */}
      <div style={{display:"flex", justifyContent:"center",alignItems:"center",height:"60%"}}>
        <div className="Sign">
            <h6>Connexion</h6>
                
          <Input onChange={(e) => setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />
          <p style={{fontStyle:'italic',color:'red'}}>{errorMess.email?errorMess.email:null}</p>
          <Input.Password onChange={(e) => setSignInPassword(e.target.value)} className="Login-input" placeholder="password" value={signInPassword} />
          <p style={{fontStyle:'italic',color:'red'}}>{errorMess.password?(errorMess.password):null}{errorMess.emptyFieldPwd?(errorMess.emptyFieldPwd):null}</p>
          <Button onClick={() =>{handleSubmitSignin();setSignInPassword('')}}  style={{marginTop:15,width:'20%'}} type="primary">Se connecter</Button>

        </div>
    {/* SIGN-UP */}

        {/* <div className="Sign">
          <h6>Création d'un compte</h6> 
          <Input onChange={(e) => setFactoryName(e.target.value)} className="Login-input" placeholder="Maison d'édition" />   
          <Input onChange={(e) => setSignUpUsername(e.target.value)} className="Login-input" placeholder="Prénom" />
          <Input onChange={(e) => setLastName(e.target.value)} className="Login-input" placeholder="Nom" />

          <Input onChange={(e) => setSignUpEmail(e.target.value)} className="Login-input" placeholder="Adresse mail" />

          <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} className="Login-input" placeholder="Saisir un mot de passe" />
          <Input.Password onChange={(e) => setSignUpPassword2(e.target.value)} className="Login-input" placeholder="Vérifier le mot de passe" />
    
          {tabErrorsSignup}

          <Button onClick={() => handleSubmitSignup()} style={{width:'80%'}} type="primary">Créer son compte</Button>

        </div> */}
      </div>
      
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    },
    addPublisher: function(publisher){
      dispatch({type: 'addPublisher', publisher: publisher})
    }
  }
}

export default connect(null,mapDispatchToProps)(SignInUp)

// export default SignInUp