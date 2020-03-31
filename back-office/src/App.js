import React,{useState,useEffect} from 'react';
import './App.css';
import Home from './components/Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Book from './components/Book';
import Sign from './components/sign';
import token  from './reducer/reducer-token'
import publisher  from './reducer/reducer-publisher'
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({token,publisher}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {


  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component = {Sign}/>
          <Route path="/Home" exact component={Home} />
          <Route path={"/openbook/:idBook"} exact component={Book} />

        </Switch>
      </Router>
   </Provider>

  );
}

export default App;









// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
