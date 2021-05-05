import React from 'react';
import './Map.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Locate from "leaflet.locatecontrol";

import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"

import 'font-awesome/css/font-awesome.min.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
JavascriptTimeAgo.addLocale(en)




// class LocateControl extends React.Component {
//     componentDidMount() {
//         const map = useMap()
//         const { options, startDirectly } = props;

//         const lc = new Locate(options);
//         lc.addTo(map);

//         if (startDirectly) {
//             // request location update and set location
//             lc.start();
//         }
//     }

//     render() {
//         return null;
//     }
// }

var lc

function LocateControl(props) {
    const map = useMap()
    const { options, startDirectly } = props;

    if (!lc) {
        lc = new Locate(options);
        lc.addTo(map);
    }

    if (startDirectly) {
        // request location update and set location
        lc.start();
    }
    return null
}

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


function SourceDialog(props) {
    const classes = useStyles();
    const { onClose, open, dataSources } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Data Source
        </DialogTitle>
            <DialogContent >

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell >State or Locality</StyledTableCell >
                                <StyledTableCell >Site</StyledTableCell >
                                <StyledTableCell >Last updated</StyledTableCell >
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataSources.map((d, idx) => {
                                    return (
                                        <StyledTableRow key={`ds${idx}`}>
                                            <StyledTableCell component="th" scope="row">
                                                Andhra Pradesh
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <a href="http://dashboard.covid19.ap.gov.in/" target="blank">
                                                    http://dashboard.covid19.ap.gov.in/</a>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <ReactTimeAgo date={new Date(d.time)} />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>

                <p>
                    This site is an open source project.
                    </p>
                <p> Please feel make changes to this, or add more data sources at <a href="https://github.com/covid19maps/covid19maps" target="blank">github.com/covid19maps/covid19maps</a>
                </p>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">OK</Button>
            </DialogActions>
        </Dialog>
    );
}

SourceDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    dataSources: PropTypes.array
};



function RightLinks(props) {
    const [open, setOpen] = React.useState(false);
    const { dataSources } = props;


    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    return <div className="leaflet-top leaflet-right ">
        <div className="leaflet-bar leaflet-control">
            <a className="leaflet-bar-part leaflet-bar-part-single " href="https://github.com/covid19maps/covid19maps" target="_blank" rel="noreferrer">
                <span className="fa fa-github fa-lg"></span>
            </a>
        </div>
        <div className="leaflet-bar leaflet-control">
            <a href="/#" className="leaflet-bar-part leaflet-bar-part-single " onClick={handleClickOpen}>
                <span className="fa fa-database fa-lg"></span>
            </a>
            <SourceDialog open={open} onClose={handleClose} dataSources={dataSources} />
        </div>

    </div>
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
            allHospitals: []
        }
    }
    componentDidMount() {
        fetchAPHospitals().then(apData => {
            this.setState({
                allHospitals: [apData]
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

        const { allHospitals } = this.state;

        return (<MapContainer center={center} zoom={7} >
            <LocateControl key="locate" options={locateOptions} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer
                attribution='Created by <a href="https://pgollangi.com/tabs/about" target="_blank" rel="noreferrer">pgollangi.com</a>'
                url="http://dashboard.covid19.ap.gov.in/"
            />
            <RightLinks dataSources={allHospitals} />

            {allHospitals.map((d) => {
                return d.hospitals.map((h, idx) => {
                    return (<Marker key={`h${idx}`} position={[h.location.latitude, h.location.longitude]}>
                        <Popup>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Hospital:</th>
                                        <td colSpan="3">{h.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone:</th>
                                        <td colSpan="3">
                                            <a href={`tel:${h.phoneNumber}`} target="_blank" rel="noreferrer">
                                                {h.phoneNumber}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Address:</th>
                                        <td colSpan="3">{h.location.streetName + "," + h.location.city}</td>
                                    </tr>
                                    <tr>
                                        <th>Directions:</th>
                                        <td colSpan="3">
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${h.location.latitude},${h.location.longitude}`} target="_blank" rel="noreferrer">
                                                Click Here
                                            </a>
                                        </td>
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
                })
            })}

        </MapContainer>)
    }
}

export default CovidMap