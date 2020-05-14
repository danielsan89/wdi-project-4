import React from 'react';
import Axios from 'axios';
import Moment from 'react-moment';
import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';
import env from '../../../config/environment';

class GigsIndex extends React.Component {

  state = {
    savedGigs: [],
    appId: env.bandsInTownAppId
    }

  componentDidMount() {
    Axios
      .get('/api/profile/gigs', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ savedGigs: res.data.gigs }))
      .catch(err => console.log(err));
  }
  deleteGig = (gig) => {
    Axios
      .delete(`/api/profile/gigs/${gig._id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ savedGigs: res.data.gigs }))
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.savedGigs.length){
      return(
        <div className="row">
          <div id="gigsIndexGoogleMap google-map">
            <h1 className="title">Saved gigs!</h1>
            <GoogleMap gigs={this.state.savedGigs} />
          </div>
          <div className="col-md-4 scroll show-list">
            {this.state.savedGigs.map(gig =>
              <div key={gig.id}>
                <p><strong className="title">Lineup : </strong><small>{gig.lineup.toString()}</small></p>
                <p><strong className="title">Date : </strong><small><Moment format="MMMM Do YYYY, h:mm a">{gig.datetime}</Moment></small></p>
                <p><strong className="title">Country : </strong><small>{gig.country}</small></p>
                <p><strong className="title">City : </strong><small>{gig.city}</small></p>
                <p><strong className="title">Venue : </strong><small>{gig.venue.name}</small></p>
                {gig.tickets ?
                  <p><a href={gig.tickets} target="_blank">Buy Tickets</a></p>
                  :
                  <p><strong className="title">SOLD OUT!</strong></p>}
                <button className="btn btn-danger" onClick={() => this.deleteGig(gig)}>Delete</button>
                <hr />
              </div>
            )}
          </div>
        </div>
    )} else {
      return (
        <div className="row">
          <div className="container">
            <img className="img-responsive" src="../../assets/userNoGigs.jpg"></img>
            <h1 className="title">You have no gigs coming up!</h1>
          </div>
        </div>
      )
    }
  }
}

export default GigsIndex;
