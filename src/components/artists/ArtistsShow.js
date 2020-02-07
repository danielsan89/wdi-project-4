import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import Moment from 'react-moment';
import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';

class ArtistsShow extends React.Component {

  state = {
    artistGigs: [],
    savedGigs: [],
    appId: 'e00e7701bd747c53beec09c4d2d63bba',
    city: '',
    country: '',
    active: false
  }

  setCountry = (e) => {
    this.setState({ country: e.target.value });
  }

  componentDidMount() {
    const params = this.props.match.params;
   
    this.getGigs(params);
    this.getSavedGigs();
  }

  getGigs(params){
    Axios
      .get(`https://rest.bandsintown.com/artists/${params.name}/events`, {
        params: { app_id: this.state.appId }
      })
      .then(res => this.setState({ artistGigs: res.data }))
      .catch(err => {
        if (err.response && err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      })
  }

  getSavedGigs() {
    Axios
      .get('/api/profile/gigs', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ savedGigs: res.data.gigs }))
      .catch(err => console.log(err));
  }

  saveGig(gig) {
    Axios
      .post('/api/profile/gigs', { id: gig.id, lineup: gig.lineup, venue: {name: gig.venue.name, longitude: gig.venue.longitude, latitude: gig.venue.latitude}, city: gig.venue.city, country: gig.venue.country, datetime: gig.datetime, tickets: gig.offers[0] ? gig.offers[0].url : '' } , {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ savedGigs: res.data.gigs }))
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  isSaved(gig){
    return this.state.savedGigs.find(gigSaved => gig.id === gigSaved.id);
  }

  toggleGig(gig){
    if(this.isSaved(gig)) return false;
    this.saveGig(gig);
  }


  render() {
    const countries = Array.from(new Set(this.state.artistGigs.map(gig => gig.venue.country).sort()));
    const gigs = this.state.artistGigs.filter(gig => gig.venue.country === this.state.country || !this.state.country);

    if (this.state.artistGigs.length){
      return (
        <div className="row">
          <GoogleMap gigs={gigs} />
          <div className="col-md-4">
            <select className="form-control title" onChange={this.setCountry} value={this.state.country} name="filter">
              <option key="all" value="">All countries</option>
              {countries.map((country, index) =>
                <option key={index} value={country}>{country}</option>
              )}
            </select>
          </div>
          <div className="col-md-4 scroll">
            {gigs.map(gig =>
              <div key={gig.id}>
                <p><strong className="title">Lineup : </strong><small>{gig.lineup.toString()}</small></p>
                <p><strong className="title">Date : </strong><small><Moment format="MMMM Do YYYY, h:mm a">{gig.datetime}</Moment></small></p>
                <p><strong className="title">Country : </strong><small>{gig.venue.country}</small></p>
                <p><strong className="title">City : </strong><small>{gig.venue.city}</small></p>
                <p><strong className="title">Venue : </strong><small>{gig.venue.name}</small></p>
                {gig.offers[0] ? 
                  <div>
                    <a href={gig.offers[0].url} target="_blank">Buy Tickets</a>
                    <p><a href="#"><span className={this.isSaved(gig) ? 'glyphicon glyphicon-heart' : 'glyphicon glyphicon-heart-empty'} aria-hidden="true" onClick={() => {
                      this.toggleGig(gig);
                    }}></span></a></p>
                  </div>
                  :
                  <p><strong className="title text-danger">SOLD OUT!</strong></p>}
                <hr />
              </div>
            )}
          </div>
        </div>
      )
    }else {
      return (
          <div className="row">
            <img className="img-responsive" src="../../assets/artistNoGigs.gif"></img>
            <h1 className="title">This artist has no gigs coming up...</h1>
          </div>
      );
    }
  }

}

export default ArtistsShow;
