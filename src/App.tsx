import React, { Component } from 'react';
import { Provider } from 'react-redux';

import '@pearlchain/powergrid/web/powergrid.css';
import 'bootstrap/scss/bootstrap.scss';
import './App.css';

import SuperForm from './SuperForm';
import { store } from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SuperForm/>
      </Provider>
    );
  }
}

export default App;
