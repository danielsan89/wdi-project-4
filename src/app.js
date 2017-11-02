import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/utility/Routes';
import Navbar from './components/utility/NavBar';

import 'bootstrap-css-only';
import './scss/style.scss';


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar/>
          </header>
          <main>
            <Routes/>
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
