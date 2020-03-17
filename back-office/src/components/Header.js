import React from 'react';
import logo from '../logoOrigapp_detoure.png';
import '../App.css';

function Header() {

    


  return (
    <div style = {{display:'flex',flexDirection:'row', marginBottom:60}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Origapp
        </p>
    </div>
  );
}

export default Header;
