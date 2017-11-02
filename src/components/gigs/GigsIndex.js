import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';

class GigsIndex extends React.Component {

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
  deleteGig = (gig) => {
    console.log(gig);
    Axios
      .delete(`/api/profile/gigs/${gig._id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ gigs: res.data.gigs }, () => console.log(this.state.gigs)))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <h1>Gig index!</h1>
        {this.state.gigs.length > 0 && <GoogleMap gigs={this.state.gigs} /> }
        {this.state.gigs.map(gig =>
          <div key={gig._id}>
            <hr/>
            {gig.venue && <p>{gig.venue.name}</p>}
            <p>{gig.lineup}</p>
            <button onClick={() => this.deleteGig(gig)}>Delete</button>
            <hr/>
          </div>
        )}
      </div>
    );
  }
}

export default GigsIndex;
