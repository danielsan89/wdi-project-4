import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import GoogleMap from '../google/GoogleMap';
// import BackButton from '../utility/BackButton';

class GigsIndex extends React.Component {

  state = {
    gigs: [],
    appId: 'gigsTime'
  }

  componentDidMount() {
    Axios
      .get('/api/profile/gigs', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ gigs: res.data.gigs }, () => console.log(this.state.gigs)))
      .catch(err => console.log(err));
  }
  deleteGig = (gig) => {
    console.log(gig);
    Axios
      .delete(`/api/profile/gigs/${gig._id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ gigs: res.data.gigs }, () => console.log(this.state.gigs)))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <div>
          {/* https://bw-1651cf0d2f737d7adeab84d339dbabd3-gallery.s3.amazonaws.com/images/image_502123/file_502123.jpg */}
          {this.state.gigs.length===0 &&
            <div className="row">
              <img className="img-responsive" src="https://bw-1651cf0d2f737d7adeab84d339dbabd3-gallery.s3.amazonaws.com/images/image_502123/file_502123.jpg"></img>
              {/* <img src="http://78.media.tumblr.com/17e29c9cfb802c1e65a556dcc46545f8/tumblr_orjaxrztTW1u5lqbno1_500.gif"></img> */}
              <h1 className="title">You have no gigs coming up!</h1>
            </div>}
          {/* <BackButton history={history} ></BackButton> */}
          <br/>
        </div>
        {this.state.gigs.length > 0 &&
          <div>
            <h1 className="title">Saved gigs!</h1>
            <GoogleMap gigs={this.state.gigs} />
          </div>}

        {this.state.gigs.map(gig =>
          <div key={gig._id}>
            <hr/>
            {gig.venue && <p>{gig.venue.name}</p>}
            <p>{gig.lineup}</p>
            <button className="btn btn-danger" onClick={() => this.deleteGig(gig)}>Delete</button>
            <hr/>
          </div>
        )}

      </div>
    );
  }
}

export default GigsIndex;
