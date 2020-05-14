import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';



class ArtistsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      selectedGenre: '',
      genresArray: []
    }
    this.setGenreFilter = this.setGenreFilter.bind(this);
  }

  componentWillMount() {
    this.getArtists();
  }

  getArtists() {
    Axios
      .get(`/api/spotify/following?token=${Auth.getRefreshToken()}`) // Axios request to the the back-end API
      .then((res) => {
        this.setState({ artists: res.data.artists.items });
      })
      .then(() => this.generateGenresArray(this.state.artists))
      .catch(err => console.log(err));
  }

  generateGenresArray(artists) {
    const genresArrayTemp = [];
    artists.map(artist => {
      artist.genres.map(genre => {
        if (!genresArrayTemp.includes(genre)){
          genresArrayTemp.push(genre);
        } 
      });
    });
    this.setState({ genresArray: genresArrayTemp });
  }

  setGenreFilter(event) {
    this.setState({ selectedGenre: event.target.value });
  }


  render() {
    const artists = this.state.selectedGenre ? 
    this.state.artists.filter(artist => artist.genres.includes(this.state.selectedGenre)) : 
    this.state.artists;

    return (
      <div className="container">
        <div className="row">
            <div className="col-md-12">
              <label className="title">Filter artist by Genre</label>
              <select className="form-control title" name="genres" value={this.state.selectedGenres} onChange={this.setGenreFilter}>
                <option key="all" value="">all genres</option>
                {this.state.genresArray.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
              </select>
            </div>
        </div>
        <div className="row">
          {artists.map(artist => {
            const artistLength = artists.length;
            const cols = artistLength > 12 ? 'col-md-3' : 'col-md-' + 12 / artistLength
            return (
              <div key={artist.id} className={cols}>
                <div className="hovereffect">
                  <img className="img-responsive" src={artist.images[0].url}/>
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
