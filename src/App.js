import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ConfigureStore from './redux/configureStore';
import AsyncApp from './components/TagContainerComponent';
import FlashMessage from './components/Utility/FlashMessage';
import UserAction from './components/Utility/UserActions'

require('dotenv').config()

export const store = ConfigureStore();

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main />

        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
