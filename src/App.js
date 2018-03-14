/*global chrome*/
// document.getElementsByClassName('box')[0].children[0].innerHTML.split(" ")[0];

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import moment from 'moment'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const months = [
  { value: '1', label: 'Januari' },
  { value: '2', label: 'Februari' },
  { value: '3', label: 'Maart' },
  { value: '4', label: 'April' },
  { value: '5', label: 'Mei' },
  { value: '6', label: 'Juni' },
  { value: '7', label: 'Juli' },
  { value: '8', label: 'Augustus' },
  { value: '9', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: months[0],
      recupHours: 0,
      recupDays: 0,
      loggedIn: false
    }
  }

  componentDidMount() {
    this.setState({ selectedMonth: months[0] })
    this.getWorkedHoursFromMonth(months[0]);
  }


  getWorkedHoursFromMonth(startMonth) {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.getAuthenticatedUser("https://timesheets.cronos.be/", "timesheetapp_user_authenticateduser").then((res) => {


      console.log(res);

      if (res === null) {
        this.setState({ loggedIn: false });
      } else {
        this.setState({ loggedIn: true });

        let year = new Date().getFullYear()
        if (startMonth > moment().month()) {
          year -= 1;
        }

        const from = moment([year, startMonth - 1, 1]).format("YYYYMMDD");
        const to = moment().date(0).format('YYYYMMDD');

        // console.log('Vanaf: ' + from);
        // console.log('Tot: ' + to);

        this.fetchHoursWorkedByPeriod(from, to, res.value.split("%22")[3]);
      }
    });
  }

  fetchHoursWorkedByPeriod(from, to, token) {
    fetch('https://tiaapi.cronos.be/timesheet/period/rypenai/' + from + '/' + to, {
      headers: {
        'Authorization': 'Access_token ' + token,
        'X-ApiKey': 'b1d18499-fcab-416e-9787-1fc679622d5c'
      }
    })
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {

        let normalHours = 0;
        let baseDays = 0;

        let scannedDates = [];

        jsonResult.forEach(code => {
          code.entries.forEach(entry => {
            normalHours += entry.normalHours;

            if (!scannedDates.includes(entry.date)) {
              scannedDates.push(entry.date);
              baseDays += 1;
            }
          });
        });

        normalHours = parseFloat(normalHours).toFixed(2);
        let recupHours = parseFloat((normalHours) - (baseDays * 7.6)).toFixed(2);
        let recupDays = parseFloat(recupHours / 7.6).toFixed(1);

        // console.log('Recup hours: ' + recupHours);
        // console.log('Recup days: ' + recupDays);

        this.setState({ recupHours: recupHours, recupDays: recupDays, fetched: true });
      })
  }

  handleMonthDropdown = (sm) => {
    this.setState({ selectedMonth: sm })
    this.getWorkedHoursFromMonth(sm.value);
  }

  render() {
    const { selectedMonth, recupDays, recupHours, loggedIn } = this.state;
    let vacationGraphics = [];

    for (var i = 0; i < parseFloat(recupDays).toFixed(1); i++) {
      vacationGraphics.push((<img style={{ width: 25 }} src="http://www.rypens.be/upload/files/palmtree.png" />));
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recup<br />Sinds</h1>
          <Dropdown options={months} onChange={this.handleMonthDropdown} value={selectedMonth} placeholder="Selecteer startmaand" />
          <h2>{recupDays} dagen</h2>
          {vacationGraphics}
        </header>
        {loggedIn ? '' : <p style={{ color: 'red' }}>Log in op timesheets.cronos.be!</p>}
      </div>
    );
  }
}

export default App;
