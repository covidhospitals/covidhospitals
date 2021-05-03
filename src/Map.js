import React from 'react';
import './Map.css'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Locate from "leaflet.locatecontrol";

function LocateControl(props) {
    const map = useMap()
    console.log('map center:', map.getCenter())
    const { options, startDirectly } = props;

    const lc = new Locate(options);
    lc.addTo(map);

    if (startDirectly) {
      // request location update and set location
      lc.start();
    }
    return null
}

class CovidMap extends React.Component {
    

    render() {
        const center = {
            lat: 51.505,
            lng: -0.09,
        }

        const locateOptions = {
            position: 'topleft',
            strings: {
                title: 'Show me where I am, yo!'
            },
            onActivate: () => { } // callback before engine starts retrieving locations
        }


        return (<MapContainer center={center} zoom={15} >
            <LocateControl options={locateOptions} startDirectly />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

        </MapContainer>)
    }
}

export default CovidMap