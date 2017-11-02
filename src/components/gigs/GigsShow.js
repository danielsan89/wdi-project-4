import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';
// import GoogleMap from '../google/GoogleMap';

class GigsShow extends React.Component {

  state = {
    gig: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/profile/gigs/${this.props.match.params.id}`)
      .then(res => this.setState({ gig: res.data }))
      .catch(err => {
        if(err.response.status === 404) this.props.history.replace('/404');
        console.log(err);
      });
  }

  deleteGig = () => {
    Axios
      .delete('/api/profile/gigs', {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      // .then(() => this.props.history.push('/profile'))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <h1>Gig show!</h1>
        <p>{this.state.gig.venue}</p>
      </div>
    );
  }
}

export default GigsShow;
