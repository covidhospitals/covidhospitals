import { useMap } from "react-leaflet";

import Locate from "leaflet.locatecontrol";


import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"

var lc

export default function LocateControl(props) {
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
