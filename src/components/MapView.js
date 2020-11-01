import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import Control from "react-leaflet-control";
import ReactDistortableImageOverlay from "react-leaflet-distortable-imageoverlay";

import "leaflet/dist/leaflet.css";
import data from "../assets/data";
import Markers from "./VenueMarkers";

const stamenTonerTiles =
  "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";
const stamenTonerAttr =
  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [49.815, 18.27];
const zoomLevel = 18;

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 49.815, lng: 18.27 },
      zoom: zoomLevel
    };
    this.handleHClick = this.handleHClick.bind(this);
    this.handleAClick = this.handleAClick.bind(this);
    this.handleEClick = this.handleEClick.bind(this);
  }

  handleHClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panTo([49.8146818952885, 18.268606328072604]);
    window.console.log("Poloha:Hlavni vchod");
  }

  handleAClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panTo([49.81522317725818, 18.268702217044886]);
    window.console.log("Poloha:Vchod A");
  }

  handleEClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panTo([49.81484804483436, 18.270436935725268]);
    window.console.log("Poloha:Vchod E");
  }

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Map
        ref={(m) => {
          this.leafletMap = m;
        }}
        center={currentLocation}
        zoom={zoom}
      >
        <TileLayer url={stamenTonerTiles} attribution={stamenTonerAttr} />

        <Markers venues={data.venues} />

        <Control position="topright">
          <div
            style={{
              backgroundColor: "black",
              padding: "5px"
            }}
          >
            <div>
              <button onClick={this.handleHClick}>Hlavní vchod</button>
            </div>
            <div>
              <button onClick={this.handleAClick}>Vchod A</button>
            </div>
            <div>
              <button onClick={this.handleEClick}>Vchod E</button>
            </div>
          </div>
        </Control>
      </Map>
    );
  }
}

export default MapView;
