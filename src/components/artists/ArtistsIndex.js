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
      selectedName: '',
      genresArray: []
    }
    this.setGenreFilter = this.setGenreFilter.bind(this);
    this.setNameFilter = this.setNameFilter.bind(this);
  }

  options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  componentDidMount() {
    Axios
      .get(`/api/spotify/following?token=${Auth.getRefreshToken()}`) // Axios request to the the back-end API
      .then((res) => {
        this.setState({ artists: res.data.artists.items });
        console.log(res.data.artists.items);
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
    console.log(this.state.genresArray)
  }

  setGenreFilter(event) {
    this.setState({ selectedGenre: event.target.value });
    console.log(this.state)
  }

  setNameFilter(event) {
    this.setState({ selectedName: event.target.value });
    console.log(this.state)
  }

  render() {
    const artists = this.state.selectedGenre ? 
    this.state.artists.filter(artist => artist.genres.includes(this.state.selectedGenre)) : 
    this.state.artists;
    return (
      <div>
        <div className="row">
          <div className="form-group pull-right">
            <label className="title">Filter artist by Genre</label>
            <select className="form-control title" name="genres" value={this.state.selectedGenres} onChange={this.setGenreFilter}>
              <option key="all" value="">all genres</option>
              {this.state.genresArray.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
            </select>
            <label className="title">Filter artist by Name</label>
            <input className="form-control title" type="text" onChange={this.setNameFilter} />
          </div>
        </div>
        <div className="row">
          {artists.map(artist => {
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
