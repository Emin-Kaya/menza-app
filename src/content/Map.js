import React, { Component } from 'react';
import '../styles/App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class Map extends Component {

    componentDidMount = () => {
        const container = document.getElementById('mapdiv');
        if (container) {
            var x = localStorage["x"];
            var y = localStorage["y"];
            this.map = L.map('mapdiv', {
                center: [x, y],
                zoom: 16,
                zoomControl: false
            });
            L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                detectRetina: true,
                maxZoom: 20,
                maxNativeZoom: 17,
            }).addTo(this.map);
            L.marker([x, y]).addTo(this.map);
        }

    }

    render() {
        const data = this.x;
        if (data) {

            return (
                <body id="mapbody">
                </body>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

}




export default Map;
