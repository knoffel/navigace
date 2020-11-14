import React, { Component } from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";
import Control from "react-leaflet-control";
import ReactDistortableImageOverlay from "react-leaflet-distortable-imageoverlay";
import PathFinder from "geojson-path-finder-nw";
import point from "turf-point";

import "leaflet/dist/leaflet.css";
import data from "../assets/data";
//import level1 from "../assets/level1";
import Markers from "./VenueMarkers";

const stamenTonerTiles =
  "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";
const stamenTonerAttr =
  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [49.815, 18.27];
const zoomLevel = 18;
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [49.8146818952885, 18.268606328072604],
          [49.81483246833864, 18.269146793189105]
        ]
      },
      properties: {}
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [49.81483246833864, 18.269146793189105],
          [49.81522317725818, 18.268702217044886]
        ]
      },
      properties: {}
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [49.81483246833864, 18.269146793189105],
          [49.815042317929006, 18.269922622146662]
        ]
      },
      properties: {}
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [49.815042317929006, 18.269922622146662],
          [49.81484804483436, 18.270436935725268]
        ]
      },
      properties: {}
    }
  ]
};

const pathFinder = new PathFinder(geojson, {
  weightFn: function (a, b, props) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
});

class MapView extends Component {
  constructor(props) {
    super(props);
    window.console.log(props);
    this.state = {
      currentLocation: { lat: props.lat, lng: props.lng },
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
    const path = pathFinder.findPath(
      point([49.8146818952885, 18.268606328072604]),
      point([49.81522317725818, 18.268702217044886])
    );
    window.console.log(path);

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

        <Polyline positions={path.path} />

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
