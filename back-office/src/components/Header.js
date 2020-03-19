import React from 'react';
import logo from '../logoOrigapp_detoure.png';
import '../App.css';
import color from './color'

function Header() {

    


  return (
    <div style = {{display:'flex',flexDirection:'row', paddingBottom:20, paddingLeft:20, paddingTop:20,marginBottom:30, backgroundColor:'white', alignItems:'center',borderBottomColor:color('red'),borderBottomWidth:1,borderBottomStyle:'solid'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p style = {{fontSize:20, textAlign:'left',fontSize:50, color: color('red'), paddingLeft:30}}> Origapp
        </p>
    </div>
  );
}

export default Header;
