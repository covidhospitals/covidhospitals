import './Map.css'

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import ReactTimeAgo from 'react-time-ago'

import MarkerClusterGroup from 'react-leaflet-markercluster';

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import 'font-awesome/css/font-awesome.min.css';

import 'react-leaflet-markercluster/dist/styles.min.css';

import LocateControl from './components/LocateControl'
import SearchControl from './components/SearchControl'
import RightControls from './components/RightControls'

import fetchAllData from './data-source'
class CovidMap extends React.Component {
    constructor() {
        super();
        this.state = {
            // lastUpdated: undefined,
            allHospitals: [],
            center: {
                lat: 20.5937,
                lng: 78.9629,
            }
        }
    }
    componentDidMount() {
        fetchAllData().forEach(dataPromise => {
            dataPromise.then(h => {
                if (!h) {
                    return;
                }
                h.stateOrLocality = h.stateOrLocality || "Andhra Pradesh";
                h.source = h.source || "http://dashboard.covid19.ap.gov.in/";
                h.lastUpdatedAt = h.time || h.lastUpdatedAt;
                this.setState(prevState => ({
                    allHospitals: [...prevState.allHospitals, h]
                }))
            }, error => {
                console.log('Error fetching data ', error);
            });
        })
    }

    setCenter(location) {
        this.setState({
            center: location
        })
    }

    mapCreated(map) {
        map.zoomControl.setPosition('bottomright');
    }

    onHospitalClick(hospital) {
        console.log(hospital);
        if (navigator.share) {
            const shareData = {
                title: `${hospital.name}`,
                text: 
`${hospital.name}.
Phone: ${hospital.phoneNumber}.
Address: ${hospital.location.formattedAddress}.
Beds available:- General: ${hospital.general.available}, ICU: ${hospital.icu.available}, O2: ${hospital.o2.available}.
Get directions: ${hospital.location.link}
More at: http://covidhospitals.online/`,
                url: "http://covidhospitals.online/",
            }
            navigator.share(shareData).then(() => {
                console.log('Thanks for sharing!');
            })
                .catch(console.error);
        }
    }

    render() {
        const { center } = this.state;
        const locateOptions = {
            position: 'bottomright',
            flyTo: true,
            strings: {
                title: 'Show me where I am'
            },
            onActivate: () => { } // callback before engine starts retrieving locations
        }

        const { allHospitals } = this.state;

        return (<MapContainer center={center} zoom={5} whenCreated={this.mapCreated}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer
                attribution='Created by <a href="https://github.com/pgollangi" target="_blank" >github.com/pgollangi</a>'
                url="https://github.com/pgollangi"
            />
            <LocateControl key="locate" options={locateOptions} />
            <SearchControl />
            <RightControls dataSources={allHospitals} />

            <MarkerClusterGroup>

                {allHospitals.map((d) => {
                    return d.hospitals.map((h, idx) => {
                        h.location.link = h.location.link || `https://www.google.com/maps/search/?api=1&query=${h.location.latitude},${h.location.longitude}`
                        return (
                            <Marker key={`h${idx}`} position={[h.location.latitude, h.location.longitude]} >
                                <Popup>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th colSpan="2">Hospital:</th>
                                                <td colSpan="3">{h.name} <i className="fa fa-share-alt h-share" onClick={() => this.onHospitalClick(h)}></i></td>
                                            </tr>
                                            <tr>
                                                <th colSpan="2">Phone:</th>
                                                <td colSpan="3">
                                                    <i className="fa fa-phone"></i>
                                                    <a className="h-value" href={`tel:${Array.isArray(h.phoneNumber) ? h.phoneNumber[0] : h.phoneNumber}`} target="_blank" rel="noreferrer">
                                                        {Array.isArray(h.phoneNumber) ? h.phoneNumber[0] : h.phoneNumber}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan="2">Address:</th>
                                                <td colSpan="3"><i className="fa fa-map-marker"></i><span className="h-value">{h.location.formattedAddress || (h.location.streetName + "," + h.location.city)}</span>
                                                    <a href={h.location.link} target="_blank" rel="noreferrer">
                                                        (Get Directions)
                                            </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan="2">LastUpdated:</th>
                                                <td colSpan="3">
                                                    {
                                                        ((!h.lastUpdatedAt && !d.lastUpdatedAt) ? ("N/A") : (<ReactTimeAgo date={new Date(h.lastUpdatedAt || d.lastUpdatedAt)} />))
                                                    }
                                                </td>
                                            </tr>
                                            <tr>

                                                <th colSpan="2">Beds</th>
                                                <th>Total</th>
                                                <th>Occupied</th>
                                                <th>Available</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td colSpan="2">General</td>
                                                <td>{h.general.total || '-'}</td>
                                                <td>{h.general.occupied || '-'}</td>
                                                <td>{h.general.available || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">ICU</td>
                                                <td>{h.icu.total || '-'}</td>
                                                <td>{h.icu.occupied || '-'}</td>
                                                <td>{h.icu.available || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">O2</td>
                                                <td>{h.o2.total || '-'}</td>
                                                <td>{h.o2.occupied || '-'}</td>
                                                <td>{h.o2.available || '-'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Popup>
                            </Marker>)
                    })
                })}
            </MarkerClusterGroup>
        </MapContainer>)
    }
}

export default CovidMap
