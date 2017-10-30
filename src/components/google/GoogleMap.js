/* global google */

import React from 'react';
// import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {

  createMarkers(){
    this.infowindow = new google.maps.InfoWindow({
      maxWidth: 100
    });
    this.props.gigsByCity.map(gig => {
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

      <div style={{ height: '500px', width: '900px' }} className="google-map" ref={element => this.mapCanvas = element} ></div>
    );
  }
}

export default GoogleMap;
