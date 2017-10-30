import React from 'react';
// import { Link } from 'react-router-dom';
// import Axios from 'axios';

// import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';

class GigsShow extends React.Component {

  state = {
    gig: {},
    appId: 'gigsTime'
  }

  componentWillMount() {
    console.log(this.props.gigs);
  }

  render() {
    return(
      <div>
        <h1>Gig show!</h1>
        <GoogleMap gigs={[this.state.gig]} />
      </div>
    );
  }
}

export default GigsShow;
