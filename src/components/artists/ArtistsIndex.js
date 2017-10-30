import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
//
import Auth from '../../lib/Auth';
import OAuthButton from '../auth/OAuthButton';

class ArtistsIndex extends React.Component {

  state = {
    artists: []
  }

  componentWillMount() {
    Axios
      .get(`/api/spotify/following?token=${Auth.getRefreshToken()}`) // Axios request to the the back-end API
      .then((res) => {
        this.setState({ artists: res.data.artists.items });
        console.log(res.data.artists.items);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main>
        <h1>My Artists!</h1>
        {this.state.artists.map(artist => {
          return(
            <div key={artist.id}>
              <img src={artist.images[1].url}/>
              <Link to={`/artists/${artist.name}`}><h3><strong>{artist.name}</strong></h3></Link>
            </div>
          );
        })}
        <OAuthButton provider="spotify"><img src="http://marilynscott.com/wp-content/uploads/2016/03/spotify-icon-22.png"></img></OAuthButton>
      </main>

    );
  }
}

export default ArtistsIndex;
