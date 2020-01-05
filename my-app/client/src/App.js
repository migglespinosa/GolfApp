import React, { Component } from 'react';
import {Provider} from 'react-redux';
import MainLoginContainer from './MainLoginContainer'
import logo from './logo.svg';
import './App.css';
import store from './Redux/store';

class App extends Component{

  render(){
    return(
      <Provider store={store}>
        <MainLoginContainer/>
      </Provider>
    )
  }
}

export default App;
