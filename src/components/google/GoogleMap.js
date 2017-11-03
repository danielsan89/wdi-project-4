/* global google */

import React from 'react';
// import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {

  createMarkers(){
    console.log(this.props.gigs);
    this.infowindow = new google.maps.InfoWindow({
      maxWidth: 100
    });

    // `<p><h4>Artists: </h4><em>${gig.lineup.toString()}</em></p>`+
    //             `<p><h4>City: </h4><em>${gig.venue.city}</em></p>`+
    //             `<p><small><strong>Venue: </strong>${gig.venue.name}</small></p>`+
    //             `<p><small><strong>Date: </strong>${gig.datetime}</small></p>`;

    this.props.gigs
      // .filter(gig => gig.venue && gig.venue.latitude && gig.venue.longitude)
      .map(gig => {
        const latLng = { lat: Number(gig.venue.latitude), lng: Number(gig.venue.longitude) };
        const info = '<img className="img-responsive" src="https://square-production.s3.amazonaws.com/files/d3950215da400d5800dc6d898d98fa9d288e7cdb/original.png"/>';

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
        if (this.bounds.getNorthEast().equals(this.bounds.getSouthWest())) {
          var extendPoint1 = new google.maps.LatLng(this.bounds.getNorthEast().lat() + 0.01, this.bounds.getNorthEast().lng() + 0.01);
          var extendPoint2 = new google.maps.LatLng(this.bounds.getNorthEast().lat() - 0.01, this.bounds.getNorthEast().lng() - 0.01);
          this.bounds.extend(extendPoint1);
          this.bounds.extend(extendPoint2);
        }
      });


    this.map.fitBounds(this.bounds);
  }

  componentDidUpdate() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
    this.bounds = new google.maps.LatLngBounds();
    this.createMarkers();
  }

  componentDidMount(){
    console.log('mounted google map');
    this.bounds = new google.maps.LatLngBounds();
    this.markers = [];
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 9,
      center: this.props.center || { lat: 51.51, lng: -0.08 }
    });
    this.createMarkers();
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
      <div className="col-md-8 google-map" style={{height: '50vh'}} ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default GoogleMap;
