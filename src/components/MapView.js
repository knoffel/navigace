import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import Control from 'react-leaflet-control';
import ReactDistortableImageOverlay from 'react-leaflet-distortable-imageoverlay'

import "leaflet/dist/leaflet.css";
import data from "../assets/data";
import Markers from "./VenueMarkers";


const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [49.815, 18.27];
const zoomLevel = 18;

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 49.815, lng: 18.27 },
      zoom: zoomLevel
    };
    this.handleCenterClick = this.handleCenterClick.bind(this);    
    this.handleUpPanClick = this.handleUpPanClick.bind(this);
    this.handleRightPanClick = this.handleRightPanClick.bind(this);
    this.handleLeftPanClick = this.handleLeftPanClick.bind(this);
    this.handleDownPanClick = this.handleDownPanClick.bind(this);
}

componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
        const updatedZoomLevel = leafletMap.getZoom();
        this.handleZoomLevelChange(updatedZoomLevel);
    });
}

handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
}

handleCenterClick() {
  const leafletMap = this.leafletMap.leafletElement;
  leafletMap.panTo(mapCenter);
  window.console.log('Center');
}

handleUpPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, -100]);
    window.console.log('Panning up');
}

handleRightPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([100, 0]);
    window.console.log('Panning right');
}

handleLeftPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([-100, 0]);
    window.console.log('Panning left');
}

handleDownPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, 100]);
    window.console.log('Panning down');
}

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Map 
        ref={m => { this.leafletMap = m; }}
        center={currentLocation} 
        zoom={zoom}>
        <TileLayer
          url={stamenTonerTiles}
          attribution={stamenTonerAttr}
        />

        <Markers venues={data.venues} />

        <Control position="topright">
                <div
                    style={{
                        backgroundColor: 'black',
                        padding: '5px',
                    }}
                >
                    <div style={{ marginLeft: '37px' }}>
                        <button onClick={this.handleCenterClick}>
                            Center
                        </button>
                    </div>                  
                    <div style={{ marginLeft: '37px' }}>
                        <button onClick={this.handleUpPanClick}>
                            Pan up
                        </button>
                    </div>
                    <div>
                        <button onClick={this.handleLeftPanClick}>
                            Pan left
                        </button>
                        <button onClick={this.handleRightPanClick}>
                            Pan right
                        </button>
                    </div>
                    <div style={{ marginLeft: '30px' }}>
                        <button onClick={this.handleDownPanClick}>
                            Pan down
                        </button>
                    </div>
                </div>
            </Control>        
      </Map>
    );
  }
}

export default MapView;
