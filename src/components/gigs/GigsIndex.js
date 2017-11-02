import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';
// import GoogleMap from '../google/GoogleMap';

class GigsShow extends React.Component {

  state = {
    gigs: [],
    appId: 'gigsTime'
  }

  componentDidMount() {
    Axios
      .get('/api/profile/gigs', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ gigs: res.data.gigs }, () => console.log(this.state.gigs)))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <h1>Gig index!</h1>
        {this.state.gigs.map(gig =>
          <div key={gig.id}>
            <p>{gig.venue}</p>
            <p>{gig.lineup}</p>
          </div>
        )}
      </div>
    );
  }
}

export default GigsShow;
