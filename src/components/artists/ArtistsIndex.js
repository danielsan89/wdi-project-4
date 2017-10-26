import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router-dom';
//
import Auth from '../../lib/Auth';
import OAuthButton from '../auth/OAuthButton';

class ArtistsIndex extends React.Component {
  state = {
    artists: []
  }

  componentWillMount() {
    console.log(Auth.getRefreshToken());
    Axios
      .get('https://api.spotify.com/v1/me/following', {
        headers: { Authorization: `Bearer ${Auth.getRefreshToken()}` }

      })
      .then((res) => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main>
        <h1>Artists!</h1>
        <OAuthButton provider="spotify">Spotify</OAuthButton>
      </main>

    );
  }
}

export default ArtistsIndex;
