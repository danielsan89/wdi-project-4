import React from 'react';

const Footer = () => {

  return(
    // <nav className="navbar fixed-bottom navbar-light bg-light">
    //   <div className="container">
    //     <a className="navbar-brand" href="#">Sticky top</a>
    //   </div>
    // </nav>
    <footer className="navbar navbar-inverse navbar-fixed-bottom">
      <div className="container">
        <strong>Gigs! &copy;</strong>
        <a href="https://github.com/danielsan89">
          <img className="nav-icon" src="https://image.flaticon.com/icons/svg/25/25231.svg" alt="github"/>
        </a>
        <strong>Daniel I.</strong>
      </div>
    </footer>
  );
};

export default Footer;
