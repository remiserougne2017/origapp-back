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

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [errorMess,setErrorMess] =useState({})
 

  var handleSubmitSignin = async () => {
    console.log("HEY!!")
 
    const data = await fetch('users/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}&from=web`
    })
    
    let body = await data.json()
    console.log("RESP SIGN",body)
    if(body.result == true){
    //   props.addToken(body.token)
     
      console.log("TO reducer",body.token,body.publisher)
      props.addToken(body.token)
      props.addPublisher(body.publisher)
      setUserExists(true)
      setSignInPassword("")
    }  else {
      setErrorMess(body.error)
    }
  }

  if(userExists){
    
    return <Redirect to={`/Home`}/>
  }  

  return (
    <div style = {{flex:1,flexDirection:"column",backgroundImage: `url(${background})`,height:"100vh",alignItems:"center" }}>
      <div style = {{display:'flex',flexDirection:'row', paddingBottom:20, paddingLeft:20,
       paddingTop:20,marginBottom:30, alignItems:'center',borderBottomColor:color('red'),borderBottomWidth:1,borderBottomStyle:'solid'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p style = {{fontSize:30, textAlign:'left',color: color('red'), paddingLeft:30}}> Origapp
        </p>
      </div>
      {/* SIGN-IN */}
      <div style={{display:"flex", justifyContent:"center",alignItems:"center",height:"60%"}}>
        <div className="Sign">
            <h6>Connexion</h6>
                
          <Input onChange={(e) => setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />
          <p style={{fontStyle:'italic',color:'red'}}>{errorMess.email?errorMess.email:null}</p>
          <Input.Password onChange={(e) => setSignInPassword(e.target.value)} className="Login-input" placeholder="mot de passe" value={signInPassword} />
          <p style={{fontStyle:'italic',color:'red'}}>{errorMess.password?(errorMess.password):null}{errorMess.emptyFieldPwd?(errorMess.emptyFieldPwd):null}</p>
          <Button onClick={() =>{handleSubmitSignin();setSignInPassword('')}}  style={{marginTop:15,width:'20%'}} type="primary">Se connecter</Button>

        </div>
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