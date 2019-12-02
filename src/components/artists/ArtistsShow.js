import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';
// import Moment from 'react-moment';

import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';

class ArtistsShow extends React.Component {

  state = {
    gigs: [],
    gigsSaved: [],
    appId: 'e00e7701bd747c53beec09c4d2d63bba',
    city: '',
    country: '',
    active: false
  }

  setCountry = (e) => {
    this.setState({ country: e.target.value });
  }

  componentWillMount() {
    const params = this.props.match.params;
    Axios
      .get(`https://rest.bandsintown.com/artists/${params.name}/events`, {
        params: { app_id: this.state.appId }
      })
      .then(res => {
        this.setState({ gigs: res.data });
        console.log(res.data);
      })
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
    Axios
      .get('/api/profile/gigs', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ gigsSaved: res.data.gigs }, () => console.log(this.state.gigsSaved)))
      .catch(err => console.log(err));
  }

  saveGig(gig) {
    Axios
      .post('/api/profile/gigs', { id: gig.id, lineup: gig.lineup, venue: {name: gig.venue.name, longitude: gig.venue.longitude, latitude: gig.venue.latitude}, city: gig.venue.city, datetime: gig.datetime } , {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ gigsSaved: res.data.gigs }, () => console.log(this.state.gigsSaved)))
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  saved(gig){
    return this.state.gigsSaved.find(gigSaved => gig.id === gigSaved.id);
  }

  toggleGig(gig){
    if(this.saved(gig)) return false;
    this.saveGig(gig);
  }


  render() {
    const countries = Array.from(new Set(this.state.gigs.map(gig => gig.venue.country).sort()));
    const gigs = this.state.gigs.filter(gig => gig.venue.country === this.state.country || !this.state.country);
    // const gigsByCountry = this.state.gigs.filter(gig => gig.venue.city === this.state.city || !this.state.city);
    return (
      <div>
        <div className="row">
          {this.state.gigs.length===0 &&
            <div>
              <img className="img-responsive" src="http://www.benlevin.net/site_images/blog/NICK_DRUM_ROUGH.gif"></img>
              {/* <img src="http://78.media.tumblr.com/17e29c9cfb802c1e65a556dcc46545f8/tumblr_orjaxrztTW1u5lqbno1_500.gif"></img> */}
              <h1 className="title">This artist has no gigs coming up...</h1>
            </div>}
          {this.state.gigs.length>0 && <GoogleMap gigs={gigs} /> }
          {this.state.gigs.length>0 &&
          <div className="col-md-4">
            <select className="form-control title" onChange={this.setCountry} value={this.state.country} name="filter">
              <option key="all" value="">All countries</option>
              {countries.map(country =>
                <option key={country} value={country}>{country}</option>
              )}
            </select>
          </div>}
          <div className="col-md-4 scroll">
            {gigs.map(gig =>
              <div key={gig.id}>
                <p><strong className="title">Lineup : </strong><small>{gig.lineup.toString()}</small></p>
                {/*<p><strong className="title">Date : </strong><small><Moment format="MMMM Do YYYY, h:mm a">{gig.datetime}</Moment></small></p>*/}
                <p><strong className="title">Country : </strong><small>{gig.venue.country}</small></p>
                <p><strong className="title">City : </strong><small>{gig.venue.city}</small></p>
                <p><strong className="title">Venue : </strong><small>{gig.venue.name}</small></p>
                {gig.offers.map((offer, index) => <a key={index} href={offer.url} target="_blank">Buy Tickets</a>)}

                <p><a href="#"><span className={this.saved(gig) ? 'glyphicon glyphicon-heart': 'glyphicon glyphicon-heart-empty'} aria-hidden="true" onClick={() => {
                  this.toggleGig(gig);
                }}></span></a></p>
                <hr/>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ArtistsShow;
