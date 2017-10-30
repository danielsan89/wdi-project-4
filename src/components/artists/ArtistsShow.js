import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';


// import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';

class ArtistsShow extends React.Component {

  state = {
    gigs: [],
    appId: 'gigsTime',
    city: ''
  }

  setCity = (e) => {
    this.setState({ city: e.target.value });
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
    let gigs = '';
    // filter the gigs
    if(this.state.city){
      gigs = this.state.gigs.filter(gig => gig.venue.city === this.state.city );
    }else
      gigs = this.state.gigs;
    return (
      <div>
        <h1>Show page!</h1>
        {this.state.gigs.length && <GoogleMap gigs={gigs} />}

        {/* loop over gigs, display them */}
        <div>
          <select onChange={this.setCity} value={this.state.city}>
            <option key="all" value="">All cities</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

export default ArtistsShow;
