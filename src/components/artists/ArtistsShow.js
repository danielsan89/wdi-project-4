import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';


// import Auth from '../../lib/Auth';
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
      .then(res => this.setState({ gigs: res.data }))
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  render() {
    console.log('inside render', this.state.gigs);
    const cities = Array.from(new Set(this.state.gigs.map(gig => gig.venue.city).sort()));
    const countries = Array.from(new Set(this.state.gigs.map(gig => gig.venue.country).sort()));
    const gigsByCity = this.state.gigs.filter(gig => gig.venue.city === this.state.city || !this.state.city);
    const gigsByCountry = this.state.gigs.filter(gig => gig.venue.city === this.state.city || !this.state.city);
    return (
      <div>
        <h1>Show page!</h1>
        {this.state.gigs.length && <GoogleMap gigsByCity={gigsByCity} gigsByCountry={gigsByCountry} />}
        <div>
          <select onChange={this.setCity} value={this.state.city}>
            <option key="all" value="">All cities</option>
            {cities.map(city =>
              <option key={city} value={city}>{city}</option>
            )}
          </select>
          {/* <select onChange={this.setCity} value={this.state.city}>
            <option key="all" value="">All cities</option>
            {countries.map(country =>
              <option key={country} value={country}>{country}</option>
            )}
          </select> */}
          <hr/>
          {gigsByCity.map(gig =>
            <div key={gig.id}>
              <p><strong>Lineup: </strong><small>{gig.lineup.toString()}</small></p>
              <p><strong>Date: </strong><small>{gig.datetime}</small></p>
              <p><strong>City: </strong><small>{gig.venue.country}</small></p>
              <p><strong>Venue: </strong><small>{gig.venue.name}</small></p>
              {gig.offers.map(offer => <a key={gig.id} href={offer.url} target="_blank">Buy Tickets</a>)}
              <div className="heart"></div>
              <hr/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ArtistsShow;
