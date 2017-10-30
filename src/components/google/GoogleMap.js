/* global google */

import React from 'react';
// import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {



  componentDidMount(){
    console.log(this.props.gigs);
    this.bounds = new google.maps.LatLngBounds();
    this.markers = [];
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 9,
      center: this.props.center || { lat: 51.51, lng: -0.08 }
    });
    this.infowindow = new google.maps.InfoWindow({
      maxWidth: 100
    });
    if(this.props.gigs){
      this.props.gigs.map(gig => {
        const latLng = { lat: Number(gig.venue.latitude), lng: Number(gig.venue.longitude) };
        const info = `<h4>${gig.venue.city}</h4>`+
                    `<p><small>${gig.venue.name}</small></p>`+
                    `<small>${gig.datetime}</small>`;

        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map
          // styles: mapStyles
        });

        marker.addListener('click', () => {
          this.infowindow.close();
          this.infowindow.setContent(info);
          this.infowindow.open(this.map, marker);
        });
        this.bounds.extend(latLng);
        this.markers.push(marker);
      });
    }else if(this.props.gig){
      const gig = this.props.gig;
      const latLng = { lat: Number(gig.venue.latitude), lng: Number(gig.venue.longitude) };
      const info = `<h4>${gig.venue.city}</h4>`+
                  `<p><small>${gig.venue.name}</small></p>`+
                  `<small>${gig.datetime}</small>`;


      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map
        // styles: mapStyles
      });

      marker.addListener('click', () => {
        this.infowindow.close();
        this.infowindow.setContent(info);
        this.infowindow.open(this.map, marker);
      });
      this.bounds.extend(latLng);
      this.markers.push(marker);
    }


    this.map.fitBounds(this.bounds);
  }

  componentWillUnmount(){
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
    this.bounds = null;
    this.infowindow = null;
    this.map = null;
  }

  render() {
    return (

      <div style={{ height: '500px', width: '900px' }} className="google-map" ref={element => this.mapCanvas = element} ></div>
    );
  }
}

export default GoogleMap;
