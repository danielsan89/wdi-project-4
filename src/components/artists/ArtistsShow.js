import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

// import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';

class ArtistsShow extends React.Component {

  state = {
    gigs: [],
    appId: 'gigsTime'
  }

  componentWillMount() {
    const artist = this.props.match.params.name;
    console.log(artist);
    const artistParam = artist.replace(' ', '%20');
    Axios
      .get(`https://rest.bandsintown.com/artists/${artistParam}/events?app_id=${this.state.appId}`)
      .then(res => this.setState({gigs: res.data }, () => console.log(this.state.gigs)))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  // deleteArtist = () => {
  //   Axios
  //     .delete(`/api/artists/${this.props.match.params.id}`)
  //     .then(() => this.props.history.push('/'));
  // }

  render() {
    return (
      <div >
        {/* <div>
          <img src={this.state.artist.image} />
        </div>
        <div >
          <h3>{this.state.artist.title}</h3>
          <h4>{this.state.artist.category}</h4>
        </div> */}
        <h1>Show page!</h1>
        {console.log('before rendering google maps', this.state.gigs)}
        {this.state.gigs && <GoogleMap gigs={this.state.gigs} />}
      </div>
    );
  }
}

export default ArtistsShow;
