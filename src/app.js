import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/utility/Routes';

import 'bootstrap-css-only';
import './scss/style.scss';


class App extends React.Component {

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
