import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

import OAuthButton from '../auth/OAuthButton';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <Link to="/"><a className="navbar-brand" href="#"><span className="glyphicon glyphicon-headphones" aria-hidden="true"></span></a></Link>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li>
              {Auth.isAuthenticated() && <Link to="/">home</Link>}
              {!Auth.isAuthenticated() && <Link to="/">home</Link>}
            </li>
            <li>{Auth.isAuthenticated() && <Link to="/artists">myartists</Link>}</li>
            <li>{Auth.isAuthenticated() && <Link to="/profile/gigs">mygigs <span className="badge">12</span></Link>}</li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              {!Auth.isAuthenticated() && <OAuthButton provider="spotify">
                login
                <img src="http://marilynscott.com/wp-content/uploads/2016/03/spotify-icon-22.png"/>
              </OAuthButton>}
            </li>
            <li>{Auth.isAuthenticated() && <a href="#" onClick={logout}>logout</a>}</li>
            {/* <form className="navbar-form">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
