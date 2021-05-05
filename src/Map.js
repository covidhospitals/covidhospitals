import React from 'react';
import './Map.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Locate from "leaflet.locatecontrol";

import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"

import 'font-awesome/css/font-awesome.min.css';

function LocateControl(props) {
    const map = useMap()
    const { options, startDirectly } = props;

    const lc = new Locate(options);
    lc.addTo(map);

    if (startDirectly) {
        // request location update and set location
        lc.start();
    }
    return null
}

async function fetchAPHospitals() {
    const response = await fetch('https://api.npoint.io/4594de00c3f1d76a08ec');
    const hospitals = await response.json();
    return hospitals;
}

class CovidMap extends React.Component {
    constructor() {
        super();
        this.state = {
            // lastUpdated: undefined,
            hospitals: []
        }
    }
    componentDidMount() {
        fetchAPHospitals().then(apData => {
            this.setState({
                hospitals: apData.hospitals
            })
        })
    }

    render() {
        const center = {
            lat: 15.9129,
            lng: 79.7400,
        }

        const locateOptions = {
            position: 'topleft',
            strings: {
                title: 'Show me where I am'
            },
            onActivate: () => { } // callback before engine starts retrieving locations
        }

        const { hospitals } = this.state;

        return (<MapContainer center={center} zoom={7} >
            <LocateControl options={locateOptions} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer
                attribution='Source: <a href="http://dashboard.covid19.ap.gov.in/">ap.gov.in</a>' url="http://dashboard.covid19.ap.gov.in/"
            />

            {hospitals.map(h => {
                return (<Marker position={[h.location.latitude, h.location.longitude]}>
                    <Popup>
                        <table>
                            <thead>
                                <tr>
                                    <th>Hospital:</th>
                                    <th colSpan="3">{h.name}</th>
                                </tr>
                                <tr>
                                    <th>Phone:</th>
                                    <th colSpan="3">{h.phoneNumber}</th>
                                </tr>
                                <tr>
                                    <th>Address:</th>
                                    <th colSpan="3">{h.location.streetName+","+h.location.city}</th>
                                </tr>
                                <tr>
                                    <th>Directions:</th>
                                    <th colSpan="3"><a href={`https://www.google.com/maps/search/?api=1&query=${h.location.latitude},${h.location.longitude}`} target="_blank" rel="noreferrer">Click Here</a></th>
                                </tr>
                                <tr>

                                    <th>Beds</th>
                                    <th>Total</th>
                                    <th>Occupied</th>
                                    <th>Available</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>General</td>
                                    <td>{h.general.total}</td>
                                    <td>{h.general.occupied}</td>
                                    <td>{h.general.available}</td>
                                </tr>
                                <tr>
                                    <td>ICU</td>
                                    <td>{h.icu.total}</td>
                                    <td>{h.icu.occupied}</td>
                                    <td>{h.icu.available}</td>
                                </tr>
                                <tr>
                                    <td>O2</td>
                                    <td>{h.o2.total}</td>
                                    <td>{h.o2.occupied}</td>
                                    <td>{h.o2.available}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Popup>
                </Marker>)
            })}

        </MapContainer>)
    }
}

export default CovidMap