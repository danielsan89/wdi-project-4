import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
//
import Auth from '../../lib/Auth';


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
      <div>
        <div className="row">
          {this.state.artists.map(artist => {
            return(
              <div key={artist.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="hovereffect">
                  <img className="img-responsive" src={artist.images[0].url} alt=""/>
                  <div className="overlay title">
                    <h2>{artist.name.toUpperCase()}</h2>
                    <Link className="info" to={`/artists/${artist.name}`}>Show gigs</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>



    );
  }
}

export default ArtistsIndex;
