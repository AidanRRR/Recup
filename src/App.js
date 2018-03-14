/*global chrome*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  callBackgroundPage() {
    var bgPage = chrome.extension.getBackgroundPage();
    var dat = bgPage.getAuthenticatedUser("https://timesheets.cronos.be/", "timesheetapp_user_authenticateduser", function (id) {
      console.log('Hi');
      console.log(id);
    });
  }

  render() {

    this.callBackgroundPage();

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">6 Dagen recup deze maand!</h1>
        </header>
      </div>
    );
  }
}

export default App;
