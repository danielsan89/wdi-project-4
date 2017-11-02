import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';


import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';

class ArtistsShow extends React.Component {

  state = {
    gigs: [],
    appId: 'gigsTime',
    city: '',
    country: ''
  }

  setCity = (e) => {
    this.setState({ city: e.target.value });
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
  }

  // id: { type: String },
  // lineup: [ String ],
  // datetime: { type: String },
  // country: { type: String },
  // city: { type: String },
  // venue: { type: String },
  // latitude: { type: String },
  // longitude: { type: String }

  saveGig(gig) {
    console.log(gig);
    Axios
      .post('/api/profile/gigs', { lineup: gig.lineup, venue: gig.venue.name, city: gig.venue.city, latitude: gig.venue.latitude, longitude: gig.venue.longitude  } , {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => {
        console.log('RES', res.data);
        console.log(this.state.gigs);
      })
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }


  render() {
    const cities = Array.from(new Set(this.state.gigs.map(gig => gig.venue.city).sort()));
    const gigsByCity = this.state.gigs.filter(gig => gig.venue.city === this.state.city || !this.state.city);
    const gigsByCountry = this.state.gigs.filter(gig => gig.venue.city === this.state.city || !this.state.city);
    return (
      <div>
        <div className="row">
          {this.state.gigs.length>0 && <GoogleMap gigsByCity={gigsByCity} gigsByCountry={gigsByCountry} /> }
          {this.state.gigs.length>0 &&
          <div className="col-md-4">
            <select className="form-control title" onChange={this.setCity} value={this.state.city} name="filter">
              <option key="all" value="">All cities</option>
              {cities.map(city =>
                <option key={city} value={city}>{city}</option>
              )}
            </select>
          </div>}
          <div className="col-md-4" id="scroll">
            {gigsByCity.map(gig =>
              <div key={gig.id}>
                <p><strong className="title">Lineup : </strong><small>{gig.lineup.toString()}</small></p>
                <p><strong className="title">Date : </strong><small>{gig.datetime}</small></p>
                <p><strong className="title">Country : </strong><small>{gig.venue.country}</small></p>
                <p><strong className="title">City : </strong><small>{gig.venue.city}</small></p>
                <p><strong className="title">Venue : </strong><small>{gig.venue.name}</small></p>
                {gig.offers.map(offer => <a key={gig.id} href={offer.url} target="_blank">Buy Tickets</a>)}

                <p><a href="#"><span className="glyphicon glyphicon-heart-empty" aria-hidden="true" onClick={() => this.saveGig(gig)}></span></a></p>
                <hr/>
              </div>
            )}
          </div>
        </div>
        {this.state.gigs.length===0 && <p>No gigs!</p> }
      </div>
    );
  }
}

export default ArtistsShow;
