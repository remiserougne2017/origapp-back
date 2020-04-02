import React from 'react';
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import color from './color'
import { LogoutOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'


function Header(props) {
  return (
    <div style = {{display:'flex',flexDirection:'row', paddingBottom:20, paddingLeft:20, 
      paddingTop:20,marginBottom:1, alignItems:'center',borderBottomColor:color('red'),
      borderBottomWidth:1,borderBottomStyle:'solid'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p style = {{fontSize:30, textAlign:'left', color: color('red'), paddingLeft:30}}> Origapp
        </p>
        <div style={{display:"flex",marginLeft:"auto",marginRight:40}}>
        <LogoutOutlined onClick={()=>{console.log('logOut');props.deletePublisher();props.deleteToken()}} />
        </div>
       
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
    deleteToken: function(token){
      dispatch({type: 'deleteToken'})
    },
    deletePublisher: function(publisher){
      dispatch({type: 'deletePublisher'})
    }
  }
}

export default connect(null,mapDispatchToProps)(Header)
