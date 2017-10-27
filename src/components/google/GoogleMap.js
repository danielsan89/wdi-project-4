/* global google */

import React from 'react';
// import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {



  componentDidMount(){
    console.log('test', this.props);
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 9,
      center: this.props.center || { lat: 51.51, lng: -0.08 }
    });
    this.props.gigs.map(gig => {
      this.marker = new google.maps.Marker({
        position: { lat: gig.venue.location.latitude, lng: gig.venue.location.longitude },
        map: this.map
        // styles: mapStyles
      });
    });
    console.log(this.props.gigs);
  }

  componentWillUnmount(){
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (

      <div style={{ height: '500px', width: '500px' }} className="google-map" ref={element => this.mapCanvas = element} ></div>
    );
  }
}

export default GoogleMap;
