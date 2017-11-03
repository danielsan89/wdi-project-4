import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/utility/Routes';
import Navbar from './components/utility/NavBar';
import Footer from './components/utility/Footer';
// import Auth from './lib/Auth';
//
// import OAuthButton from './components/auth/OAuthButton';

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
            {/* <div>
              <button type="button" className="btn btn-secondary btn-lg btn-block">
                {!Auth.isAuthenticated() && <OAuthButton provider="spotify">
                  <span className="title">login with</span>
                  <img id="spotify" src="http://marilynscott.com/wp-content/uploads/2016/03/spotify-icon-22.png"/>
                </OAuthButton>}</button>

            </div> */}
            <Routes/>
          </main>

          <Footer />

        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
