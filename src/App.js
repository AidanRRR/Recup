/*global chrome*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  callBackgroundPage() {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.getAuthenticatedUser("https://timesheets.cronos.be/", "timesheetapp_user_authenticateduser").then((res) => {
      this.fetchHoursWorkedThisMonth();
    });
  }

  fetchHoursWorkedThisMonth() {
    fetch('https://tiaapi.cronos.be/timesheet/period/rypenai/20180301/20180331', {
      headers: {
        'Authorization': 'Access_token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiJyeXBlbmFpIiwiaXNzIjoiaHR0cHM6Ly90aWFhcGkuY3Jvbm9zLmJlIiwiYXVkIjoiaHR0cHM6Ly90aWFhcGkuY3Jvbm9zLmJlIiwiZXhwIjoxNTIxMDU3Mjk1LCJuYmYiOjE1MjEwNTAwOTV9.mASgUoXTZwgpeVb2xrR9YgVq8hYK5YjdDD1RHePne6Q',
        'X-ApiKey': 'b1d18499-fcab-416e-9787-1fc679622d5c'
      }
    })
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {
        // Do something with the result
        console.log(jsonResult);
      })
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
